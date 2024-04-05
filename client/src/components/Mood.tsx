import Button from "../shared/Button";

import style from "../assets/styles/mood.module.css";
import happyIcon from "../assets/images/mood.svg";

const Mood = ({ onClick }) => {
  return (
    <div className={style.moodContainer}>
      <Button className={style.select} onClick={onClick}>
        <img src={happyIcon} alt="mood" />
      </Button>
    </div>
  );
};

export default Mood;
