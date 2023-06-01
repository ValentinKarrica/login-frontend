import { Button, TextField } from "@/elements";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginFormFields } from "@/types";

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
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .required("Required"),
});

interface Props {
  onSubmit: (form: LoginFormFields) => void;
  loading: boolean;
  alert?: JSX.Element | null;
}

export const LoginForm = ({ onSubmit, loading, alert }: Props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });
  return (
    <MainContainer>
      <Title>Login</Title>
      <CustomForm onSubmit={formik.handleSubmit} autoComplete="none">
        <FieldWrap>
          <TextField
            required
            id="email"
            name="email"
            type="text"
            label="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={!!(formik.touched.email && formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email ? (
            <Err>{formik.errors.email}</Err>
          ) : null}
          <TextField
            required
            id="password"
            name="password"
            type="password"
            label="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={!!(formik.touched.password && formik.errors.password)}
          />
          {formik.touched.password && formik.errors.password ? (
            <Err>{formik.errors.password}</Err>
          ) : null}
          {alert}
        </FieldWrap>
        <Button loading={loading} disabled={loading} type="submit" fullWidth>
          Login
        </Button>
      </CustomForm>
    </MainContainer>
  );
};
