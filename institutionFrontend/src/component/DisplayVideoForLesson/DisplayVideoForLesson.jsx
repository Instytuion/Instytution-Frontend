import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import DeleteLessonVideo from "../../services/courseAdmin/DeleteLessonVideo";
import useToast from "../../hooks/useToast";


function DisplayVideoForLesson(
    {index, video, setSelectedFiles, isEditing, lessonData, setAnyChange, setLessonData}
) {
    const [fileError, setFileError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useToast();

    useEffect(()=>{
        setFileError("")
    }, [isEditing])

    const handleVideoChange = (e, index, id) =>{
        const file = e.target.files[0]
        console.log('changed Video files - ', file);
        if(file){
            if(!file.type.startsWith('video/')) {
                setFileError('Only video files are allowed. This will be excluded.');
                return;
              }
            else if (file.size > 10 * 1024 * 1024) {
                setFileError('File size more than 10 MB is not allowed. This will be excluded.');
                return;
              }
            else{
                setFileError("")
              }
            const videoUrl = URL.createObjectURL(file);
            setSelectedFiles((prev)=>{
                const videoArray = [...prev.videos];
                videoArray[index] = { id:id, video: videoUrl, file: file}
                return {...prev, videos: videoArray}
            })
            setAnyChange((prevChange) => prevChange + 1);
        }
        else{
            setSelectedFiles((prev)=>{
                const videoArray = [...prev.videos];
                const video = lessonData.videos[index]["video"]
                videoArray[index] = { id:id, video: video}
                return {...prev, videos: videoArray}
            })
            if(!fileError){
                setAnyChange((prevChange) => prevChange - 1);
            }
            setFileError("")            
        }
    };

    const deleteVideo = async (id)=>{
        try{
            setIsLoading(true)
            const response = await DeleteLessonVideo(id);
            console.log("delete lesson video success - ", response);
            setLessonData((prev) => {
                return {...prev, videos: prev.videos.filter((video) => video.id !== id)}
            });
            showToast("Video deleted successfully", "success", 3000)
        }
        catch(error){
            console.log("some error while deleting lesson video- ", error);
        }
        finally{
            setIsLoading(false)
        }
    }

    const handleDeleteVideo = (id)=>{
        if(window.confirm("Are you sure you want to delete this image?")){            
            deleteVideo(id);
        }
    };

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        {!isEditing ? (
            <a
                href={video.video}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
            >
                <Button 
                    variant="text"
                    color="primary"
                    sx={{ textDecoration: 'underline' }}
                >
                    Open Video  {index + 1}
                </Button>
            </a>
        ) : (
            <>
                {/* Show the current file link */}
                <Box>
                    <a
                        href={video.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button 
                        variant="text"
                        color="primary"
                        sx={{ textDecoration: 'underline' }}
                        >
                            Open Video  {index + 1}
                        </Button>
                    </a>

                    {/* File input to upload new video */}
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {handleVideoChange(e, index, video.id)}}
                    />
                    {fileError && <> <br/> <span style={{ color: 'red' }}>{fileError}</span></>}
                </Box>
                <Box>
                    <Button variant="outlined" color="error"
                    sx={{ml:2}}
                    onClick={()=> handleDeleteVideo(video.id)}
                    >
                        Delete
                    </Button>
                </Box>
            </>
        )}
        </>
    )
}

export default DisplayVideoForLesson
