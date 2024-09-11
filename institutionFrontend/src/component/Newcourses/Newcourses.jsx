import { Box, Typography, Grid } from "@mui/material";
import CommonCard from "../Card/Card";

const NewCourse = () => {
  const data = [
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
    <Box sx={{paddingLeft:8,paddingRight:8}}>
      <Typography variant="h5" component="h2" sx={{borderBottom:5 ,display:'inline-block',paddingBottom:1,}}>
        New Course
      </Typography>
      <Grid container alignContent='center' spacing={2} sx={{mt:4}}>    
        {data.map((course, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3}>
            <CommonCard
              title={course.title}
              duration={course.duration}
              price={course.price}
              image={course.image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewCourse;
