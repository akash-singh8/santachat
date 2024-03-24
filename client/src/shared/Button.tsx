import { Button as Btn, styled } from "@mui/material";

const Button = styled(Btn)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "12px",
  boxShadow: "none",
  color: theme.palette.primary[100],
  fontFamily: "Poppins",
  textTransform: "none",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.8,
    boxShadow: "none",
    transform: "none",
  },
}));

export default Button;
