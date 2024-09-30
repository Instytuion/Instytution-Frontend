import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

function AddPdfForLesson({ control, lessonIndex, setValue, pdfErrors, setPdfErrors, newPdfErrors }) {
  const { fields: pdfFields, append: appendPdf, remove: removePdf } = useFieldArray({
    control,
    name: `lessons.${lessonIndex}.pdfs`
  });
  const [fileError, setFileError] = useState("");

  const handleAddPdf = () => {
    appendPdf({ pdf: null });
  };

  return (
    <Box border={1} p={2} sx={{ borderColor: 'grey.400', borderRadius: 1, mb:2}}>
        <Typography variant="h6" sx={{ mb: 2 }}>PDF Files</Typography>
        {pdfFields.map((pdfItem, pdfIndex) => (
            <Box key={pdfItem.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files;
  
                  if (file.length > 0) {
                    newPdfErrors[`lesson_${lessonIndex}_pdf_${pdfIndex}`] = '';
                    setPdfErrors(newPdfErrors)
                    const selectedFile = file[0];
                    if (!selectedFile.type.startsWith('application/pdf')) {
                      setFileError('Only PDF files are allowed');
                      return;
                    }
                    if (selectedFile.size > 5 * 1024 * 1024) {
                      setFileError('File size more than 5 MB is not allowed');
                      return;
                    }
                    setFileError("");
                    setValue(`lessons.${lessonIndex}.pdfs.${pdfIndex}.pdf`, file);
                  }
                  else{
                    setFileError('Select a file or remove this file input.');
                    return;
                  }
                }}
                style={{ display: 'block', marginBottom: '8px', flexGrow: 1 }}
            />
            {fileError && <span style={{ color: 'red' }}>{fileError}</span>}
            {pdfErrors[`lesson_${lessonIndex}_pdf_${pdfIndex}`] && (
              <span style={{ color: 'red' }}>{pdfErrors[`lesson_${lessonIndex}_pdf_${pdfIndex}`]}</span>
            )}
            <IconButton
                color="error"
                onClick={() => removePdf(pdfIndex)}
                sx={{ ml: 2 }}
            >
                <ClearIcon />
            </IconButton>
            </Box>
        ))}

        <Button variant="outlined" color="primary" onClick={handleAddPdf}>
            Add PDF
        </Button>
    </Box>
  );
}

export default AddPdfForLesson;
