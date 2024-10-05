import React, {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import Spinner from "../../component/Spinner/Spinner";
import CustomDataTable from "../../component/Tables/DataTable";
import CourseAdminBatchServices from "../../services/courseAdmin/CourseAdminBatchServices";
import {BatchColumnsHeading} from "../../component/Tables/BatchColumnsHeading";

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
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching batches: {error.data}</div>;
  }

  return (
    <>
      <CustomDataTable
        row={data.map((value,idx) => ({
          ...value,
          rowNumber:  idx + 1,
        }))}
        title="Batches"
        buttonText={"Batches"}
        courseName={courseName}
      />
    </>
  );
};

export default Batches;
