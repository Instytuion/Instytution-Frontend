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
  rules,
  min,
  defaultValue,
  
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue ? defaultValue : ""}
    min={min}
    rules={{validate: rules, required: `${label} is required  `}}
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
          inputProps={{
            min: type === "date" ? min : undefined,
          }}
        />
      )
    }
  />
);
