import { useRecoilValue } from "recoil";
import style from "../assets/styles/header.module.css";
import user from "../assets/images/user.svg";
import auth from "../store/auth";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
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
        <h1>Assume Chat</h1>
        <p>Assume is to put ass between u and me</p>
      </Link>

      {logged && (
        <Link to={"/user"}>
          <img src={user} alt="profile" className={style.profile} />
        </Link>
      )}
    </header>
  );
};

export default Header;
