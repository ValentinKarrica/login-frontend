import { Button, TextField } from "@/elements";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginFormFields, UpdatePasswordFields } from "@/types";

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.wallPaper};
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding: 20px;
`;
const CustomForm = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.secondary800};
  padding: 30px;
  gap: 50px;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
  margin: 20px 20px 40px 20px;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.brown800};
  margin-top: 40px;
`;
const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
`;
const Err = styled.div`
  color: red;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .min(8, "Must be 8 characters or more!")
    .required("Required"),
  newPassword: Yup.string()
    .min(8, "Must be 8 characters or more!")
    .required("Required"),
  newPasswordConfirm: Yup.string()
    .min(8, "Must be 8 characters or more!")
    .oneOf(
      [Yup.ref("newPassword")],
      "New password and new password confirm mast match!"
    )
    .required("Required"),
});

interface Props {
  onSubmit: (form: UpdatePasswordFields) => void;
  loading?: boolean;
  alert?: JSX.Element | null;
}

export const UpdatePasswordForm = ({ onSubmit, loading, alert }: Props) => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema,
    onSubmit,
  });
  return (
    <MainContainer>
      <Title>Update Password</Title>
      <CustomForm onSubmit={formik.handleSubmit} autoComplete="none">
        <FieldWrap>
          <TextField
            required
            id="oldPassword"
            name="oldPassword"
            type="password"
            label="Old Password"
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
            error={!!(formik.touched.oldPassword && formik.errors.oldPassword)}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <Err>{formik.errors.oldPassword}</Err>
          ) : null}
          <TextField
            required
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            error={!!(formik.touched.newPassword && formik.errors.newPassword)}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <Err>{formik.errors.newPassword}</Err>
          ) : null}
          <TextField
            required
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            type="password"
            label="New Password Confirm"
            onChange={formik.handleChange}
            value={formik.values.newPasswordConfirm}
            error={
              !!(
                formik.touched.newPasswordConfirm &&
                formik.errors.newPasswordConfirm
              )
            }
          />
          {formik.touched.newPasswordConfirm &&
          formik.errors.newPasswordConfirm ? (
            <Err>{formik.errors.newPasswordConfirm}</Err>
          ) : null}
          {alert}
        </FieldWrap>
        <Button loading={loading} disabled={loading} type="submit" fullWidth>
          Submit
        </Button>
      </CustomForm>
    </MainContainer>
  );
};
