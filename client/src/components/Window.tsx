import style from "../assets/styles/window.module.css";
import { useSetRecoilState } from "recoil";
import popState from "../store/popup";

const Window = ({ children, type }: any) => {
  const setPopup = useSetRecoilState(popState);
  const closeHandler = () => {
    if (type === "popup") {
      setPopup(false);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className={style.window}>
      <div className={style.top}>
        <div
          style={{ backgroundColor: "#fa5555" }}
          onClick={closeHandler}
          title="close"
        ></div>
        <div style={{ backgroundColor: "#efd448" }}></div>
        <div style={{ backgroundColor: "#59df44" }}></div>
      </div>

      <div className={style.box}>{children}</div>
    </div>
  );
};

export default Window;
