import React, {useEffect, useState} from "react";
import {Box, Typography, Container, Paper} from "@mui/material";
import UpComingBatchTable from "../Tables/UpComingBatchTable";
import FetchCourseBatches from "../../services/courses/FetchCourseBatches";
import Spinner from "../Spinner/Spinner";
import NoData from "../NoData/NoData";

function UpComingBatch({courseName}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await FetchCourseBatches(courseName);
        console.log("Fetch related course batches - ", response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error while fetching courses batches- ", error);
      }
    };

    FetchData();
  }, [courseName]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Box mt={2}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            borderBottom: 5,
            display: "inline-block",
            paddingBottom: 1,
            mb: 2,
          }}
        >
          Up Coming Batches
        </Typography>
        {data.length > 0 ? (
          <Paper elevation={3} sx={{borderRadius: 5}}>
            <UpComingBatchTable rows={data} />
          </Paper>
        ) : (
          <NoData text="No batches available now"/>
        )}
      </Box>
    </Container>
  );
}

export default UpComingBatch;
