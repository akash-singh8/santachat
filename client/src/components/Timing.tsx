import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";

import popStyle from "../assets/styles/popup.module.css";
import style from "../assets/styles/timing.module.css";

import Window from "./Window";
import Text from "../shared/Text";

const Timing = () => {
  const theme = useTheme();
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    let currTime = new Date().toTimeString().split(" ")[0];

    if (currTime > "02:00:00" && currTime < "08:00:00") {
      setInterval(() => {
        currTime = new Date().toTimeString().split(" ")[0];

        const [hr, min, sec] = currTime.split(":");
        setRemainingTime(
          `${7 - parseInt(hr)}:${60 - parseInt(min)}:${60 - parseInt(sec)}`
        );
      }, 1000);
    }

    if (currTime > "13:00:00" && currTime < "20:00:00") {
      setInterval(() => {
        currTime = new Date().toTimeString().split(" ")[0];

        const [hr, min, sec] = currTime.split(":");
        setRemainingTime(
          `${7 - parseInt(hr)}:${60 - parseInt(min)}:${60 - parseInt(sec)}`
        );
      }, 1000);
    }
  }, []);

  return (
    <div className={popStyle.container}>
      <div style={{ maxWidth: "548px" }}>
        <Window type="timing">
          <div className={style.timing}>
            <div className={popStyle.header}>
              <div className={popStyle.welcomeText}>
                <Text>Welcome to&nbsp;</Text>
                <Text
                  sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                >
                  Assume Chat
                </Text>
              </div>
              <Text>Assume is to put ass between u and me</Text>
            </div>

            <div className={style.detail}>
              <Text sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                TIMING
              </Text>
              <Text>9 AM to 11 AM</Text>
              <Text>8 PM to 11 PM</Text>
            </div>

            <div className={style.opening}>
              <Text sx={{ fontWeight: 500 }}>OPENING IN</Text>
              <Text
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: "2rem",
                }}
              >
                {remainingTime ? remainingTime : "_:_:_"}
              </Text>
              <p></p>
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
};

export default Timing;
