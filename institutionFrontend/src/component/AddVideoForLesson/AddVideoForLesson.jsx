import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

function AddVideoForLesson({ control, lessonIndex, setValue, videoErrors, setVideoErrors, newVideoErrors }) {
  const { fields: videoFields, append: appendvideo, remove: removevideo } = useFieldArray({
    control,
    name: `lessons.${lessonIndex}.videos`
  });
  const [fileError, setFileError] = useState("");

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
                onChange={(e) => {
                  const file = e.target.files;
  
                  if (file.length > 0) {
                    newVideoErrors[`lesson_${lessonIndex}_video_${videoIndex}`] = '';
                    setVideoErrors(newVideoErrors)
                    const selectedFile = file[0];
                    if (!selectedFile.type.startsWith('video/')) {
                      setFileError('Only video files are allowed');
                      return;
                    }
                    if (selectedFile.size > 10 * 1024 * 1024) {
                      setFileError('File size more than 10 MB is not allowed');
                      return;
                    }
                    setFileError("");
                    setValue(`lessons.${lessonIndex}.videos.${videoIndex}.video`, file);
                  }
                  else{
                    setFileError('Select a file or remove this file input.');
                    return;
                  }
                }}
                style={{ display: 'block', marginBottom: '8px', flexGrow: 1 }}
            />
            {fileError && <span style={{ color: 'red' }}>{fileError}</span>}
            {videoErrors[`lesson_${lessonIndex}_video_${videoIndex}`] && (
              <span style={{ color: 'red' }}>{videoErrors[`lesson_${lessonIndex}_video_${videoIndex}`]}</span>
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
