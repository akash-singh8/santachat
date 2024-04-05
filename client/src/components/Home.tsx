import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Box } from "@mui/material";

import style from "../assets/styles/home.module.css";

import popState from "../store/popup";
import auth from "../store/auth";
import timingPop from "../store/timing";

import Button from "../shared/Button";
import Text from "../shared/Text";
import Chat from "./Chat";

const Home = () => {
  const setPopup = useSetRecoilState(popState);
  const logged = useRecoilValue(auth);
  const [timing, setTimingPop] = useRecoilState(timingPop);

  const handleChat = () => {
    const currTime = new Date().toTimeString().split(" ")[0];

    if (
      logged &&
      !timing &&
      ((currTime > "02:00:00" && currTime < "08:00:00") ||
        (currTime > "13:00:00" && currTime < "20:00:00"))
    ) {
      setTimingPop(true);
    } else {
      setPopup(true);
    }
  };

  return (
    <Box className={style.home}>
      <Text className={style.description}>
        GET RANDOMLY MATCHED WITH SOMEONE FROM YOUR UNIVERSITY AND TEXT
        ANONYMOUSLY
      </Text>

      <Button variant="contained" size="large" onClick={handleChat}>
        {logged ? "Chat Anonymously" : "Get Started"} &#x27F6;
      </Button>

      <div className={style.demo_chat}>
        <Chat isDemo={true} />
      </div>
    </Box>
  );
};

export default Home;
