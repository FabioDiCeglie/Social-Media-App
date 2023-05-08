import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { IPalette } from "@/lib/types";
import Form from "@/components/FormRegister";

const Register = () => {
  const theme = useTheme();
  const palette = theme.palette as unknown as IPalette;
  const { background } = palette;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box width="100%" bgcolor={background.alt} p="1rem 6%" textAlign="center">
      <style>{`body { background-color: ${background.alt} }`}</style>
      <Typography fontWeight="bold" fontSize="32px" color="primary">
        Sociogram
      </Typography>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        bgcolor={background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
          color="primary"
        >
          Welcome back!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Register;
