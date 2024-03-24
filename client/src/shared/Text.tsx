import { styled } from "@mui/material";

const Text = styled("p")(({ theme }) => ({
  color: theme.palette.primary[800],
  fontFamily: "Poppins",
  fontSize: "14px",
}));

export default Text;
