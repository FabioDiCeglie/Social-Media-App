import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../FlexBetween";
import { useRouter } from "next/router";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
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

const initialValuesLogin = {
    email: "",
    password: "",
};
const Form = () => {
    const { palette  } = useTheme();
    const router = useRouter();
    const { background } = palette;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Box width="100%" bgcolor={background.alt} p="1rem 6%" textAlign="center">
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    Sociogram
                </Typography>
                <Box width={isNonMobileScreens ? "50%" : "93%"}
                     p="2rem" m="rem auto" borderRadius="1.5rem" bgcolor={background.alt}
                >
                    <Typography fontWeight="500" variant="h5" sx={{ mb:"1.5rem" }}>
                        Login
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Form
