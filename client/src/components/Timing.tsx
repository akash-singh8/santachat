import { useEffect, useState } from "react";
import popStyle from "../assets/styles/popup.module.css";
import style from "../assets/styles/timing.module.css";
import Window from "./Window";

const Timing = () => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    let currTime = new Date().toTimeString().split(" ")[0];

    if (currTime > "02:00:00" && currTime < "08:00:00") {
      setInterval(() => {
        currTime = new Date().toTimeString().split(" ")[0];

        let [hr, min, sec] = currTime.split(":");
        // @ts-ignore
        setRemainingTime(`${7 - hr}:${60 - min}:${60 - sec}`);
      }, 1000);
    }

    if (currTime > "13:00:00" && currTime < "20:00:00") {
      setInterval(() => {
        currTime = new Date().toTimeString().split(" ")[0];

        let [hr, min, sec] = currTime.split(":");
        // @ts-ignore
        setRemainingTime(`${19 - hr}:${60 - min}:${60 - sec}`);
      }, 1000);
    }
  }, []);

  return (
    <div className={popStyle.container}>
      <div style={{ maxWidth: "548px" }}>
        <Window type="timing">
          <div className={style.timing}>
            <div className={popStyle.header}>
              <p>
                Welcome to <span>Assume Chat</span>
              </p>
              <p>Assume is to put ass between u and me</p>
            </div>

            <div className={style.detail}>
              <h3>TIMING</h3>
              <p>9 AM to 11 AM</p>
              <p>8 PM to 11 PM</p>
            </div>

            <div className={style.opening}>
              <h3>OPENING IN</h3>
              <p>{remainingTime ? remainingTime : "_:_:_"}</p>
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
};

export default Timing;
