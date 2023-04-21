import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { IPalette } from "../../../lib/types";

const Login = () => {
    const theme = useTheme();
    const palette = theme.palette as unknown as IPalette;
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

export default Login
