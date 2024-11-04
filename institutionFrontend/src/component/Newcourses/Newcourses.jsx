import { Box, Typography, Grid } from "@mui/material";
import CommonCard from "../Card/Card";
import FetchLatestCourses from "../../services/courses/FetchLatestCourses";
import Spinner from "../Spinner/Spinner";
import { useEffect, useState } from "react";

const NewCourse = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const FetchData = async ()=>{
      try{
        const response = await FetchLatestCourses()
        console.log('Fetch new courses succes - ', response.data);
        setData(response.data)
        setLoading(false)
      }
      catch(error){
        setLoading(false)
        console.log('Error while fetching new courses - ', error);
      }
    }

    FetchData();
  }, []);
  
  if(loading){
    return <Spinner />
  };
  return (
    <Box sx={{paddingLeft:8,paddingRight:8}}>
      <Typography variant="h5" component="h2" sx={{borderBottom:5 ,display:'inline-block',paddingBottom:1,}}>
        New Course
      </Typography>
      <Grid container alignContent='center' spacing={2} sx={{mt:4}}>    
        {data.map((course, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3}>
            <CommonCard
              name={course.name}
              duration={course.duration}
              price={course.price}
              image={course.image}
              link={`/courses/courseDetail/${course.name}`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewCourse;
