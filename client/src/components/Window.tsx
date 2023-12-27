import style from "../assets/styles/window.module.css";

const Window = ({ children }: any) => {
  return (
    <div className={style.window}>
      <div className={style.top}>
        <div style={{ backgroundColor: "#fa5555" }}></div>
        <div style={{ backgroundColor: "#efd448" }}></div>
        <div style={{ backgroundColor: "#59df44" }}></div>
      </div>

      <div className={style.box}>{children}</div>
    </div>
  );
};

export default Window;
