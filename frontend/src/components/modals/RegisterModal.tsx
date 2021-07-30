import { LineField, PasswordField } from "components/form/Input";
import AppModal from "components/modals/AppModal";
import UserContext from "contexts/userContext";
import { Form, Formik } from "formik";
import { FC, useContext } from "react";
import * as Yup from "yup";

const RegisterModal: FC<{ visible: boolean; onClose: () => void }> = (
  props
) => {
  const { visible, onClose } = props;
  const { register } = useContext(UserContext);

  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
      }}
      validateOnMount
      validateOnChange
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        password: Yup.string().min(6).required(),
        passwordRepeat: Yup.string()
          .min(6)
          .required()
          .oneOf([Yup.ref("password"), null], "Password not match"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await register(values.name, values.password);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ submitForm, isValid }) => (
        <Form>
          <AppModal
            visible={visible}
            onClose={() => onClose()}
            title="Register"
            actionLabel="Register"
            actionDisabled={!isValid}
            onAction={submitForm}
            message="Register Success"
          >
            <LineField name="name" placeholder="Name" />
            <PasswordField name="password" placeholder="Password" />
            <PasswordField
              name="passwordRepeat"
              placeholder="Repeat password"
            />
          </AppModal>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterModal;
