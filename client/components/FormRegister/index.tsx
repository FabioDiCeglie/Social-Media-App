import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { IPalette, IRegister } from "../../lib/types";
import FlexBetween from "../FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const Form = () => {
  const { palette } = useTheme();
  const router = useRouter();
  const { background, neutral, primary } = palette as unknown as IPalette;
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = async (
    values: IRegister,
    onSubmitProps: FormikHelpers<any>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      // @ts-ignore
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    await axios
      .post("http://localhost:4004/auth/register", formData)
      .then(() => {
        onSubmitProps.resetForm();
        router.push("/login");
      });
  };

  return (
    <Formik
      onSubmit={handleFormSubmit as unknown as any}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
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
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Location"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.location}
              name="location"
              error={Boolean(touched.location) && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Occupation"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.occupation}
              name="occupation"
              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
              helperText={touched.occupation && errors.occupation}
              sx={{ gridColumn: "span 4" }}
            />
            <Box
              gridColumn="span 4"
              border={`1px solid ${neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <>
                        <p>Add Picture Here</p>
                        <p style={{ marginLeft: "32rem", fontSize: "0.8rem" }}>
                          is required*
                        </p>
                      </>
                    ) : (
                      <FlexBetween>
                        <Typography>
                          {(values as unknown as IRegister).picture.name}
                        </Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>

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
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: primary.main,
                color: background.alt,
                "&:hover": { color: primary.main },
              }}
            >
              REGISTER
            </Button>
            <Typography
              onClick={() => {
                resetForm();
                router.push("/login");
              }}
              sx={{
                textDecoration: "underline",
                color: primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: primary.light,
                },
              }}
            >
              Already have an account? Login here.
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
