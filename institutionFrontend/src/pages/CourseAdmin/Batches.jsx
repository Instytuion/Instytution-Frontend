import React, {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import Spinner from "../../component/Spinner/Spinner";
import CustomDataTable from "../../component/Tables/DataTable";
import CourseAdminBatchServices from "../../services/courseAdmin/CourseAdminBatchServices";
import BackButton from "../../component/Button/BackButton";
import { Box } from "@mui/material";
import BookLoaderJson from "../../component/Spinner/BookLoaderJson";

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const {courseName} = useParams();

  console.log(batches);

  const {data, error, isLoading} = useQuery(
    ["batches", courseName], 
    () => CourseAdminBatchServices.getBatches(courseName),
    {
      enabled: !!courseName,
      onSuccess: (fetchedData) => {
        setBatches(fetchedData);
      },
      staleTime:Infinity,
    }
  );

  if (isLoading) {
    return <BookLoaderJson/>;
  }

  if (error) {
    return <div>Error fetching batches: {error.data}</div>;
  }

  return (
    <>
      <Box>
        <BackButton />
      </Box>
      <CustomDataTable
        row={data?.map((value, idx) => ({
          ...value,
          rowNumber: idx + 1,
        }))}
        title="Batches"
        buttonText={"Batches"}
        courseName={courseName}
      />
    </>
  );
};

export default Batches;
