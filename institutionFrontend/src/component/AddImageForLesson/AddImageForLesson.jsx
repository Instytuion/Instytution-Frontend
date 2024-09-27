import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import ClearIcon from '@mui/icons-material/Clear';

function AddImageForLesson({ control, lessonIndex, register, errors }) {
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: `lessons.${lessonIndex}.images`
  });

  const handleAddImage = () => {
    appendImage({ image: null });
  };

  return (
    <Box border={1} p={2} sx={{ borderColor: 'grey.400', borderRadius: 1, mb:2}}>
        <Typography variant="h6" sx={{ mb: 2 }}>Images</Typography>
        {imageFields.map((imageItem, imgIndex) => (
            <Box key={imageItem.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <input
                type="file"
                accept="image/*"
                {...register(`lessons.${lessonIndex}.images.${imgIndex}.image`, { 
                    required: 'Image is required',
                    validate: {
                        fileType: (value) => {
                            if (!value || value.length === 0) return true;
                            return value[0]?.type.startsWith('image/') || 'Only image files are allowed';
                        },
                        size: (value) => {
                          if (!value || value.length === 0) return true;
                          return value[0]?.size <= 5 * 1024 * 1024 || 'file size more than 5 MB not allowed';
                        },
                    },
                })}
                style={{ display: 'block', marginBottom: '8px', flexGrow: 1 }}
            />
            {errors?.lessons?.[lessonIndex]?.images?.[imgIndex]?.image && (
                <span style={{ color: 'red', marginLeft: '8px' }}>
                {errors?.lessons?.[lessonIndex]?.images?.[imgIndex]?.image?.message}
                </span>
            )}
            <IconButton
                color="error"
                onClick={() => removeImage(imgIndex)}
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
