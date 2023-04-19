import { useState } from "react";
import {
    Box,
    FormControl,
    IconButton,
    InputBase,
    MenuItem,
    Select,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../FlexBetween";
import { IPalette, IUser } from "../../lib/types";
import { useRouter } from "next/router";
import { Close, DarkMode, Help, LightMode, Menu, Message, Notifications, Search } from "@mui/icons-material";
import { setLogout, setMode } from "../../state";
import Cookies from "js-cookie";

const NavBar = () => {
    const [ isMobileMenuToggled, setIsMobileMenuToggled ] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: { user: IUser }) => state.user);
    const router = useRouter();
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const palette = theme.palette as unknown as IPalette;
    const { neutral, background: backgroundPalette, primary, mode } = palette;
    const neutralLight = neutral.light;
    const dark = neutral.dark;
    const background = backgroundPalette.default;
    const primaryLight = primary.light;
    const alt = backgroundPalette.alt;

    // const fullName = `${user.firstName} ${user.lastName}` ?? "User";
    const fullName = "User";

    return (
        <FlexBetween padding="1rem 6%" bgcolor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => router.push("/")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    Sociogram
                </Typography>
                {isNonMobileScreen && (
                    <FlexBetween
                        bgcolor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/*DESKTOP NAV*/}
            {isNonMobileScreen ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {mode === "dark" ?
                            <DarkMode sx={{ fontSize: "25px" }}/> :
                            <LightMode sx={{ color: dark, fontSize: "25px" }}/>
                        }
                    </IconButton>
                    <Message sx={{ fontSize: "25px", color: mode === "light" ? dark : neutralLight }}/>
                    <Notifications sx={{ fontSize: "25px", color: mode === "light" ? dark : neutralLight}}/>
                    <Help sx={{ fontSize: "25px", color: mode === "light" ? dark : neutralLight}}/>
                    {/*@ts-ignore*/}
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu/>
                </IconButton>
            )}

            {/*MOBILE NAV*/}
            {isMobileMenuToggled && isMobileMenuToggled && (
                <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px"
                     bgcolor={background}>

                    {/*CLOSE ICON*/}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close/>
                        </IconButton>
                    </Box>

                    {/*MENU ITEMS*/}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {mode === "dark" ?
                                <DarkMode sx={{ fontSize: "25px" }}/> :
                                <LightMode sx={{ color: dark, fontSize: "25px" }}/>
                            }
                        </IconButton>
                        <Message sx={{ fontSize: "25px", color: mode === "light" ? dark : neutralLight }}/>
                        <Notifications sx={{ fontSize: "25px", color: mode === "light" ? dark : neutralLight}}/>
                        <Help sx={{ fontSize: "25px", color: mode === "light" ? dark : neutralLight}}/>
                        {/*@ts-ignore*/}
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase/>}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}

        </FlexBetween>
    );
};

export default NavBar;
