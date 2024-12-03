import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams,useLocation } from 'react-router-dom'
import FetchCourseLessons from '../../services/courseAdmin/FetchCourseLessons'
import LessonSection from '../../component/LessonSection/LessonSection';
import DeleteLesson from '../../services/courseAdmin/DeleteLesson';
import useToast from '../../hooks/useToast';
import BookLoaderJson from '../../component/Spinner/BookLoaderJson';
import CustomeBreadCrumbs from '../../component/Breadcrumbs/Breadcrumbs';

function LessonsPage() {
    const {courseName} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [lessonData, setLessonData] = useState([]);
    const showToast = useToast();
    const { programeName } = location.state  || {}

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                setIsLoading(true)
                const response = await FetchCourseLessons(courseName)
                setIsLoading(false)
                setLessonData(response.data)
                console.log('fetch course lessons success. data is ', response);
                
            }
            catch (error){
                setIsLoading(false)
                console.log("some error file fetching course lessons.", error);
                
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchData();
    }, [courseName])

    const handleRemoveLesson = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this lesson?");
        
        if (confirmDelete) {
            const deleteData = async (id) => {
                try {
                    setIsLoading(true);
                    const response = await DeleteLesson(id);
                    console.log("delete lesson success - ", response);
                    setLessonData((prevLessons) => 
                        prevLessons.filter((lesson) => lesson.id !== id)
                    );  
                    showToast("Lesson deleted successfully", "success", 3000)        
                } catch (error) {
                    showToast("Error occured", "error", 3000)
                    console.log("some error while deleting a lesson - ", error);
                } finally {
                    setIsLoading(false);
                }
            };
            
            deleteData(id);
        } else {
            console.log("Deletion cancelled.");
        }
    };

    if(isLoading){
        return <BookLoaderJson />
      };

      const link = [
        { path: "/course-admin/programs", label: "Programs" },
    
        {
          path: `/course-admin/programs/${programeName}`,
          label: programeName,
        },
        
        {
          label:"Lessons"
        }
      ];
    return (
        <Box sx={{position:'relative'}}>
            <CustomeBreadCrumbs links={link}/>
        <Typography variant="h4" gutterBottom>
            Lessons Page
        </Typography>
        <Button
            variant='outlined'
            component={Link}
            to={`/course-admin/addLessons/${courseName}`}
            sx={{ mb: 3 }}
        >
            Add Lessons
        </Button>

        {lessonData.map((lessonItem, lessonIndex) => (
            <LessonSection
                key={lessonIndex}
                lessonItem={lessonItem}
                handleRemoveLesson={handleRemoveLesson}
            />
        ))}
        </Box>
    )
}

export default LessonsPage
