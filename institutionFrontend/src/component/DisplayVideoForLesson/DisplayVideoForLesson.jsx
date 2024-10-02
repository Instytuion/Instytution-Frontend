import { Button } from "@mui/material"
import { useEffect, useState } from "react";


function DisplayVideoForLesson(
    {index, video, setSelectedFiles, isEditing, lessonData, setAnyChange}
) {
    const [fileError, setFileError] = useState("");

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
            </>
        )}
        </>
    )
}

export default DisplayVideoForLesson
