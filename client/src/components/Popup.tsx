import style from "../assets/styles/popup.module.css";
import Window from "./Window";
import { useRecoilValue } from "recoil";
import popState from "../store/popup";
import { useEffect } from "react";

const VerifyPop = () => {
  const verifyUser = async (e: any) => {
    e.preventDefault();

    const email = document.querySelector(
      `.${style.input} input`
    ) as HTMLInputElement;

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
          Welcome to <span>SANTaCHAT</span>
        </p>
        <p>An anonymous chatroom for SCU students</p>
      </div>

      <div className={style.verify}>
        <form className={style.input} onSubmit={verifyUser}>
          <input type="email" placeholder="student@scu.edu" required />
          <button className={style.button} type="submit">
            verify
          </button>
        </form>
        <p>Please verify your SCU email address</p>
      </div>
    </div>
  );
};

const WaitingRoom = () => {
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
        <button className={style.start}>START</button>
      </div>
    </div>
  );
};

const Popup = () => {
  const popup = useRecoilValue(popState);
  const logged = localStorage.getItem("authToken");

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
