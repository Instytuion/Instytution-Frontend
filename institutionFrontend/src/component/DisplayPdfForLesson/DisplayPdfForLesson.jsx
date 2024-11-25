import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import DeleteLessonPdf from "../../services/courseAdmin/DeleteLessonPdf";
import useToast from "../../hooks/useToast";

function DisplayPdfForLesson(
    {index, pdf, setSelectedFiles, isEditing, lessonData, setAnyChange, setLessonData}
) {
    const [fileError, setFileError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useToast();

    useEffect(()=>{
        setFileError("")
    }, [isEditing])

    const handlePdfChange = (e, index, id) =>{
        const file = e.target.files[0]
        console.log('changed PDF files - ', file);
        if(file){
            if(!file.type.startsWith('application/pdf')) {
                setFileError('Only PDF files are allowed. This will be excluded.');
                return;
              }
            else if (file.size > 5 * 1024 * 1024) {
                setFileError('File size more than 5 MB is not allowed. This will be excluded.');
                return;
              }
            else{
                setFileError("")
              }
            const pdfUrl = URL.createObjectURL(file);
            setSelectedFiles((prev)=>{
                const pdfArray = [...prev.pdfs];
                pdfArray[index] = { id:id, pdf: pdfUrl, file: file}
                return {...prev, pdfs: pdfArray}
            })
            setAnyChange((prevChange) => prevChange + 1);
        }
        else{
            setSelectedFiles((prev)=>{
                const pdfArray = [...prev.pdfs];
                const pdf = lessonData.pdfs[index]["pdf"]
                pdfArray[index] = { id:id, pdf: pdf}
                return {...prev, pdfs: pdfArray}
            })
            if(!fileError){
                setAnyChange((prevChange) => prevChange - 1);
            }
            setFileError("")
        }
    };

    const deletePdf = async (id)=>{
        try{
            setIsLoading(true)
            const response = await DeleteLessonPdf(id);
            console.log("delete lesson pdf success - ", response);
            setLessonData((prev) => {
                return {...prev, pdfs: prev.pdfs.filter((pdf) => pdf.id !== id)}
            });
            showToast("Pdf deleted successfully", "success", 3000)
        }
        catch(error){
            console.log("some error while deleting lesson Pdf- ", error);
        }
        finally{
            setIsLoading(false)
        }
    }

    const handleDeletePdf = (id)=>{
        if(window.confirm("Are you sure you want to delete this file?")){            
            deletePdf(id);
        }
    };

    if(isLoading){
        return <Spinner />
    }


    return (
        <>
        {!isEditing ? (
            <a
                href={pdf.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
            >
                <Button
                    variant="text"
                    color="primary"
                    sx={{ textDecoration: 'underline' }}
                >
                    Open PDF - {index+1}
                </Button>
            </a>
        ) : (
            <>
                {/* Show the current file link */}
                <Box>
                    <a
                        href={pdf.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button
                            variant="text"
                            color="primary"
                            sx={{ textDecoration: 'underline' }}
                        >
                            Open PDF - {index+1}
                        </Button>
                    </a>

                    {/* File input to upload new PDF */}
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {handlePdfChange(e, index, pdf.id)}}
                    />
                    {fileError && <> <br/> <span style={{ color: 'red' }}>{fileError}</span></>}
                </Box>
                <Box>
                    {lessonData.pdfs.length > 1 &&(
                        <Button variant="outlined" color="error"
                        sx={{ml:2}}
                        onClick={()=> handleDeletePdf(pdf.id)}
                        >
                            Delete
                        </Button>
                    )}
                </Box>               
            </>
        )}
        </>
    )
}

export default DisplayPdfForLesson
