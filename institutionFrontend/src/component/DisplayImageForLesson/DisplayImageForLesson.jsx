import { Box } from "@mui/material"
import { useEffect, useState } from "react";


function DisplayImageForLesson(
    {index, img, setSelectedFiles, isEditing, lessonData, setAnyChange}
) {
    const [fileError, setFileError] = useState("");

    useEffect(()=>{
        setFileError("")
    }, [isEditing])

    const handleImageChange = (e, index, id) =>{
        const file = e.target.files[0]
        console.log('changed Image files - ', file);
        if(file){
            if(!file.type.startsWith('image/')) {
                setFileError('Only image files are allowed. This will be excluded.');
                return;
              }
            else if (file.size > 5 * 1024 * 1024) {
                setFileError('File size more than 5 MB is not allowed. This will be excluded.');
                return;
              }
            else{
                setFileError("")
              }
            const imageUrl = URL.createObjectURL(file);
            setSelectedFiles((prev)=>{
                const imgArray = [...prev.images];
                imgArray[index] = { id:id, image: imageUrl, file: file}
                return {...prev, images: imgArray}
            })
            setAnyChange((prevChange) => prevChange + 1);
        }
        else{
            setSelectedFiles((prev)=>{
                const imgArray = [...prev.images];
                const image = lessonData.images[index]["image"]
                imgArray[index] = { id:id, image: image}
                return {...prev, images: imgArray}
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
                <>
                    <img
                        src={img.image}
                        alt={`Lesson-Image ${index + 1}`}
                        style={{ width: '100%', borderRadius: '4px' }}
                    />
                </>
            ) : (
                <Box>
                    {/* Show the current image */}
                    <img
                        src={img.image}
                        alt={`Lesson-Image ${index + 1}`}
                        sx={{ width: '100%', borderRadius: '4px' }}
                    />

                    {/* File input to upload new image */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {handleImageChange(e, index, img.id)}}
                    />
                    {fileError && <> <br/> <span style={{ color: 'red' }}>{fileError}</span></>}
                </Box>
            )}
        </>
    )
}

export default DisplayImageForLesson
