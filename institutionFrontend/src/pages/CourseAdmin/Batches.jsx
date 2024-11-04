import React, {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import CustomDataTable from "../../component/Tables/DataTable";
import CourseAdminBatchServices from "../../services/courseAdmin/CourseAdminBatchServices";
import BookLoaderJson from "../../component/Spinner/BookLoaderJson";
import CustomeBreadCrumbs from "../../component/Breadcrumbs/Breadcrumbs";
import {BatchColumnsHeading} from "../../component/Tables/BatchColumnsHeading";

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const {courseName} = useParams();
  const location = useLocation();
  const {programeName} = location.state || {};
  const navigate = useNavigate()

  const {data, error, isLoading} = useQuery(
    ["batches", courseName],
    () => CourseAdminBatchServices.getBatches(courseName),
    {
      enabled: !!courseName,
      onSuccess: (fetchedData) => {
        setBatches(fetchedData);
      },
      staleTime: Infinity,
    }
  );

  if (isLoading) {
    return <BookLoaderJson />;
  }

  if (error) {
    return <div>Error fetching batches: {error.data}</div>;
  }
  const programPath = data[0].programs_name
    ? data[0].programs_name
    : programeName;

  const link = [
    {path: "/course-admin/programs", label: "Programs"},

    {
      path: `/course-admin/programs/${programPath}`,
      label: `${programPath}`,
    },
    {
      label: "Batches",
    },
  ];

  const handleNavigate = () => {
    navigate("/course-admin/batch-form", {
      state: {
        courseName: courseName,
        programeName: programeName,
      },
    });
  };

  return (
    <>
      <CustomeBreadCrumbs links={link} />
      <CustomDataTable
        row={data?.map((value, idx) => ({
          ...value,
          rowNumber: idx + 1,
        }))}
        title="Batches"
        programeName={programPath}
        buttonText={"Batches"}
        courseName={courseName}
        DynamicHeading={BatchColumnsHeading}
        handleNavigate={handleNavigate}
      />
    </>
  );
};

export default Batches;
