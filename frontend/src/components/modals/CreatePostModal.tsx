import { LineField } from "components/form/Input";
import AppModal from "components/modals/AppModal";
import PostContext from "contexts/postContext";
import { Form, Formik } from "formik";
import { useSnackbar } from "hooks/general";
import { FC, useContext, useState } from "react";
import * as Yup from "yup";

const CreatePostModal: FC<{ visible: boolean; onClose: () => void }> = (
  props
) => {
  const { visible, onClose } = props;
  const { create } = useContext(PostContext);
  const [photo, setPhoto] = useState<File | null>(null);
  const snackbar = useSnackbar();

  const selectPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.length) {
      const file = event.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        snackbar.showError("File size > 2MB");
        return;
      }
      setPhoto(file);
    } else {
      setPhoto(null);
    }
  };

  return (
    <Formik
      initialValues={{
        caption: "",
      }}
      validateOnMount
      validateOnChange
      validationSchema={Yup.object().shape({
        caption: Yup.string().required().max(200),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (photo) {
          await create({
            caption: values.caption,
            photo: photo,
          });
          setSubmitting(false);
          resetForm();
          setPhoto(null);
        }
      }}
    >
      {({ submitForm, isValid }) => (
        <Form>
          <AppModal
            visible={visible}
            onClose={() => onClose()}
            title="Create"
            actionLabel="Create"
            actionDisabled={!isValid || !photo}
            onAction={submitForm}
            message="Create Success"
          >
            <input type="file" accept="image/*" onChange={selectPhoto} />
            {photo && <img src={URL.createObjectURL(photo)} alt="" />}
            <LineField name="caption" placeholder="Caption" />
          </AppModal>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePostModal;
