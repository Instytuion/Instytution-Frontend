import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import useToast from '../../hooks/useToast';
import AddLessonImage from '../../services/courseAdmin/AddLessonImage';
import Spinner from '../Spinner/Spinner';

function UploadImageModal({ open, onClose, lessonId, setLessonData}) {
    const [selectedImage, setSelectedImage] = useState(null)
    const [disableUpload, setDisableUpload] = useState(true)
    const [fileError, setFileError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const showToast = useToast();

    useEffect(()=>{
        if(selectedImage){
            setDisableUpload(false)
        }
        else{
            setDisableUpload(true)
        }
    }, [selectedImage])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log("selected image file for upload - ", file);
        if(file){
            if(!file.type.startsWith('image/')) {
                setFileError('Only image files are allowed.');
                setSelectedImage(null)
                return;
              }
            else if (file.size > 5 * 1024 * 1024) {
                setFileError('File size more than 5 MB is not allowed.');
                setSelectedImage(null)
                return;
              }
            else{
                setFileError("")
              }
            const imageUrl = URL.createObjectURL(file);
            const newImage = {image: file, imageUrl: imageUrl}
            setSelectedImage(newImage)
            setDisableUpload(false);
        }
        else{
            setSelectedImage(null)
            setFileError("")
        }
        
    };

    const addImage = async(formData)=>{
        try{
            setIsLoading(true)
            const response = await AddLessonImage(formData)
            console.log("add lesson image success - ", response);
            setSelectedImage(null)
            setLessonData((prev)=>{
                const newImages = [...prev.images, response]
                return {...prev, images: newImages}
            });
            showToast("New image added successfully", "success", 3000)
        }
        catch(error){
            console.log("some error while adding new image of a lesson -", error);
            setSelectedImage(null)
        }
        finally{
            setIsLoading(false)
            onClose()
        }
    }

    const handleUpload = () => {
        const formData = new FormData();

        formData.append("lesson", lessonId)
        formData.append("image", selectedImage.image)
        if(window.confirm("Do you want to add this image to the lesson?")){
            addImage(formData); 
        }  
    };

    if(isLoading){
        return <Spinner />
    }

    return (
        <Dialog 
        open={open} 
        onClose={onClose}
        fullWidth
        >
            <DialogTitle>Add New Image</DialogTitle>
            <DialogContent>
                {selectedImage? (
                    <Box sx={{mb:3, maxWidth: "50%"}}>
                        <img
                            src={selectedImage.imageUrl}
                            alt="Selected-img"
                            style={{ width: '100%', borderRadius: '20px' }}
                        />
                    </Box>
                ):(
                    <></>
                )}
                
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e)=>handleFileChange(e)}
                />
                {fileError && <> <br/> <span style={{ color: 'red' }}>{fileError}</span></>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancel
                </Button>
                <Button 
                disabled={disableUpload}
                onClick={handleUpload} 
                color="primary">
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UploadImageModal
