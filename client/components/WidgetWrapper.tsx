import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "../lib/types";

const WidgetWrapper = styled(Box)(({ theme }: { theme: ITheme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
