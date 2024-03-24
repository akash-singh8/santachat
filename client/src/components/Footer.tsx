import { List } from "@mui/material";
import { styled } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: "Poppins",
  fontWeight: 500,
  textAlign: "center",
}));

const Footer = () => {
  return (
    <footer style={{ marginTop: "44px" }}>
      <List>
        <ListItem>COPYRIGHT</ListItem>
        <ListItem>2024-2025</ListItem>
        <ListItem>ASSUMECHAT</ListItem>
      </List>
    </footer>
  );
};

export default Footer;
