import React, {useEffect, useState} from "react";
import ProgramFormFields from "../../component/Forms/ProgramFormFeilds";
import {Container, Button, CircularProgress, Stack} from "@mui/material";
import {useForm} from "react-hook-form";
import {useTheme} from "@emotion/react";
import programFormServices from "../../services/courseAdmin/ProgramFormServices";
import {useLocation, useNavigate} from "react-router-dom";
import useToast from "../../hooks/useToast";
import Tooltip from "@mui/material/Tooltip";
import BookLoaderJson from "../../component/Spinner/BookLoaderJson";

const ProgramForm = () => {
  const [programData, setProgramData] = useState();
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const showToast = useToast();

  console.log("programData:", programData);

  const {mode = "create", programName} = location.state || {};

  console.log("mode:", mode, "programName:", programName);

  useEffect(() => {
    if (mode === "edit" && !programName) {
      navigate("/*");
    }
  }, [mode, navigate, programName]);

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: {errors},
    setValue,
  } = useForm();

  useEffect(() => {
    if (mode === "edit") {
      fetchprogram();
    }
  }, []);

  useEffect(() => {
    if (mode === "edit" && programData) {
      const subscription = watch((value) => {
        const isChanged = Object.keys(value).some(
          (key) => value[key] !== programData[key]
        );
        setHasChanges(isChanged);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, programData, mode]);

  const fetchprogram = async () => {
    try {
      setLoading(true);
      const response = await programFormServices.getProgram(programName);
      setProgramData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    try {
      setLoading(true);
      if (mode === "create") {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
        await programFormServices.createProgram(formData);
        console.log("Program created successfully");
        showToast(`New Program (${data.name}) created succussfully`, "success");
        navigate(`/course-admin/programs`);
      } else if (mode === "edit") {
        Object.keys(data).forEach((key) => {
          if (data[key] !== programData[key]) {
            formData.append(key, data[key]);
          }
        });

        await programFormServices.updateCourse(formData, programData.name);
        console.log("Course created successfully");
        showToast(`course (${data.name}) updated succussfully`, "success");
        navigate(`/course-admin/programs`);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.name) {
        setError("name", {
          type: "manual",
          message: error.response.data.name[0],
        });
        showToast(`Error: ${error.response.data.name[0]}`, "error");
      } else {
        showToast(
          `Error: ${error?.response?.data || "An unknown error occurred"}`,
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <BookLoaderJson />;
  }

  return (
    <Container maxWidth={"md"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProgramFormFields
          control={control}
          errors={errors}
          mode={mode}
          programData={programData}
          setValue={setValue}
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
            onClick={() => window.history.back()}
            disabled={loading}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ProgramForm;
