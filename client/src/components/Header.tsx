import { Box, Typography, useTheme } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import Text from "../shared/Text";

import style from "../assets/styles/header.module.css";
import user from "../assets/images/user.svg";

import auth from "../store/auth";

const Header = () => {
  const theme = useTheme();
  const logged = useRecoilValue(auth);

  useEffect(() => {
    if (window.innerWidth < 601 && !logged) {
      const header = document.querySelector(
        `.${style.header}`
      ) as HTMLDivElement;
      header.style.alignItems = "center";
    }
  }, [logged]);

  return (
    <header className={style.header}>
      <Link to={"/"}>
        <Typography variant="h1" color={theme.palette.primary.main}>
          Assume Chat
        </Typography>
        <Text>Assume is to put ass between u and me</Text>
      </Link>

      {logged && (
        <Link to={"/user"}>
          <Box
            className={style.profile}
            sx={{ border: `2px solid ${theme.palette.primary.main}` }}
          >
            <img src={user} alt="profile" />
          </Box>
        </Link>
      )}
    </header>
  );
};

export default Header;
