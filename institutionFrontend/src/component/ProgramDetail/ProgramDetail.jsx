import {Box, Button, duration, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import CommonCard from "../Card/Card";
import {useNavigate, useParams} from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import {useTheme} from "@emotion/react";

function ProgramDetail({fetchCourses, linkPrefix, buttonText}) {
  console.log("fetch fn adn link is :", linkPrefix);
  const theme = useTheme();

  const {programName} = useParams();
  const decodedProgramName = programName ? decodeURIComponent(programName) : "";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetchCourses(programName);
        console.log("Fetch courses a program succes - ", response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error while fetching program courses courses - ", error);
      }
    };

    FetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box sx={{paddingLeft: 8, paddingRight: 8, mb: 10}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            borderBottom: 5,
            display: "inline-block",
            padding: 2,
            color: theme.palette.text.primary,
          }}
        >
          {`${decodedProgramName || "Loading..."}`}
        </Typography>
        {buttonText ? (
          <Button
            onClick={() =>
              navigate("/course-admin/course-form", {
                state: {programName: programName},
              })
            }
            sx={{
              bgcolor: "teal",
              color: "white",
            }}
          >
            {buttonText}
          </Button>
        ) : null}
      </Box>

      <Grid container alignContent="center" spacing={2} sx={{mt: 4}}>
        {data.map((course, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4}>
            <CommonCard
              name={course.name}
              image={course.image}
              link={`/${linkPrefix}/courseDetail/${course.name}`}
              duration={course.duration}
              price={course.price}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProgramDetail;
