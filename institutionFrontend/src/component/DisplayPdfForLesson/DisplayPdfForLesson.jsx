import { Button } from "@mui/material"
import { useEffect, useState } from "react";

function DisplayPdfForLesson(
    {index, pdf, setSelectedFiles, isEditing, lessonData, setAnyChange}
) {
    const [fileError, setFileError] = useState("");

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
            </>
        )}
        </>
    )
}

export default DisplayPdfForLesson
