import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {CustomFormField} from "./CustomForm";
import {listInstructors} from "../../services/courseAdmin/Instructors";

const BatchFormFields = ({
  control,
  errors,
  mode,
  batchData,
  setValue,
  getValues,
  trigger,
  watch,
  setHasChanges
}) => {
  const [instructors, setInstructors] = useState([]);
  console.log('batchdata:', batchData)
  console.log('instructores:', instructors)

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const fetchInstructors = async () => {
    try {
      const response = await listInstructors();
      setInstructors(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  useEffect(() => {
    if (mode === "edit" && batchData) {
      Object.keys(batchData).forEach((key) => {
        setValue(key, batchData[key]);
      });

      
      const tutor = instructors.find(
        (instructor) => instructor.instructor_name === batchData.instructor_name
      );

      console.log("instructor", tutor);

      if (tutor) {
        setValue("instructor", tutor.id);
      }
    }
  }, [mode, batchData, setValue, instructors]);

  useEffect(() => {
    if (mode === "edit" && batchData) {
      const subscription = watch((currentValues) => {
        const cleanValue = (value) => value?.toString().trim() || "";

        const isChanged = Object.keys(batchData).some((key) => {
          const originalValue = cleanValue(batchData[key]);
          const currentValue = cleanValue(currentValues[key]);

          return originalValue !== currentValue;
        });

        const instructorChanged =
          currentValues.instructor !==
          instructors.find(
            (instructor) =>
              instructor.instructor_name === batchData.instructor_name
          )?.id;

        setHasChanges(isChanged || instructorChanged);
      });

      return () => subscription.unsubscribe();
    }
  }, [watch, batchData, mode, instructors]);


  // Validate the end date against start date
  const validateEndDate = (value) => {
    if (value.trim() === "") {
      return "This field is required";
    }
    const startDate = new Date(getValues("start_date"));
    const endDate = new Date(value);
    if (endDate < startDate) {
      return "End date cannot be before start date.";
    }
    return true;
  };

  // Validate the start date to ensure it's not before today
  const validateStartDate = (value) => {
    if (value.trim() === "") {
      return "This field is required";
    }
    console.log("entered sstart date");
    const selectedDate = new Date(value);
    const todayDate = new Date(today);
    if (selectedDate < todayDate) {
      return "Start date cannot be in the past.";
    }
    return true;
  };

  // Validate the end time against start time
  const validateEndTime = (value) => {
    if (value.trim() === "") {
      return "This field is required";
    }
    const startTime = getValues("start_time");
    const endTime = value;

    if (endTime < startTime) {
      return "End time cannot be before start time.";
    }
    return true;
  };

  const validateStartTime = (value) =>{
    if (value.trim() === "") {
      return "This field is required";
    }
  }
  

  return (
    <Grid container spacing={3}>
      {/* Name Field */}
      <Grid item xs={12}>
        <CustomFormField
          name="name"
          control={control}
          label="Batch Name"
          error={errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
      </Grid>

      {/* Instructor Name Field */}
      <Grid item xs={12}>
        <CustomFormField
          name="instructor"
          control={control}
          label="Instructor Name"
          isSelect={true}
          options={instructors.map((instructor) => ({
            value: instructor.id,
            label: instructor.instructor_name,
          }))}
          error={errors.instructor}
          helperText={errors.instructor ? errors.instructor.message : ""}
        />
      </Grid>

      {/* Start Date Field */}
      <Grid item xs={12} md={6}>
        <CustomFormField
          name="start_date"
          control={control}
          label="Start Date"
          defaultValue=" "
          type="date"
          min={today} // Prevent selecting past dates
          error={errors.start_date}
          helperText={errors.start_date ? errors.start_date.message : ""}
          rules={{
            validate: validateStartDate, // Custom validation for start date
          }}
        />
      </Grid>

      {/* End Date Field */}
      <Grid item xs={12} md={6}>
        <CustomFormField
          name="end_date"
          control={control}
          label="End Date"
          defaultValue=" "
          type="date"
          min={today} // Min date should be start date or today
          error={errors.end_date}
          helperText={errors.end_date ? errors.end_date.message : ""}
          rules={{
            validate: validateEndDate, // Custom validation for end date
          }}
        />
      </Grid>

      {/* Start Time Field */}
      <Grid item xs={12} md={6}>
        <CustomFormField
          name="start_time"
          control={control}
          label="Start Time"
          type="time"
          defaultValue=" "
          error={errors.start_time}
          helperText={errors.start_time ? errors.start_time.message : ""}
          rules={{
            validate: validateStartTime,
          }}
        />
      </Grid>

      {/* End Time Field */}
      <Grid item xs={12} md={6}>
        <CustomFormField
          name="end_time"
          control={control}
          label="End Time"
          type="time"
          defaultValue=" "
          error={errors.end_time}
          helperText={errors.end_time ? errors.end_time.message : ""}
          rules={{
            validate: validateEndTime,
          }}
        />
      </Grid>

      {/* Strength Field */}
      <Grid item xs={12}>
        <CustomFormField
          name="strength"
          control={control}
          label="Batch Strength"
          type="number"
          error={errors.strength}
          helperText={errors.strength ? errors.strength.message : ""}
        />
      </Grid>
    </Grid>
  );
};

export default BatchFormFields;
