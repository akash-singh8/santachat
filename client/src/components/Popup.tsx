import style from "../assets/styles/popup.module.css";
import Window from "./Window";
import { useRecoilValue } from "recoil";
import popState from "../store/popup";

const Popup = () => {
  const popup = useRecoilValue(popState);

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
              <form className={style.input} onSubmit={verifyUser}>
                <input type="email" placeholder="student@scu.edu" required />
                <button className={style.button} type="submit">
                  verify
                </button>
              </form>
              <p>Please verify your SCU email address</p>
            </div>
          </div>
        </Window>
      </div>
    )
  );
};

export default Popup;
