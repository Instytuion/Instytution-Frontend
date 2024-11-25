import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { useForm } from "react-hook-form";
import BatchFormFields from "../../component/Forms/BatchFormFeilds";
import { Container, Button, CircularProgress, Stack } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useQuery, useQueryClient } from "react-query";
import Spinner from "../../component/Spinner/Spinner";
import CourseAdminBatchServices from "../../services/courseAdmin/CourseAdminBatchServices";
import CustomeBreadCrumbs from "../../component/Breadcrumbs/Breadcrumbs";

const BatchForm = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const showToast = useToast();
  const queryClient = useQueryClient();

  const {
    mode = "create",
    courseName,
    batchId,
    programeName,
  } = location.state || {}
  
  ;

  console.log(
    "mode:",
    mode,
    "batchID:",
    batchId,
    "courseName:",
    courseName,
    programeName
  );

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
    return Promise.resolve(null);
  };

  const { data, error, isLoading } = useQuery(
    ["batchDetails", courseName, batchId],
    fetchBatchDetails,
    {
      enabled: mode === "edit" && !!batchId,
      staleTime: Infinity,
    }
  );

  const {
    control,
    handleSubmit,
    setError,
    getValues,
    watch,
    trigger,
    formState: { errors },
    setValue,
  } = useForm();

  // Form submission
  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      if (mode === "create") {
        formData["course_name"] = courseName;
        console.log("formData", formData);

        // Create Batch
        await CourseAdminBatchServices.crateBatch(courseName, formData);
        showToast("Batch created successfully!", "success");

        queryClient.invalidateQueries(["batches", courseName]);

        navigate(`/course-admin/batches/${courseName}`);
      } else if (mode === "edit") {
        const updatedData = {};
        const cleanValue = (value) => value?.toString().trim() || "";

        // Compare and only update changed fields
        Object.keys(data).forEach((key) => {
          const originalValue = cleanValue(data[key]);
          const currentValue = cleanValue(formData[key]);

          if (key === "instructor_id") {
            if (data[key] !== formData["instructor"]) {
              updatedData["instructor"] = formData["instructor"];
            }
          }

          if (originalValue !== currentValue) {
            updatedData[key] = formData[key];
          }
        });

        if (Object.keys(updatedData).length > 0) {
          // Update Batch
          await CourseAdminBatchServices.updateBatch(batchId, updatedData);
          showToast("Batch updated successfully!", "success");

          queryClient.invalidateQueries(["batches", courseName]);
          queryClient.invalidateQueries(["batchDetails", courseName, batchId]);

          navigate(`/course-admin/batches/${courseName}`);
        } else {
          showToast("No changes detected.", "info");
          return;
        }
      }
    } catch (err) {
      console.log("err-----------------------------", err);
      if (err?.response?.data?.name) {
        setError("name", {
          type: "manual",
          message: err.response.data.name[0],
        });
        showToast(`Error: ${err.response.data.name[0]}`, "error");
      } else if (err?.response?.data?.start_time) {
        setError("start_time", {
          type: "manual",
          message: err.response.data.start_time,
        });
        showToast(`Error: ${err.response.data.start_time}`, "error");
      } else {
        showToast("An unexpected error occurred", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching batches: {error.message}</div>;
  }
  const link = [
    { path: "/course-admin/programs", label: "Programs" },

    {
      path: `/course-admin/programs/${programeName}`,
      label: programeName,
    },
    {
      path:`/course-admin/batches/${courseName}`,
      label: "Batches",
    },
    {
      label:"Batch Creation"
    }
  ];

  return (
    <>
      <CustomeBreadCrumbs links={link} />
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
              sx={{ bgcolor: "red", color: "white" }}
              onClick={() => navigate(-1)} // Using navigate to go back
              disabled={loading}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default BatchForm;
