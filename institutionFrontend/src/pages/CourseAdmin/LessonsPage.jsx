import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, Box, Typography, Container, Paper, IconButton } from '@mui/material';
import PostCourseLessons from "../../services/courseAdmin/PostCourseLessons";
import { useParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import AddImageForLesson from "../../component/AddImageForLesson/AddImageForLesson";
import ClearIcon from '@mui/icons-material/Clear';
import AddPdfForLesson from "../../component/AddPdfForLesson/AddPdfForLesson";
import AddVideoForLesson from "../../component/AddVideoForLesson/AddVideoForLesson";


function LessonsPage() {
  const { courseName } = useParams();
  const showToast = useToast();
  
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
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
    try{
      const response = await PostCourseLessons(courseName, data);
      console.log('Response:', response.data);
      reset();
    }
    catch (error){
      console.log("Some error while posting add lessons data- ", error);
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
                    label={`Lesson-${lessonIndex + 1} Name`}
                    {...register(`lessons.${lessonIndex}.lessonName`, { required: 'Lesson Name is required' })}
                    error={!!errors?.lessons?.[lessonIndex]?.lessonName}
                    helperText={errors?.lessons?.[lessonIndex]?.lessonName?.message}
                    sx={{ mb: 2 }}
                  />
                  <input
                    type="hidden"
                    value={lessonIndex + 1}
                    {...register(`lessons.${lessonIndex}.week`)} // Hidden field for week number
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
                  <AddImageForLesson  control={control} lessonIndex={lessonIndex} register={register} errors={errors} />
                  <AddPdfForLesson control={control} lessonIndex={lessonIndex} register={register} errors={errors} />
                  <AddVideoForLesson control={control} lessonIndex={lessonIndex} register={register} errors={errors} />
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


export default LessonsPage;
