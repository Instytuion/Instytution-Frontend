import {Controller} from "react-hook-form";
import { StyledTextField } from "../CustomeElements/CustomFormInputs";


export const CustomFormField = ({
  name,
  control,
  label,
  type = "text",
  multiline = false,
  rows = 1,
  error,
  helperText,
}) => (
  <Controller
    name={name}
    control={control}
    rules={{required: `${label} is required`}}
    render={({field}) => (
      <StyledTextField
        label={label}
        {...field}
        fullWidth
        variant="outlined"
        type={type}
        multiline={multiline}
        rows={rows}
        error={!!error}
        helperText={error ? helperText : ""}
      />
    )}
  />
);





