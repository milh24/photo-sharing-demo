import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Stack from "@material-ui/core/Stack";
import { makeStyles } from "@material-ui/core/styles";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { LineField, PasswordField } from "components/form/Input";
import RegisterModal from "components/modals/RegisterModal";
import { StorageKey } from "constants/storageKey";
import UserContext from "contexts/userContext";
import { Form, Formik } from "formik";
import { FC, useContext } from "react";
import { useModal } from "react-modal-hook";
import * as Yup from "yup";

const LoginScreen: FC = () => {
  const [showRegister, hideRegister] = useModal(({ in: open }) => (
    <RegisterModal visible={open} onClose={hideRegister} />
  ));
  const { login } = useContext(UserContext);
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: localStorage.getItem(StorageKey.USER_NAME) ?? "",
        password: "",
      }}
      validateOnMount
      validateOnChange
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        password: Yup.string().min(6).required(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await login(values.name, values.password);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ submitForm, isValid, isSubmitting }) => (
        <Container className={classes.root}>
          <Form>
            <Stack justifyContent="center" alignItems="center" spacing={3}>
              <Typography variant="h1">InstaPic</Typography>
              <LineField name="name" placeholder="Name" />
              <PasswordField name="password" placeholder="Password" />
              <LoadingButton
                type="submit"
                fullWidth
                disabled={!isValid}
                onClick={submitForm}
                variant="contained"
                color="primary"
                size="large"
                loading={isSubmitting}
              >
                {"Login"}
              </LoadingButton>
              <Link onClick={showRegister}>Register</Link>
            </Stack>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));
