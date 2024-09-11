import { Box, duration, Grid, Typography } from "@mui/material";
import React from 'react'
import CommonCard from "../Card/Card";
import { useParams } from "react-router-dom";

function ProgramDetail() {
    const {programName} = useParams();
    const decodedProgramName = programName ? decodeURIComponent(programName) : '';
    const courseData = [
        {
            title: "Machine Learning",
            duration: "3 weeks",
            price: "Rs 80,000",
            image: "link-to-machine-learning-image.jpg",
          },
          {
            title: "Computer Science",
            duration: "3 weeks",
            price: "Rs 50,000",
            image: "link-to-computer-science-image.jpg",
          },
          {
            title: "Data Science",
            duration: "3 weeks",
            price: "Rs 70,000",
            image: "link-to-data-science-image.jpg",
          },
          {
            title: "GitHub Actions",
            duration: "3 weeks",
            price: "Rs 50,000",
            image: "link-to-github-actions-image.jpg",
          },
          {
            title: "Machine Learning",
            duration: "3 weeks",
            price: "Rs 80,000",
            image: "link-to-machine-learning-image.jpg",
          },
          {
            title: "Computer Science",
            duration: "3 weeks",
            price: "Rs 50,000",
            image: "link-to-computer-science-image.jpg",
          },
          {
            title: "Data Science",
            duration: "3 weeks",
            price: "Rs 70,000",
            image: "link-to-data-science-image.jpg",
          },
          {
            title: "GitHub Actions",
            duration: "3 weeks",
            price: "Rs 50,000",
            image: "link-to-github-actions-image.jpg",
          },
      ];
    
      return (
        <Box sx={{paddingLeft:8,paddingRight:8 , mb:10}}>
          <Typography variant="h5" component="h2" sx={{borderBottom:5 ,display:'inline-block',padding:2,}}>
            {`${decodedProgramName || 'Loading...'}`}
          </Typography>
          <Grid container alignContent='center' spacing={2} sx={{mt:4}}>
            {courseData.map((course, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={3} >
                <CommonCard
                  title={course.title}
                  image={course.image}
                  link={`/courseDetail/${course.title}`}
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
