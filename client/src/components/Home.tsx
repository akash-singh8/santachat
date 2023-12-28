import style from "../assets/styles/home.module.css";
import demo_chat from "../assets/images/chat.png";
import { useSetRecoilState } from "recoil";
import popState from "../store/popup";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const setPopup = useSetRecoilState(popState);
  const navigate = useNavigate();
  const logged = localStorage.getItem("authToken");

  const handleClick = () => {
    if (logged) {
      navigate("/chat");
    } else {
      setPopup(true);
    }
  };

  return (
    <>
      <main className={style.home}>
        <p className={style.description}>
          GET RANDOMLY MATCHED WITH SOMEONE FROM YOUR UNIVERSITY AND TEXT
          ANONYMOUSLY
        </p>

        <button className="button" onClick={handleClick}>
          {logged ? "Chat Anonymously" : "Get Started"} &#x27F6;
        </button>

        <img src={demo_chat} alt="Demo Chat" />
      </main>
    </>
  );
};

export default Home;
