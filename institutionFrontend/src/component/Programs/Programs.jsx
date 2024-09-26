import { Box, Button, Grid, Typography } from "@mui/material";
import CommonCard from "../Card/Card";
import { useEffect, useState } from "react";

import Spinner from "../Spinner/Spinner";
import { useTheme } from "@emotion/react";

const Programs = ({ fetchProgrammes, linkPrefix, buttonText }) => {
  console.log(
    "function for program is :",
    fetchProgrammes,
    "and link nis :",
    linkPrefix
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetchProgrammes();
        console.log("Fetch programs succes - ", response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error while fetching programs - ", error);
      }
    };

    FetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box sx={{ paddingLeft: 8, paddingRight: 8, mb: 10 }}>
      <Box sx={{
        display:'flex',
        justifyContent:'space-between'
      }}>
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
          Our Programs
        </Typography>
        {buttonText ? <Button
          sx={{
            bgcolor:'teal',
            color:'white'
          }}
        >
          {buttonText}
        </Button> : null}
      </Box>
      <Grid container alignContent="center" spacing={2} sx={{ mt: 4 }}>
        {data.map((program, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3}>
            <CommonCard
              name={program.name}
              image={program.image}
              link={`/${linkPrefix}/programs/${program.name}`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Programs;
