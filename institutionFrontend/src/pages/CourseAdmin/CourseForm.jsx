import {useForm} from "react-hook-form";
import CourseFormFields from "../../component/Forms/CourseFormFeilds";
import {Container, Button, Stack, CircularProgress} from "@mui/material";
import {useTheme} from "@emotion/react";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import FetchCourseDetails from "../../services/courseAdmin/FetchCourseDetails";
import CourseFormServices from "../../services/courseAdmin/CourseFormServices";
import useToast from "../../hooks/useToast";
import Tooltip from "@mui/material/Tooltip";
import BackButton from "../../component/Button/BackButton";

const CourseForm = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const showToast = useToast();
  const navigate = useNavigate();

  const {mode = "create", courseName, programName} = location.state || {};
  console.log(
    "mode:",
    mode,
    "courseName:",
    courseName,
    "programName:",
    programName
  );
  console.log(courseData);

  useEffect(()=>{
    if (mode==="create" && !programName){
      navigate('/*')
    }else if (mode ==="edit" && !courseName){
      navigate('/*')
    }
  },[mode,programName, courseName])

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: {errors},
    setValue,
  } = useForm();

  useEffect(() => {
    if (mode === "edit" && courseName) {
      const fetchCourseData = async () => {
        setLoading(true);
        try {
          const response = await FetchCourseDetails(courseName);
          setCourseData(response);
        } catch (error) {
          console.error("Error fetching course data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCourseData();
    }
  }, [mode, courseName]);

  
  useEffect(() => {
    if (mode === "edit" && courseData) {
      const subscription = watch((value) => {
        const isChanged = Object.keys(value).some(
          (key) => value[key] !== courseData[key]
        );
        setHasChanges(isChanged);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, courseData, mode]);

  const onSubmit = async (data) => {
    console.log("submitting data", data);
    const formData = new FormData();

    try {
      setLoading(true);
      if (mode === "create") {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });

        if (programName) {
          formData.append("program", programName);
        }

        await CourseFormServices.CreateCourse(formData);
        console.log("Course created successfully");
        showToast(`New course (${data.name}) created succussfully`, "success");
        navigate(`/course-admin/programs/${programName}`);
      } else if (mode === "edit") {
        Object.keys(data).forEach((key) => {
          if (data[key] !== courseData[key]) {
            formData.append(key, data[key]);
          }
        });

        const response = await CourseFormServices.UpdateCourse(
          formData,
          courseData.name
        );
        console.log("Course created successfully");
        showToast(`course (${data.name}) updated succussfully`, "success");
        navigate(`/course-admin/programs/${response.program}`);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.name) {
        setError("name", {
          type: "manual",
          message: error.response.data.name[0], // Access the first message
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

  return (
    <Container maxWidth={"md"}>
      <BackButton  sx={{mb:2}}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CourseFormFields
          control={control}
          errors={errors}
          mode={mode}
          courseData={courseData}
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
                  color: "white !important",
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

export default CourseForm;
