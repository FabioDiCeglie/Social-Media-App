import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useRouter } from "next/router";
import { ILogin, IPalette, IRegister } from "../../lib/types";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../../lib/query";
import * as React from "react";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [login, { loading, error, data }] = useLazyQuery(LOGIN);
  const { palette } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { background } = palette as unknown as IPalette;
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = async (
    values: IRegister | ILogin,
    onSubmitProps: FormikHelpers<any>
  ) => {
    login({ variables: { email: values.email, password: values.password } });
    onSubmitProps.resetForm();
    if (data) {
      dispatch(
        setLogin({
          user: data.login,
          token: data.token,
        })
      );
      router.push("/");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            {error && (
              <Typography
                sx={{
                  mt: "2rem",
                  textDecoration: "underline",
                  color: "red",
                }}
              >
                Credentials are incorrect!
              </Typography>
            )}
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              LOGIN
            </Button>
            <Typography
              onClick={() => {
                resetForm();
                router.push("/register");
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              Don't have an account? Sign Up here.
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
