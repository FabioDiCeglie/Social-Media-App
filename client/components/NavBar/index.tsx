import { useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../FlexBetween";
import { IPalette, IUser } from "../../lib/types";
import { useRouter } from "next/router";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: { user: IUser }) => state.user);
  const router = useRouter();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const palette = theme.palette as unknown as IPalette;
  const { neutral, background: backgroundPalette, primary } = palette;
  const neutralLight = neutral.light;
  const dark = neutral.dark;
  const background = backgroundPalette.default;
  const primaryLight = primary.light;
  const alt = backgroundPalette.alt;

  // const fullName = `${user.firstName} ${user.lastName}`;

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
          Sociopedia
        </Typography>
      </FlexBetween>
    </FlexBetween>
  );
};

export default NavBar;
