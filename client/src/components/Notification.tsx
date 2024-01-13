import { useRecoilState } from "recoil";
import style from "../assets/styles/notification.module.css";
import Notify from "../store/notification";
import close from "../assets/images/close.svg";

const Notification = () => {
  const [notifyValue, setNotify] = useRecoilState(Notify);

  const hideNotification = () => {
    setNotify("");
  };

  return (
    notifyValue && (
      <div className={style.notification}>
        <p>{notifyValue}</p>
        <img src={close} alt="close" onClick={hideNotification} />
      </div>
    )
  );
};

export default Notification;
