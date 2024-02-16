import { useRecoilValue } from "recoil";
import style from "../assets/styles/header.module.css";
import user from "../assets/images/user.svg";
import auth from "../store/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const logged = useRecoilValue(auth);

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
