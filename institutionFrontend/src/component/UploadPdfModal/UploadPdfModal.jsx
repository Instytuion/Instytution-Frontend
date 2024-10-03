import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import useToast from '../../hooks/useToast';
import Spinner from '../Spinner/Spinner';
import AddLessonPdf from '../../services/courseAdmin/AddLessonPdf';

function UploadPdfModal({ open, onClose, lessonId, setLessonData}) {
    const [selectedPdf, setSelectedPdf] = useState(null)
    const [disableUpload, setDisableUpload] = useState(true)
    const [fileError, setFileError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const showToast = useToast();

    useEffect(()=>{
        if(selectedPdf){
            setDisableUpload(false)
        }
        else{
            setDisableUpload(true)
        }
    }, [selectedPdf])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log("selected PDF file for upload - ", file);
        if(file){
            if(!file.type.startsWith('application/pdf')) {
                setFileError('Only PDF files are allowed.');
                setSelectedPdf(null)
                return;
              }
            else if (file.size > 5 * 1024 * 1024) {
                setFileError('File size more than 5 MB is not allowed.');
                setSelectedPdf(null)
                return;
              }
            else{
                setFileError("")
              }
            const pdfUrl = URL.createObjectURL(file);
            const newPdf = {pdf: file, pdfUrl: pdfUrl}
            setSelectedPdf(newPdf)
            setDisableUpload(false);
        }
        else{
            setSelectedPdf(null)
            setFileError("")
        }
        
    };

    const addPdf = async(formData)=>{
        try{
            setIsLoading(true)
            const response = await AddLessonPdf(formData)
            console.log("add lesson PDF success - ", response);
            setSelectedPdf(null)
            setLessonData((prev)=>{
                const newPdfs = [...prev.pdfs, response]
                return {...prev, pdfs: newPdfs}
            });
            showToast("New File added successfully", "success", 3000)
        }
        catch(error){
            console.log("some error while adding new pdf of a lesson -", error);
            setSelectedPdf(null)
        }
        finally{
            setIsLoading(false)
            onClose()
        }
    }

    const handleUpload = () => {
        const formData = new FormData();

        formData.append("lesson", lessonId)
        formData.append("pdf", selectedPdf.pdf)
        if(window.confirm("Do you want to add this File to the lesson?")){
            addPdf(formData); 
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
            <DialogTitle>Add New PDF</DialogTitle>
            <DialogContent>
                {selectedPdf? (
                    <Box sx={{mb:3, maxWidth: "50%"}}>
                        <a
                            href={selectedPdf.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                variant="text"
                                color="primary"
                                sx={{ textDecoration: 'underline' }}
                            >
                                Open PDF
                            </Button>
                        </a>
                    </Box>
                ):(
                    <></>
                )}
                
                <input
                    type="file"
                    accept="application/pdf"
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

export default UploadPdfModal
