import {  useState  } from 'react'
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from '@mui/material'
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import Link from 'next/link';
import FlexBetween from "../FlexBetween";
import {IPalette, IUser} from "../../lib/types";

const NavBar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state: {user: IUser}) => state.user)
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

    const theme = useTheme()
    const palette = theme.palette as unknown as IPalette
    const { neutral, background: backgroundPalette, primary } = palette
    const neutralLight = neutral.light
    const dark = neutral.dark
    const background = backgroundPalette.default;
    const primaryLight = primary.light;
    const alt = backgroundPalette.alt;
    return (
        <>
            <h1>Ciao me</h1>
    </>
)
}

export default NavBar