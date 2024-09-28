import {Controller} from "react-hook-form";
import {StyledTextField, StyledSelect} from "../CustomeElements/CustomFormInputs";


export const CustomFormField = ({
  name,
  control,
  label,
  type = "text",
  multiline = false,
  rows = 1,
  error,
  helperText,
  options = [], // For select options
  isSelect = false, // Flag to determine whether to render a Select or TextField
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={""}
    rules={{required: `${label} is required`}}
    render={({field}) =>
      isSelect ? (
        <StyledSelect
          {...field}
          label={label}
          options={options}
          error={!!error}
          helperText={error ? helperText : ""}
        />
      ) : (
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
      )
    }
  />
);
