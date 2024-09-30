import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, Box, Typography, Container, Paper, IconButton } from '@mui/material';
import PostCourseLessons from "../../services/courseAdmin/PostCourseLessons";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import AddImageForLesson from "../../component/AddImageForLesson/AddImageForLesson";
import ClearIcon from '@mui/icons-material/Clear';
import AddPdfForLesson from "../../component/AddPdfForLesson/AddPdfForLesson";
import AddVideoForLesson from "../../component/AddVideoForLesson/AddVideoForLesson";
import { useState } from "react";
import Spinner from "../../component/Spinner/Spinner";


function AddLessonsPage() {
  const showToast = useToast()
  const { courseName } = useParams();
  const [imageErrors, setImageErrors] = useState({});
  const [pdfErrors, setPdfErrors] = useState({});
  const [videoErrors, setVideoErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const newImageErrors = {};
  const newPdfErrors = {};
  const newVideoErrors = {};
  
  const { control, register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      lessons: [
        { lessonName: '', 
          lessonDescription: '', 
          images: [{ image: null }],
          pdfs: [{ pdf: null }],
          videos: [{ video: null }],
         }
      ]
    }
  });

  const { fields: lessonFields, append: appendLesson, remove: removeLesson } = useFieldArray({
    control,
    name: 'lessons'
  });
  
  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    const confirmPdf = data.lessons.every((lesson)=> lesson.pdfs.length > 0)
    if(!confirmPdf){
      showToast("Each lesson must have at least one PDF chapter", "error", 3000)
      return
    }
  
    const formData = new FormData();
  
    data.lessons.forEach((lesson, lessonIndex) => {
      formData.append(`lessons[${lessonIndex}][lessonName]`, lesson.lessonName);
      formData.append(`lessons[${lessonIndex}][lessonDescription]`, lesson.lessonDescription);
      formData.append(`lessons[${lessonIndex}][week]`, lesson.week);
  
      lesson.images.forEach((imageObj, imageIndex) => {
        if (!imageObj.image || !imageObj.image[0]) {
          console.log("no image caught");
          
          newImageErrors[`lesson_${lessonIndex}_image_${imageIndex}`] = 'Image is required';
        } else {
          formData.append(`lessons[${lessonIndex}][images][${imageIndex}][image]`, imageObj.image[0]);
        }
      });

      lesson.pdfs.forEach((pdfObj, pdfIndex) => {
        if (!pdfObj.pdf || !pdfObj.pdf[0]) {
          console.log("no PDF caught");
          newPdfErrors[`lesson_${lessonIndex}_pdf_${pdfIndex}`] = 'PDF is required';
        } else {
          formData.append(`lessons[${lessonIndex}][pdfs][${pdfIndex}][pdf]`, pdfObj.pdf[0]);
        }
      });

      lesson.videos.forEach((videoObj, videoIndex) => {
        if (!videoObj.video || !videoObj.video[0]) {
          console.log("no video caught");
          newVideoErrors[`lesson_${lessonIndex}_video_${videoIndex}`] = 'Video is required';
        } else {
          formData.append(`lessons[${lessonIndex}][videos][${videoIndex}][video]`, videoObj.video[0]);
        }
      });
    });


  setImageErrors(newImageErrors);
  setPdfErrors(newPdfErrors);
  setVideoErrors(newVideoErrors);


  if (
    Object.keys(newImageErrors).length > 0 ||
    Object.keys(newPdfErrors).length > 0 ||
    Object.keys(newVideoErrors).length > 0
) {
    return;
}
  
  try {
      setLoading(true);
      const response = await PostCourseLessons(courseName, formData);
      console.log('Response:', response);
      setLoading(false);
      showToast("Lessons successfully submitted", "success", 3000)
      navigate("/course-admin/dashboard")
      reset({
        lessons: [
          {
            lessonName: '',
            lessonDescription: '',
            images: [{ image: null }],
            pdfs: [{ pdf: null }],
            videos: [{ video: null }],
          },
        ],
      });
    } catch (error) {
      console.log("Some error while posting add lessons data- ", error);
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };

  const handleAddLesson = () => {
    appendLesson(
      { 
        lessonName: '', 
        lessonDescription: '', 
        images: [{ image: null }], 
        pdfs: [{ pdf: null }],
        videos: [{ video: null }],
      }
    );
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <Box sx={{ width: ["100%", "100%", "75%"], mx: 'auto', p: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Course Lesson Page
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {lessonFields.map((lessonItem, lessonIndex) => (
              <Paper key={lessonItem.id}>
                <Box  p={2} 
                sx={{ my: 3,}}
                >
                  <Button
                    color="error"
                    onClick={() => removeLesson(lessonIndex)}
                    sx={{ mb: 2 }}
                    endIcon={<ClearIcon />}
                  >
                    Remove This Lesson
                  </Button>
                  <TextField
                    fullWidth
                    label={`Lesson-Name`}
                    {...register(`lessons.${lessonIndex}.lessonName`, { required: 'Lesson Name is required' })}
                    error={!!errors?.lessons?.[lessonIndex]?.lessonName}
                    helperText={errors?.lessons?.[lessonIndex]?.lessonName?.message}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Week"
                    type="number"
                    {...register(`lessons.${lessonIndex}.week`, { 
                      required: 'Week number is required', 
                      valueAsNumber: true,
                      validate: value => Number.isInteger(value) || 'Only integer values are allowed'
                    })}
                    error={!!errors?.lessons?.[lessonIndex]?.week}
                    helperText={errors?.lessons?.[lessonIndex]?.week?.message}
                    inputProps={{ step: 1, min: 1 }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label={`Lesson-${lessonIndex + 1} Description`}
                    multiline
                    rows={4}
                    {...register(`lessons.${lessonIndex}.lessonDescription`, { required: 'Description is required' })}
                    error={!!errors?.lessons?.[lessonIndex]?.lessonDescription}
                    helperText={errors?.lessons?.[lessonIndex]?.lessonDescription?.message}
                    sx={{ mb: 2 }}
                  />
                  <AddImageForLesson  control={control} lessonIndex={lessonIndex} 
                  setValue={setValue} imageErrors={imageErrors} setImageErrors={setImageErrors} newImageErrors={newImageErrors} />
                  <AddPdfForLesson control={control} lessonIndex={lessonIndex} 
                  setValue={setValue} pdfErrors={pdfErrors} setPdfErrors={setPdfErrors} newPdfErrors={newPdfErrors} />
                  <AddVideoForLesson control={control} lessonIndex={lessonIndex} 
                  setValue={setValue} videoErrors={videoErrors} setVideoErrors={setVideoErrors} newVideoErrors={newVideoErrors} />
                </Box>
              </Paper>
            ))}

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleAddLesson}
            >
              Add New Lesson
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}


export default AddLessonsPage;
