import style from "../assets/styles/home.module.css";
import demo_chat from "../assets/images/chat.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import popState from "../store/popup";
import auth from "../store/auth";

const Home = () => {
  const setPopup = useSetRecoilState(popState);
  const logged = useRecoilValue(auth);

  return (
    <>
      <main className={style.home}>
        <p className={style.description}>
          GET RANDOMLY MATCHED WITH SOMEONE FROM YOUR UNIVERSITY AND TEXT
          ANONYMOUSLY
        </p>

        <button className="button" onClick={() => setPopup(true)}>
          {logged ? "Chat Anonymously" : "Get Started"} &#x27F6;
        </button>

        <img src={demo_chat} alt="Demo Chat" />
      </main>
    </>
  );
};

export default Home;
