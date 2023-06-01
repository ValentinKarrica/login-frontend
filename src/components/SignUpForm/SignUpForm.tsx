import { Button, Loader, TextField } from "@/elements";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SignUpFormFields } from "@/types";

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
const Alert = styled.div`
  padding: 1rem;
  background: rgb(253, 237, 237);
  color: rgb(95, 33, 32);
  border-radius: 4px;
`;

const ShowErr = ({ val, err }: { val?: boolean; err?: string }) => {
  return <>{val && err ? <Err>{err}</Err> : null}</>;
};

const reg: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const validationSchema = Yup.object({
  email: Yup.string()
    .matches(reg, "Invalid email address")
    .required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .max(20, "Password must have less or equal then 20 characters")
    .required("Required"),
  name: Yup.string()
    .min(2, "Name must have more or equal then 2 characters")
    .max(15, "Name must have less or equal then 15 characters")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Name must have more or equal then 2 characters")
    .max(20, "Name must have less or equal then 20 characters")
    .required("Required"),
  passwordConfirm: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

interface Props {
  onSubmit: (form: SignUpFormFields) => void;
  loading: boolean;
  alert?: JSX.Element | null;
}

export const SignUpForm = ({ onSubmit, loading, alert }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <MainContainer>
      <Title>Sign Up</Title>
      <CustomForm onSubmit={formik.handleSubmit} autoComplete="none">
        <FieldWrap>
          <TextField
            required
            label="First Name"
            id="name"
            name="name"
            type="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={!!(formik.touched.name && formik.errors.name)}
          />
          <ShowErr val={formik.touched.name} err={formik.errors.name} />
          <TextField
            id="lastName"
            name="lastName"
            type="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={!!(formik.touched.lastName && formik.errors.lastName)}
            required
            label="Last Name"
          />
          <ShowErr val={formik.touched.lastName} err={formik.errors.lastName} />

          <TextField
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={!!(formik.touched.email && formik.errors.email)}
            required
            label="Email"
          />
          <ShowErr val={formik.touched.email} err={formik.errors.email} />

          <TextField
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={!!(formik.touched.password && formik.errors.password)}
            required
            label="Password"
          />
          <ShowErr val={formik.touched.password} err={formik.errors.password} />

          <TextField
            required
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            label="Password Confirmation"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
            error={
              !!(
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              )
            }
          />
          {alert}
          <ShowErr
            val={formik.touched.passwordConfirm}
            err={formik.errors.passwordConfirm}
          />
        </FieldWrap>
        <Button loading={loading} disabled={loading} type="submit" fullWidth>
          Sign Up
        </Button>
      </CustomForm>
    </MainContainer>
  );
};
