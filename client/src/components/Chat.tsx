import style from "../assets/styles/chat.module.css";
import send from "../assets/images/send.png";

const Chat = () => {
  const sendMessage = (e: any) => {
    e.preventDefault();

    console.log("sending message");
  };

  return (
    <main className={style.chat}>
      <div className={style.top}>
        <div style={{ backgroundColor: "#fa5555" }}></div>
        <div style={{ backgroundColor: "#efd448" }}></div>
        <div style={{ backgroundColor: "#59df44" }}></div>
      </div>

      <div className={style.box}>
        <div className={style.chats}>
          <div className={`${style.message} ${style.right}`}>
            Hello, how you doin?
          </div>
          <div className={`${style.message} ${style.left}`}>
            yeah I'm doin fantatic
          </div>
          <div className={`${style.message} ${style.right}`}>
            ohh that's great
          </div>
          <div className={`${style.message} ${style.left}`}>
            yup, what about you?
          </div>
        </div>

        <form className={style.input} onSubmit={sendMessage}>
          <input type="text" placeholder="type message here..." />
          <button type="submit">
            <img src={send} alt="send" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Chat;
