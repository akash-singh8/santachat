import { useTheme, styled } from "@mui/material";

import Button from "../shared/Button";
import Text from "../shared/Text";

import style from "../assets/styles/mood.module.css";
import happyIcon from "../assets/images/mood.svg";

const List = styled("li")(({ theme }) => ({
  backgroundColor: theme.palette.primary[200],
  color: theme.palette.primary[800],

  ":hover": {
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary[200]}`,
    color: theme.palette.primary[200],
    fontWeight: 600,
  },
}));

const Mood = ({ setThemeIndex }) => {
  const theme = useTheme();

  const handleMood = () => {
    const moods = document.querySelector(`.${style.moods}`) as HTMLDivElement;
    if (moods.style.display === "none") moods.style.display = "block";
    else moods.style.display = "none";
  };

  return (
    <div className={style.moodContainer}>
      <div
        className={style.moods}
        style={{
          background: theme.palette.primary.main,
          color: theme.palette.primary[100],
        }}
      >
        <Text
          sx={{
            color: theme.palette.primary[100],
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          How you feelin?
        </Text>
        <ul className={style.interests}>
          <List
            onClick={() => {
              setThemeIndex(1);
            }}
          >
            Love
          </List>
          <List
            onClick={() => {
              setThemeIndex(0);
            }}
          >
            Joy
          </List>
          <List
            onClick={() => {
              setThemeIndex(5);
            }}
          >
            Courage
          </List>
          <List
            onClick={() => {
              setThemeIndex(2);
            }}
          >
            Wonder
          </List>
          <List
            onClick={() => {
              setThemeIndex(6);
            }}
          >
            Sad
          </List>
          <List
            onClick={() => {
              setThemeIndex(0);
            }}
          >
            Anger
          </List>
          <List
            onClick={() => {
              setThemeIndex(4);
            }}
          >
            Fear
          </List>
          <List
            onClick={() => {
              setThemeIndex(3);
            }}
          >
            Disgust
          </List>
        </ul>
      </div>
      <Button className={style.select} onClick={handleMood}>
        <img src={happyIcon} alt="mood" />
      </Button>
    </div>
  );
};

export default Mood;
