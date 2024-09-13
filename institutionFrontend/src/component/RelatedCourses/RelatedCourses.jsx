import { Box, Typography, Stack, Container } from "@mui/material";
import FlexCard from "../Card/FlexCard";

const RelatedCourses = () => {
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
    {
      title: "GitHub Actions",
      duration: "3 weeks",
      price: "Rs 50,000",
      image: "link-to-github-actions-image.jpg",
    },
    {
      title: "GitHub Actions",
      duration: "3 weeks",
      price: "Rs 50,000",
      image: "link-to-github-actions-image.jpg",
    },
  ];
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
                        title={course.title}
                        duration={course.duration}
                        price={course.price}
                        image={course.image}
                        link={`/courses/courseDetail/${course.title}`}
                    />
                </Box>
            ))}
        </Box>
    </Container>
  );
};

export default RelatedCourses;
