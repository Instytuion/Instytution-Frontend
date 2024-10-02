import React, { useState, useEffect } from 'react';
import { Paper, Box, TextField, Button, IconButton, Tooltip, Typography, Grid, List, ListItem, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import UpdateLesson from '../../services/courseAdmin/UpdateLesson';
import Spinner from '../Spinner/Spinner';
import DisplayImageForLesson from '../DisplayImageForLesson/DisplayImageForLesson';
import DisplayPdfForLesson from '../DisplayPdfForLesson/DisplayPdfForLesson';
import DisplayVideoForLesson from '../DisplayVideoForLesson/DisplayVideoForLesson';
import useToast from '../../hooks/useToast';


const LessonSection = ({ lessonItem, handleRemoveLesson}) => {
    const [anyChange, setAnyChange] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lessonData, setLessonData] = useState(lessonItem);
    const [disableSave, setDisableSave] = useState(true)
    const showToast = useToast();
    const [selectedFiles, setSelectedFiles] = useState(
        {
            images : lessonData.images,
            pdfs: lessonData.pdfs,
            videos: lessonData.videos,
        }
    );

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: lessonData?.name || '',
            week: lessonData?.week || '',
            description: lessonData?.description || '',
        }
    });
    const watchedWeek = watch('week');
    const watchedDescription = watch('description');

    useEffect(() => {
        if (isEditing && (
            watchedWeek !== lessonData.week || watchedDescription !== lessonData.description || anyChange > 0
        )) {
            setDisableSave(false);
        } else {
            setDisableSave(true);
        }
    }, [watchedWeek, watchedDescription, anyChange, isEditing, lessonData]);


    useEffect(() => {
        console.log("inside lessonData useEffect...");
        handleCancel();
    }, [lessonData, reset]);


    useEffect(() => {
        console.log('Updated selectedFiles state:', selectedFiles);
    }, [selectedFiles]);


    const updateData = async (id, formData)=>{
        try{
            setIsLoading(true)
            const response = await UpdateLesson(id, formData)
            setLessonData(response.data)
            setAnyChange(0)
            showToast(`${lessonData.name} updated successfully`, "success", 3000)
            console.log("lesson update success - ", response);
        }
        catch(error){
            console.log("some error while updating a lesson - ", error);
            showToast("Error occured", "error", 3000)
        }
        finally{
            setIsLoading(false)
        }
    }

    const handleCancel = ()=>{
        reset({
            name: lessonData.name,
            week: lessonData.week,
            description: lessonData.description,
        }); 
        setSelectedFiles((prev)=> (
            {...prev,
                images : lessonData.images,
                pdfs: lessonData.pdfs,
                videos: lessonData.videos,
            }
        ));
        setIsEditing(false);
        setAnyChange(0);
        setDisableSave(true);
    };

    const onSubmit = (data) => {
        const confirmUpdate = window.confirm("Are you sure you want to update this lesson?");
        if(confirmUpdate){
            setIsEditing(false);
            const formData = new FormData();

            formData.append('week', data.week);
            formData.append('description', data.description);

            selectedFiles.images.forEach((img) => {
                if (img.file) {
                    formData.append(`images[${img.id}]`, img.file); 
                }
            });

            selectedFiles.pdfs.forEach((pdf) => {
                if (pdf.file) {
                    formData.append(`pdfs[${pdf.id}]`, pdf.file); 
                }
            });

            selectedFiles.videos.forEach((video) => {
                if (video.file) {
                    formData.append(`videos[${video.id}]`, video.file);
                }
            });
            updateData(lessonData.id, formData)
        };
    };

    if (isLoading) {
        return <Spinner />;
      }

    return (
        <Paper sx={{ my: 3 }}>
            <Button
                color="error"
                onClick={() => handleRemoveLesson(lessonData.id)}
                sx={{ mt: 2 }}
                endIcon={<ClearIcon />}
            >
                Remove This Lesson
            </Button>
            <Box p={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label={`Lesson Name`}
                        {...register('name')}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label={`Week`}
                        type="number"
                        {...register('week', { required: 'Week is required'} )}
                        error={!!errors.week}
                        helperText={errors.week?.message}
                        InputProps={{
                            readOnly: !isEditing,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            mb: 2,
                            backgroundColor: isEditing ? 'white' : '',
                        }}
                    />
                    <TextField
                        fullWidth
                        label={`Description`}
                        multiline
                        rows={4}
                        {...register('description', { required: 'Description is required'})}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        InputProps={{
                            readOnly: !isEditing,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            mb: 2,
                            backgroundColor: isEditing ? 'white' : '',
                        }}
                    />

                    {/* Media Data Display */}
                    <Box sx={{ mb: 2, p:2 }}>
                        <Typography variant="h6" my={1}>Media</Typography>
                        <Grid container spacing={2}>
                            {/* Display Images */}
                            {selectedFiles.images.length > 0 && (
                                <Grid item xs={12} sx={{border:1, my:1, p:2}}>
                                    <Typography variant="subtitle1">Images:</Typography>
                                    <Grid container spacing={1}>
                                        {selectedFiles.images.map((img, index) => (
                                            <Grid item key={index} xs={12} sm={12} md={6} sx={{my:2}}>
                                                <DisplayImageForLesson 
                                                index={index}
                                                img={img}
                                                setSelectedFiles={setSelectedFiles}
                                                isEditing={isEditing}
                                                setDisableSave={setDisableSave}
                                                lessonData={lessonData}
                                                anyChange={anyChange}
                                                setAnyChange={setAnyChange}
                                                setLessonData={setLessonData}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            )}

                            {/* Display PDFs */}
                            {selectedFiles.pdfs.length > 0 && (
                                <Grid item xs={12} sx={{border:1, my:1, p:2}}>
                                    <Typography variant="subtitle1">PDFs:</Typography>
                                    {selectedFiles.pdfs.map((pdf, index) => (
                                        <Stack key={index} direction={"row"}
                                        justifyContent="space-between"
                                        sx={{mb:2}}
                                        >
                                            <DisplayPdfForLesson 
                                            index={index}
                                            pdf={pdf}
                                            setSelectedFiles={setSelectedFiles}
                                            isEditing={isEditing}
                                            setDisableSave={setDisableSave}
                                            lessonData={lessonData}
                                            anyChange={anyChange}
                                            setAnyChange={setAnyChange}
                                            setLessonData={setLessonData}
                                            />
                                        </Stack>
                                    ))}
                                </Grid>
                            )}

                            {/* Display Videos */}
                            {selectedFiles.videos.length > 0 && (
                                <Grid item xs={12} sx={{border:1, my:1, p:2}}>
                                    <Typography variant="subtitle1">Videos:</Typography>
                                        {selectedFiles.videos.map((video, index) => (
                                            <Stack key={index} direction={"row"}
                                            justifyContent="space-between"
                                            sx={{mb:2}}
                                            >
                                                <DisplayVideoForLesson 
                                                index={index}
                                                video={video}
                                                setSelectedFiles={setSelectedFiles}
                                                isEditing={isEditing}
                                                setDisableSave={setDisableSave}
                                                lessonData={lessonData}
                                                anyChange={anyChange}
                                                setAnyChange={setAnyChange}
                                                setLessonData={setLessonData}
                                                />
                                            </Stack>
                                        ))}
                                </Grid>
                            )}
                        </Grid>
                    </Box>

                    {!isEditing ? (
                        <Tooltip title="Edit Lesson" arrow>
                            <IconButton onClick={() => setIsEditing(true)} color="primary">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                disabled={disableSave}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ ml: 2 }}
                                onClick={() => handleCancel()}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </form>
            </Box>
        </Paper>
    );
};

export default LessonSection;
