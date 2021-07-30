import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Field } from "formik";
import {
  fieldToTextField,
  TextFieldProps
} from "formik-material-ui";
import { useState } from "react";

export const LineField = (props: { name: string; placeholder?: string }) => {
  const { name, placeholder } = props;

  return <Field component={LineInput} name={name} placeholder={placeholder} />;
};

const LineInput = (props: TextFieldProps) => {
  return <TextField {...fieldToTextField(props)} type="text" fullWidth />;
};

const PasswordInput = (props: TextFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...fieldToTextField(props)}
      type={visible ? "text" : "password"}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setVisible(!visible)}>
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const PasswordField = (props: { name: string; placeholder: string }) => {
  const { name, placeholder } = props;

  return (
    <Field
      component={PasswordInput}
      name={name}
      type="password"
      placeholder={placeholder}
    />
  );
};
