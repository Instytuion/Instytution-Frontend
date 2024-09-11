import { Box, duration, Grid, Typography } from "@mui/material";
import CommonCard from "../Card/Card";

const Popularcourse = () => {
  const popularCourses = [
    {
      title: "Web Development",
      duration: "4 weeks",
      price: "Rs 60,000",
      image: "link-to-web-development-image.jpg",
    },
    {
      title: "Artificial Intelligence",
      duration: "5 weeks",
      price: "Rs 90,000",
      image: "link-to-ai-course-image.jpg",
    },
    {
      title: "Cloud Computing",
      duration: "3 weeks",
      price: "Rs 75,000",
      image: "link-to-cloud-computing-image.jpg",
    },
    {
      title: "Blockchain Technology",
      duration: "6 weeks",
      price: "Rs 100,000",
      image: "link-to-blockchain-course-image.jpg",
    },
  ];

  return (
    <Box sx={{paddingLeft:8,paddingRight:8 , mb:10}}>
      <Typography variant="h5" component="h2" sx={{borderBottom:5 ,display:'inline-block',padding:2,}}>
        Popular Courses
      </Typography>
      <Grid container alignContent='center' spacing={2} sx={{mt:4}}>
        {popularCourses.map((course, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3} >
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

export default Popularcourse;
