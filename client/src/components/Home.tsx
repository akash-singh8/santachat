import style from "../assets/styles/home.module.css";
import demo_chat from "../assets/images/chat.png";

const Home = () => {
  return (
    <main className={style.home}>
      <p className={style.description}>
        GET RANDOMLY MATCHED WITH SOMEONE FROM YOUR UNIVERSITY AND TEXT
        ANONYMOUSLY
      </p>

      <button className="button">Get Started &#x27F6;</button>

      <img src={demo_chat} alt="Demo Chat" />
    </main>
  );
};

export default Home;
