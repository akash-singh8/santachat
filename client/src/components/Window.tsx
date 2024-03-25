import { useSetRecoilState } from "recoil";
import { Box, useTheme } from "@mui/material";

import style from "../assets/styles/window.module.css";

import popState from "../store/popup";
import feedbackPop from "../store/feedback";
import timingPop from "../store/timing";

const Window = ({ children, type }: any) => {
  const theme = useTheme();

  const setPopup = useSetRecoilState(popState);
  const setFeedback = useSetRecoilState(feedbackPop);
  const setTimingPop = useSetRecoilState(timingPop);

  const closeHandler = () => {
    if (type === "popup") {
      setPopup(false);
    } else if (type === "feedback") {
      setFeedback(false);
    } else if (type === "timing") {
      setTimingPop(false);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className={style.window}>
      <Box
        className={style.top}
        sx={{
          border: `2px solid ${theme.palette.primary[500]}`,
          backgroundColor: theme.palette.primary[200],
        }}
      >
        <div
          style={{ backgroundColor: "#fa5555" }}
          onClick={closeHandler}
          title="close"
        ></div>
        <div style={{ backgroundColor: "#efd448" }}></div>
        <div style={{ backgroundColor: "#59df44" }}></div>
      </Box>

      <Box
        className={style.box}
        sx={{
          border: `2px solid ${theme.palette.primary[500]}`,
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default Window;
