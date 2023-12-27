import style from "../assets/styles/popup.module.css";
import Window from "./Window";
import { useRecoilValue } from "recoil";
import popState from "../store/popup";

const Popup = () => {
  const popup = useRecoilValue(popState);

  return (
    popup && (
      <div className={style.container}>
        <Window type="popup">
          <div className={style.popup}>
            <div className={style.header}>
              <p>
                Welcome to <span>SANTaCHAT</span>
              </p>
              <p>An anonymous chatroom for SCU students</p>
            </div>

            <div className={style.verify}>
              <div className={style.input}>
                <input type="text" placeholder="student@scu.edu" />
                <button className={style.button}>verify</button>
              </div>
              <p>Please verify your SCU email address</p>
            </div>
          </div>
        </Window>
      </div>
    )
  );
};

export default Popup;
