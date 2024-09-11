import { Box, duration, Grid, Typography } from "@mui/material";
import CommonCard from "../Card/Card";

const Programs = () => {
  const programsData = [
    {
      title: "Programming Languages",
      image: "link-to-image.jpg",
    },
    {
      title: "Web Development",
      image: "link-to-image.jpg",
    },
    {
      title: "Mobile App Development",
      image: "link-to-image.jpg",
    },
    {
      title: "Data Science",
      image: "link-to-image.jpg",
    },
    {
      title: "Cybersecurity",
      image: "link-to-image.jpg",
    },
    {
      title: "Cloud Computing",
      image: "link-to-image.jpg",
    },
    {
      title: "AI",
      image: "link-to-image.jpg",
    },
    {
      title: "Game Development",
      image: "link-to-image.jpg",
    },
  ];

  return (
    <Box sx={{paddingLeft:8,paddingRight:8 , mb:10}}>
      <Typography variant="h5" component="h2" sx={{borderBottom:5 ,display:'inline-block',padding:2,}}>
        Our Programs
      </Typography>
      <Grid container alignContent='center' spacing={2} sx={{mt:4}}>
        {programsData.map((program, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3} >
            <CommonCard
              title={program.title}
              image={program.image}
              link={`/programs/${program.title}`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Programs;
