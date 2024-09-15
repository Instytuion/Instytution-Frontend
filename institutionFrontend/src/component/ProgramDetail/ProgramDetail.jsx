import { Box, duration, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import CommonCard from "../Card/Card";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import FetchProgramCourses from "../../services/courses/FetchProgramCourses";

function ProgramDetail() {
    const {programName} = useParams();
    const decodedProgramName = programName ? decodeURIComponent(programName) : '';
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const FetchData = async ()=>{
      try{
        const response = await FetchProgramCourses(programName)
        console.log('Fetch courses a program succes - ', response.data);
        setData(response.data)
        setLoading(false)
      }
      catch(error){
        setLoading(false)
        console.log('Error while fetching program courses courses - ', error);
      }
    }

    FetchData();
  }, []);
  
  if(loading){
    return <Spinner />
  };
    
      return (
        <Box sx={{paddingLeft:8,paddingRight:8 , mb:10}}>
          <Typography variant="h5" component="h2" sx={{borderBottom:5 ,display:'inline-block',padding:2,}}>
            {`${decodedProgramName || 'Loading...'}`}
          </Typography>
          <Grid container alignContent='center' spacing={2} sx={{mt:4}}>
            {data.map((course, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={3} >
                <CommonCard
                  name={course.name}
                  image={course.image}
                  link={`/courses/courseDetail/${course.name}`}
                  duration={course.duration}
                  price={course.price}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
}

export default ProgramDetail
