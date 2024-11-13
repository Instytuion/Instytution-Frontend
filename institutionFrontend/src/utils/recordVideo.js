
import { current } from "@reduxjs/toolkit";
import ClassRoomServices from "../services/classRoom/ClassRoomServices";

let mediaRecorder;
let batchName;
let totalChunks ;
let uploadedChunks;
let recordId;
const lessonDate = new Date().toISOString().split('T')[0];

export const startRecording = (stream, batch, videoChunkSerial, recordIdList)=>{
    console.log("startRecording called...");
    
    recordId = `record-${Date.now()}`
    recordIdList.current.push(recordId)
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
                await uploadVideos(event.data, videoChunkSerial, recordId);
                uploadedChunks++;
            } catch (error) {
                uploadedChunks++;
                console.error("Error uploading chunk:", error);
            }
        };
    };
    mediaRecorder.start(10000)
};

export const stopRecording = (showToast, recordIdList)=>{
    console.log("stopRecording called...");
    mediaRecorder.stop();

    mediaRecorder.onstop = async function(){
        showToast("Making session video. This may take few minutes.", "success", 3000)
        console.log("mediaRocord.onstop  called...");
        await waitForUploadsToComplete();
        console.log("All chunks uploaded. Calling bindVideoChunks...");

        if(uploadedChunks > 0){
            bindVideoChunks(recordIdList);
            //bindingCheckPolling(showToast);
        }
        totalChunks = 0;
        uploadedChunks = 0;
    };
};

export const uploadVideos = async (data, videoChunkSerial, recordId)=>{
    console.log("uploadVideos called...");
    videoChunkSerial.current++;
    
    const formData = new FormData();
    const blob = new Blob ([data], {"type": "video/webm"});
    const file = new File([blob], `video-chunk-${batchName}-${videoChunkSerial.current}`, {"type": "video/webm"});
    formData.append("video_chunk", file);

    try{
        const response = await ClassRoomServices.uploadVideoChunks(formData, batchName, videoChunkSerial, recordId);
        console.log("video chunk uploaded successfully");
        
    }
    catch(error){
        console.log(`error while uploading video chunk file - ${file}`, error);
        
    }
};

export const bindVideoChunks = (recordIdList)=>{
    console.log("bindVideoChunks called...");
    let popValue;
    if(recordIdList.current.length > 0){
        popValue = recordIdList.current.shift()
        ClassRoomServices.bindVideoChunk(lessonDate, batchName, popValue)
        .then(response => {
            console.log('Video chunks binding process accepted.', response);
        })
        .catch(error => {
            console.log(`error while accepting bind of video chunks of ${batchName} on ${lessonDate}`, error);
        })
    }
};

async function waitForUploadsToComplete() {
    while (uploadedChunks < totalChunks) {
        await new Promise(resolve => setTimeout(resolve, 500)); 
    }
}

// const bindingCheckPolling = (showToast) => {
//     const interval = setInterval(async () => {
//         const response = await ClassRoomServices.checkBindingStatus(lessonDate, batchName);
//         if (response) {
//             const status = response.status;
//             console.log('Current video binding status:', status);
//             if (status === 'completed') {
//                 clearInterval(interval); 
//                 showToast("Session video made successfully", "success", 3000);
//                 console.log("Video binding completed successfully...");
//             }
//             else if (status === 'processing') {
//                 console.log("Video binding is still processing...");
//             }
//         }
//     }, 5000);
// };


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