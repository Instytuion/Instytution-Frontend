import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import ClearIcon from '@mui/icons-material/Clear';

function AddPdfForLesson({ control, lessonIndex, register, errors }) {
  const { fields: pdfFields, append: appendPdf, remove: removePdf } = useFieldArray({
    control,
    name: `lessons.${lessonIndex}.pdfs`
  });

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
                accept=".pdf"
                {...register(`lessons.${lessonIndex}.pdfs.${pdfIndex}.pdf`, { 
                    required: 'PDF file is required',
                    validate: {
                        fileType: (value) => {
                            if (!value || value.length === 0) return true;
                            return value[0]?.type === 'application/pdf' || 'Only PDF files are allowed';
                        },
                        size: (value) => {
                          if (!value || value.length === 0) return true;
                          return value[0]?.size <= 5 * 1024 * 1024 || 'file size more than 5 MB not allowed';
                        },
                    },
                })}
                style={{ display: 'block', marginBottom: '8px', flexGrow: 1 }}
            />
            {errors?.lessons?.[lessonIndex]?.pdfs?.[pdfIndex]?.pdf && (
                <span style={{ color: 'red', marginLeft: '8px' }}>
                {errors?.lessons?.[lessonIndex]?.pdfs?.[pdfIndex]?.pdf?.message}
                </span>
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
