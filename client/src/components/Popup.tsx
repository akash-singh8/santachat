import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "@mui/material";

import style from "../assets/styles/popup.module.css";
import UniversityList from "../utils/university_list";

import Window from "./Window";
import Text from "../shared/Text";
import Button from "../shared/Button";

import userInterestState from "../store/interests";
import popState from "../store/popup";
import auth from "../store/auth";

const VerifyPop = () => {
  const [domain, setDomain] = useState("princeton.edu");
  const verifyUser = async (e) => {
    e.preventDefault();

    const email = document.querySelector(
      `.${style.input} input`
    ) as HTMLInputElement;

    const emailDomain = email.value.split("@");
    if (emailDomain[1] !== domain) {
      return toast.error(`Invalid email: ${email.value}`, {
        toastId: "invalid-email",
      });
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sendlink?user=${email.value}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      toast.info(data.message);

      email.value = "";
    } catch (e) {
      console.log(e);
      toast.error("Unable to verify at present moment!");
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
            // @ts-ignore
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
        userInterest[name] = !userInterest[name];
        interest.classList.toggle(`${style.active_interest}`);
      });
    });
  }, []);

  const startChat = () => {
    const interests = Object.keys(userInterest);
    let interestStr = "";

    interests.forEach((interest) => {
      if (userInterest[interest]) {
        interestStr += interest + "_";
      }
    });

    const len = interestStr.length;
    setUserInterest(len ? interestStr.slice(0, len - 1) : "");
    setPopup(false);
    navigate("/chat");
  };

  const ListItem = styled("li")(({ theme }) => ({
    backgroundColor: theme.palette.primary[200],
    color: theme.palette.primary[800],
    fontFamily: "Poppins",
    fontSize: "14px",

    "&:hover": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },

    [`&.${style.active_interest}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary[100],
      fontWeight: 500,
    },
  }));

  return (
    <div className={style.waiting}>
      <div className={style.waiting_head}>
        <Text>WAITING ROOM</Text>
        {/* <div>
          <span>57</span>
          <div>
            <p>active</p>
            <p>students</p>
          </div>
        </div> */}
      </div>

      <div>
        <Text sx={{ fontSize: "1rem" }}>
          Select the keywords that you are interest in
        </Text>
        <ul className={style.interests}>
          <ListItem>Clubs</ListItem>
          <ListItem>Rooms</ListItem>
          <ListItem>Study</ListItem>
          <ListItem>Chill</ListItem>
          <ListItem>Freshman</ListItem>
          <ListItem>Sophomore</ListItem>
          <ListItem>Junior</ListItem>
          <ListItem>Senior</ListItem>
        </ul>
      </div>

      {/* <div className={style.gender}>
        <Text>Are you</Text>
        <div>
          <input type="radio" name="gender" id="male" />
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" id="female" />
          <label htmlFor="female">Female</label>
        </div>
      </div> */}

      <Button className={style.start} onClick={startChat}>
        Start
      </Button>
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
