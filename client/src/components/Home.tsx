import style from "../assets/styles/home.module.css";
import demo_chat from "../assets/images/chat.png";

const Home = () => {
  return (
    <main className={style.home}>
      <p className={style.description}>
        Empower your college experience with SANTaCHAT! Engage in random
        one-on-one conversations with fellow students, broaden your social
        circle, and experience the joy of connecting with your college
        community.
        <br />
        Dive into the excitement of spontaneous interactions now!
      </p>

      <button className="button">Get Started &#x27F6;</button>

      <img src={demo_chat} alt="Demo Chat" />
    </main>
  );
};

export default Home;
