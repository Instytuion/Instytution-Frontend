import {useTheme} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useToast from "../../hooks/useToast";
import {useForm} from "react-hook-form";
import BatchFormFields from "../../component/Forms/BatchFormFeilds";
import {Container, Button, CircularProgress, Stack} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {useQuery} from "react-query";
import Spinner from "../../component/Spinner/Spinner";
import CourseAdminBatchServices from "../../services/courseAdmin/CourseAdminBatchServices";

const BatchForm = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const showToast = useToast();

  const {mode = "create", courseName, batchId} = location.state || {};

  console.log("mode:", mode, "batchID:", batchId, "courseName:", courseName);


  useEffect(() => {
    if (mode === "edit" && !batchId && !courseName) {
      navigate("/*");
    } else if (mode === "create" && !courseName) {
      navigate("/*");
    }
  }, [mode, batchId, courseName, navigate]);

  const fetchBatchDetails = () => {
    if (mode === "edit" && batchId) {
      return CourseAdminBatchServices.getBatchDetails(batchId);
    }
    return Promise.resolve(null); // Return null or some default value in create mode
  };

  // useQuery to fetch batch details (always called, but conditionally enabled)
  const {data, error, isLoading} = useQuery(
    ["batchDetails", courseName, batchId],
    fetchBatchDetails,
    {
      enabled: mode === "edit" && !!batchId, // Enabled only when editing and batchId is present
    }
  );

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    watch,
    trigger,
    formState: {errors},
    setValue,
  } = useForm();


  // Form submission handler
  const onSubmit = (formData) => {
    setLoading(true);
    if (mode === "create") {
      formData["course_name"] = courseName;

      console.log("formData", formData);
      CourseAdminBatchServices.crateBatch(courseName, formData)
        .then(() => {
          showToast("Batch created successfully!", "success");
          navigate(`/course-admin/batches/${courseName}`);
        })
        .catch((err) => {
          showToast("Error creating batch", "error");
        })
        .finally(() => setLoading(false));
    } else if (mode === "edit") {
      const updatedData = {};

      const cleanValue = (value) => value?.toString().trim() || "";

      Object.keys(data).forEach((key) => {
        const originalValue = cleanValue(data[key]);
        const currentValue = cleanValue(formData[key]);

        if (originalValue !== currentValue) {
          updatedData[key] = formData[key];
        }
      });

      if (Object.keys(updatedData).length > 0) {
        CourseAdminBatchServices.updateBatch(batchId, updatedData)
          .then(() => {
            showToast("Batch updated successfully!", "success");
            navigate(`/course-admin/batches/${courseName}`);
          })
          .catch((err) => {
            showToast("Error updating batch", "error");
          })
          .finally(() => setLoading(false));
      } else {
        showToast("No changes detected.", "info");
        setLoading(false);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching batches: {error.message}</div>;
  }

  return (
    <Container maxWidth={"md"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BatchFormFields
          control={control}
          errors={errors}
          mode={mode}
          batchData={data}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
          trigger={trigger}
          setHasChanges={setHasChanges}
        />
        <Stack justifyContent="flex-end" gap={1} direction={"row"} mt={2}>
          <Tooltip
            title={mode === "edit" && !hasChanges ? "No changes made" : ""}
            arrow
          >
            <span>
              <Button
                type="submit"
                sx={{
                  color: "white",
                  bgcolor:
                    mode === "edit" && !hasChanges
                      ? "grey.200"
                      : theme.palette.customColors,
                }}
                disabled={mode === "edit" && !hasChanges}
              >
                {loading ? (
                  <CircularProgress size={20} color="white" />
                ) : mode == "create" ? (
                  "create"
                ) : (
                  "update"
                )}
              </Button>
            </span>
          </Tooltip>
          <Button
            sx={{bgcolor: "red", color: "white"}}
            onClick={() => navigate(-1)} // Using navigate to go back
            disabled={loading}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default BatchForm;
