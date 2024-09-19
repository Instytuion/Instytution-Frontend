import { Box, Typography, Stack, Container } from "@mui/material";
import FlexCard from "../Card/FlexCard";
import { useEffect, useState } from "react";
import FetchRelatedCourse from "../../services/courses/FetchRelatedCourse";
import Spinner from "../Spinner/Spinner";

const RelatedCourses = ({courseName}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const FetchData = async ()=>{
      try{
        const response = await FetchRelatedCourse(courseName)
        console.log('Fetch related courses succes - ', response.data);
        setData(response.data)
        setLoading(false)
      }
      catch(error){
        setLoading(false)
        console.log('Error while fetching related courses - ', error);
      }
    }

    FetchData();
  }, [courseName]);

  if(loading){
    return <Spinner />
  };
  return (
    <Container sx={{my:2}}>
        <Typography variant="h5" component="h2" sx={{
            borderBottom:5 ,
            display:'inline-block',
            paddingBottom:1,
            mb:2,
            }}>
            Related Courses
        </Typography>
        <Box
            sx={{
              whiteSpace: "nowrap",
              p: 1,
              overflowX: "auto",
              position: "relative",
              scrollbarWidth: "none", 
            }}
        >
            {data.map((course, idx) => (
                <Box
                key={idx}
                sx={{ display: "inline-block", mr: 2 }}
                >
                    <FlexCard
                        name={course.name}
                        duration={course.duration}
                        price={course.price}
                        image={course.image}
                        link={`/courses/courseDetail/${course.name}`}
                    />
                </Box>
            ))}
        </Box>
    </Container>
  );
};

export default RelatedCourses;
