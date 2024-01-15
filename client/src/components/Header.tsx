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
        <h1>SANTaCHAT</h1>
        <p>CONNECTING STUDENTS, CREATING COMMUNITY!</p>
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
