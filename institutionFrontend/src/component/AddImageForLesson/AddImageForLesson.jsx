import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

function AddImageForLesson({ control, lessonIndex, setValue, imageErrors, setImageErrors, newImageErrors }) {
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: `lessons.${lessonIndex}.images`
  });
  const [fileError, setFileError] = useState("");

  const handleAddImage = () => {
    appendImage({ image: null });
  };

  return (
    <Box border={1} p={2} sx={{ borderColor: 'grey.400', borderRadius: 1, mb:2}}>
        <Typography variant="h6" sx={{ mb: 2 }}>Images</Typography>
        {imageFields.map((imageItem, imageIndex) => (
            <Box key={imageItem.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files;

                if (file.length > 0) {
                  newImageErrors[`lesson_${lessonIndex}_image_${imageIndex}`] = '';
                  setImageErrors(newImageErrors)
                  const selectedFile = file[0];
                  if (!selectedFile.type.startsWith('image/')) {
                    setFileError('Only image files are allowed');
                    return;
                  }
                  if (selectedFile.size > 5 * 1024 * 1024) {
                    setFileError('File size more than 5 MB is not allowed');
                    return;
                  }
                  setFileError("");
                  setValue(`lessons.${lessonIndex}.images.${imageIndex}.image`, file);
                }
                else{
                  setFileError('Select a file or remove this file input.');
                  return;
                }
              }}
              style={{ display: 'block', marginBottom: '8px', flexGrow: 1 }}
            />
            {fileError && <span style={{ color: 'red' }}>{fileError}</span>}
            {imageErrors[`lesson_${lessonIndex}_image_${imageIndex}`] && (
              <span style={{ color: 'red' }}>{imageErrors[`lesson_${lessonIndex}_image_${imageIndex}`]}</span>
            )}

            <IconButton
                color="error"
                onClick={() => removeImage(imageIndex)}
                sx={{ ml: 2 }}
            >
                <ClearIcon />
            </IconButton>
            </Box>
        ))}

        <Button variant="outlined" color="primary" onClick={handleAddImage}>
            Add Image
        </Button>
    </Box>
  );
}

export default AddImageForLesson;
