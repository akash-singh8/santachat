import style from "../assets/styles/popup.module.css";
import Window from "./Window";
import { useRecoilValue, useSetRecoilState } from "recoil";
import popState from "../store/popup";
import userInterestState from "../store/interests";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../store/auth";
import UniversityList from "../utils/university_list";

const VerifyPop = () => {
  const [domain, setDomain] = useState("princeton.edu");
  const verifyUser = async (e: any) => {
    e.preventDefault();

    const email = document.querySelector(
      `.${style.input} input`
    ) as HTMLInputElement;

    const emailDomain = email.value.split("@");
    if (emailDomain[1] !== domain) {
      return alert("Invalid Email!");
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sendlink?user=${email.value}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      alert(data.message);

      email.value = "";
    } catch (e) {
      console.log(e);
      alert("Unable to verify at present moment!");
    }
  };

  return (
    <div className={style.popup}>
      <div className={style.header}>
        <p>
          Welcome to <span>Assume Chat</span>
        </p>
        <p>Assume is to put ass between u and me</p>
      </div>

      <div className={style.university}>
        <label htmlFor="university">University: </label>

        <select
          id="university"
          onClick={(e) => {
            setDomain(UniversityList[e.target.value]);
          }}
        >
          {Object.keys(UniversityList).map((university, i) => (
            <option value={university}>{`${i + 1}. ${university}`}</option>
          ))}
        </select>
      </div>

      <div className={style.verify}>
        <form className={style.input} onSubmit={verifyUser}>
          <input type="email" placeholder={`student@${domain}`} required />
          <button className={style.button} type="submit">
            verify
          </button>
        </form>
        <p>Please verify your {domain} email address</p>
      </div>
    </div>
  );
};

const WaitingRoom = () => {
  const setPopup = useSetRecoilState(popState);
  const setUserInterest = useSetRecoilState(userInterestState);
  const navigate = useNavigate();

  const userInterest = {
    Clubs: false,
    Rooms: false,
    Study: false,
    Chill: false,
    Freshman: false,
    Sophomore: false,
    Junior: false,
    Senior: false,
  };

  useEffect(() => {
    const interests = document.querySelectorAll(`.${style.interests} li`);

    interests.forEach((interest) => {
      interest.addEventListener("click", () => {
        const name = interest.innerHTML;
        // @ts-ignore
        userInterest[name] = !userInterest[name];
        interest.classList.toggle(`${style.active_interest}`);
      });
    });
  }, []);

  const startChat = () => {
    const interests = Object.keys(userInterest);
    let interestStr = "";

    interests.forEach((interest) => {
      // @ts-ignore
      if (userInterest[interest]) {
        interestStr += interest + "_";
      }
    });

    const len = interestStr.length;
    setUserInterest(len ? interestStr.slice(0, len - 1) : "");
    setPopup(false);
    navigate("/chat");
  };

  return (
    <div className={style.waiting}>
      <div className={style.waiting_head}>
        <h2>WAITING ROOM</h2>
        <div>
          <span>57</span>
          <div>
            <p>active</p>
            <p>students</p>
          </div>
        </div>
      </div>

      <div>
        <p>Select the keywords that you are interest in</p>
        <ul className={style.interests}>
          <li>Clubs</li>
          <li>Rooms</li>
          <li>Study</li>
          <li>Chill</li>
          <li>Freshman</li>
          <li>Sophomore</li>
          <li>Junior</li>
          <li>Senior</li>
        </ul>
      </div>

      <div className={style.gender}>
        <p>Are you</p>
        <div>
          <input type="radio" name="gender" id="male" />
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" id="female" />
          <label htmlFor="female">Female</label>
        </div>
      </div>

      <div className={style.start_container}>
        <button className={style.start} onClick={startChat}>
          START
        </button>
      </div>
    </div>
  );
};

const Popup = () => {
  const popup = useRecoilValue(popState);
  const logged = useRecoilValue(auth);

  return (
    popup && (
      <div className={style.container}>
        <div style={{ maxWidth: logged ? "628px" : "540px" }}>
          <Window type="popup">
            {logged ? <WaitingRoom /> : <VerifyPop />}
          </Window>
        </div>
      </div>
    )
  );
};

export default Popup;
