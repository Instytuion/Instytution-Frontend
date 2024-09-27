import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import ClearIcon from '@mui/icons-material/Clear';

function AddVideoForLesson({ control, lessonIndex, register, errors }) {
  const { fields: videoFields, append: appendvideo, remove: removevideo } = useFieldArray({
    control,
    name: `lessons.${lessonIndex}.videos`
  });

  const handleAddVideo = () => {
    appendvideo({ video: null });
  };

  return (
    <Box border={1} p={2} sx={{ borderColor: 'grey.400', borderRadius: 1,}}>
        <Typography variant="h6" sx={{ mb: 2 }}>Videos</Typography>
        {videoFields.map((videoItem, videoIndex) => (
            <Box key={videoItem.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <input
                type="file"
                accept="video/*"
                {...register(`lessons.${lessonIndex}.videos.${videoIndex}.video`, { 
                    required: 'Video is required',
                    validate: {
                        fileType: (value) => {
                            if (!value || value.length === 0) return true;
                            return value[0]?.type.startsWith('video/') || 'Only video files are allowed';
                        },
                        size: (value) => {
                          if (!value || value.length === 0) return true;
                          return value[0]?.size <= 15 * 1024 * 1024 || 'file size more than 15 MB not allowed';
                        },
                    },
                })}
                style={{ display: 'block', marginBottom: '8px', flexGrow: 1 }}
            />
            {errors?.lessons?.[lessonIndex]?.videos?.[videoIndex]?.video && (
                <span style={{ color: 'red', marginLeft: '8px' }}>
                {errors?.lessons?.[lessonIndex]?.videos?.[videoIndex]?.video?.message}
                </span>
            )}
            <IconButton
                color="error"
                onClick={() => removevideo(videoIndex)}
                sx={{ ml: 2 }}
            >
                <ClearIcon />
            </IconButton>
            </Box>
        ))}

        <Button variant="outlined" color="primary" onClick={handleAddVideo}>
            Add Videos
        </Button>
    </Box>
  );
}

export default AddVideoForLesson;
