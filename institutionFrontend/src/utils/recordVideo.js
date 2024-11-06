
import ClassRoomServices from "../services/classRoom/ClassRoomServices";

let mediaRecorder;
let batchName;
let totalChunks ;
let uploadedChunks;
const lessonDate = new Date().toISOString().split('T')[0];

export const startRecording = (stream, batch, videoChunkSerial)=>{
    console.log("startRecording called...");
    
    batchName = batch;
    totalChunks = 0;
    uploadedChunks = 0;
    const options = { mimeType: 'video/webm; codecs=vp9' };
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = async function(event){
        console.log("ondataavailable called...");
        if(event.data.size > 0){
            console.log("event data found...");
            totalChunks++;
            try {
                await uploadVideos(event.data, videoChunkSerial);
                uploadedChunks++;
            } catch (error) {
                uploadedChunks++;
                console.error("Error uploading chunk:", error);
            }
        };
    };
    mediaRecorder.start(10000)
};

export const stopRecording = (setRecordBtn, showToast)=>{
    console.log("stopRecording called...");
    mediaRecorder.stop();

    mediaRecorder.onstop = async function(){
        showToast("Making session video. This may take few minutes.", "success", 3000)
        console.log("mediaRocord.onstop  called...");
        await waitForUploadsToComplete();
        console.log("All chunks uploaded. Calling bindVideoChunks...");

        if(uploadedChunks > 0){
            bindVideoChunks();
            bindingCheckPolling(setRecordBtn, showToast);
        }
        totalChunks = 0;
        uploadedChunks = 0;
    };
};

export const uploadVideos = async (data, videoChunkSerial)=>{
    console.log("uploadVideos called...");
    videoChunkSerial.current++;
    
    const formData = new FormData();
    const blob = new Blob ([data], {"type": "video/webm"});
    const file = new File([blob], `video-chunk-${batchName}-${videoChunkSerial.current}`, {"type": "video/webm"});
    formData.append("video_chunk", file);

    try{
        const response = await ClassRoomServices.uploadVideoChunks(formData, batchName, videoChunkSerial);
        console.log("video chunk uploaded successfully");
        
    }
    catch(error){
        console.log(`error while uploading video chunk file - ${file}`, error);
        
    }
};

export const bindVideoChunks = ()=>{
    console.log("bindVideoChunks called...");

    ClassRoomServices.bindVideoChunk(lessonDate, batchName)
        .then(response => {
            console.log('Video chunks bound successfully:', response);
        })
        .catch(error => {
            console.log(`error while binding video chunks of ${batchName} on ${lessonDate}`, error);
        })
};

async function waitForUploadsToComplete() {
    while (uploadedChunks < totalChunks) {
        await new Promise(resolve => setTimeout(resolve, 500)); 
    }
}

const bindingCheckPolling = (setRecordBtn, showToast) => {
    const interval = setInterval(async () => {
        const response = await ClassRoomServices.checkBindingStatus(lessonDate, batchName);
        if (response) {
            const status = response.status;
            console.log('Current video binding status:', status);
            if (status === 'completed') {
                clearInterval(interval); 
                setRecordBtn("Record");
                showToast("Session video made successfully", "success", 3000);
                console.log("Video binding completed successfully...");
            }
            else if (status === 'processing') {
                console.log("Video binding is still processing...");
            }
        }
    }, 5000);
};


// export const downloadVideo = (blob)=>{
//     const url = URL.createObjectURL(blob);
//     console.log("created blob is -", blob);
//     console.log("created url is -", url);
    
//     const a = document.createElement("a");
//     a.style.display = "none";
//     a.href = url;
//     a.download = `video-record-${batchName}.webm`; 
//     document.body.appendChild(a);
//     a.click();
//     // Clean up URL object after download
//     URL.revokeObjectURL(url);
// };