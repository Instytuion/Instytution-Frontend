import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react";
import useToast from "../../hooks/useToast";
import DeleteLessonImage from "../../services/courseAdmin/DeleteLessonImage";
import Spinner from "../Spinner/Spinner";


function DisplayImageForLesson(
    {index, img, setSelectedFiles, isEditing, lessonData, setAnyChange, setLessonData}
) {
    const [fileError, setFileError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useToast();

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

    const deleteImage = async (id)=>{
        try{
            setIsLoading(true)
            const response = await DeleteLessonImage(id);
            console.log("delete lesson image success - ", response);
            setLessonData((prev) => {
                return {...prev, images: prev.images.filter((image) => image.id !== id)}
            });
            showToast("Image deleted successfully", "success", 3000)
        }
        catch(error){
            console.log("some error while deleting lesson image- ", error);
        }
        finally{
            setIsLoading(false)
        }
    }

    const handleDeleteImage = (id)=>{
        if(window.confirm("Are you sure you want to delete this image?")){            
            deleteImage(id);
        }
    };

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        {!isEditing ? (
                <>
                <Box sx={{width:["100%", "100%", "60%"]}}>
                    <img
                        src={img.image}
                        alt={`Lesson-Image ${index + 1}`}
                        style={{ width: '100%', borderRadius: '20px' }}
                    />
                </Box>
                </>
            ) : (
                <Box>
                    {/* Show the current image */}
                    <Box sx={{width:["100%", "100%", "60%"], mb:2}}>
                        <img
                            src={img.image}
                            alt={`Lesson-Image ${index + 1}`}
                            style={{ width: '100%', borderRadius: '20px' }}
                        />
                    </Box>

                    {/* File input to upload new image */}
                    <Box>
                        <input
                            type="file"
                            accept="image/*"
                            id={`image-input-${index}`}
                            style={{ display: 'none' }}
                            onChange={(e) => {handleImageChange(e, index, img.id)}}
                        />
                        <label htmlFor={`image-input-${index}`}>
                            <Button variant="outlined" component="span">
                                Change Image
                            </Button>
                        </label>
                        <Button variant="outlined" color="error"
                        sx={{ml:2}}
                        onClick={()=> handleDeleteImage(img.id)}
                        >
                            Delete
                        </Button>
                    </Box>
                    {fileError && <> <br/> <span style={{ color: 'red' }}>{fileError}</span></>}
                </Box>
            )}
        </>
    )
}

export default DisplayImageForLesson
