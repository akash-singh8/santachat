import style from "../assets/styles/home.module.css";
import demo_chat from "../assets/images/chat.png";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import popState from "../store/popup";
import auth from "../store/auth";
import timingPop from "../store/timing";

const Home = () => {
  const setPopup = useSetRecoilState(popState);
  const logged = useRecoilValue(auth);
  const [timing, setTimingPop] = useRecoilState(timingPop);

  const handleChat = () => {
    if (logged && !timing) {
      setTimingPop(true);
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

        <button className="button" onClick={handleChat}>
          {logged ? "Chat Anonymously" : "Get Started"} &#x27F6;
        </button>

        <img src={demo_chat} alt="Demo Chat" />
      </main>
    </>
  );
};

export default Home;
