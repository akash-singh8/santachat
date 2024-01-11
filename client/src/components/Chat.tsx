import style from "../assets/styles/chat.module.css";
import Window from "./Window";
import send from "../assets/images/send.png";
import { useEffect } from "react";
import userInterestState from "../store/interests";
import { useRecoilValue } from "recoil";
import add_image from "../assets/images/add_image.svg";

const Chat = () => {
  const userInterest = useRecoilValue(userInterestState);
  let ws: WebSocket;

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Please verify your identity to continue!");
      return;
    }

    ws = new WebSocket(
      `${
        import.meta.env.VITE_BACKEND_WS_URL
      }?auth=${authToken}&interests=${userInterest}`
    );

    ws.onopen = () => {
      console.log("Connected to websocket server");
    };

    ws.onmessage = (event) => {
      type Message = {
        status: number;
        message: string;
      };

      const data: Message = JSON.parse(event.data);
      console.log("Received message :", data);

      if (data.status === 200) {
        addMessage(data.message, style.left);
      } else {
        alert(data.message);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from websocket server");
    };
  }, []);

  // function to add message block to chats
  const addMessage = (message: string, className: string) => {
    const chats = document.querySelector(`.${style.chats}`) as HTMLDivElement;
    const div = document.createElement("div");

    div.innerText = message;
    div.classList.add(style.message);
    div.classList.add(className);
    chats.appendChild(div);
    chats.scrollTop = chats?.scrollHeight;
  };

  // function to send messages
  const sendMessage = (e: any) => {
    e.preventDefault();

    if (!ws) {
      alert("Connection not established yet!");
      return;
    }

    const message = document.querySelector(
      `.${style.input} input`
    ) as HTMLInputElement;

    ws.send(message.value);
    addMessage(message.value, style.right);

    message.value = "";
  };

  const addInputImage = (e: any) => {
    const image = e.target.files[0];
    const input = document.querySelector(
      `.${style.input_container}`
    ) as HTMLDivElement;
    const prevImage = input.querySelector(`.${style.add_image}`);

    if (!image && prevImage) {
      input.removeChild(prevImage);
      return;
    }

    const url = URL.createObjectURL(image);

    const imageElement = document.createElement("img");
    imageElement.setAttribute("alt", "image to upload");
    imageElement.setAttribute("src", url);
    imageElement.classList.add(style.add_image);

    if (prevImage) input.removeChild(prevImage);
    input.appendChild(imageElement);
  };

  return (
    <Window>
      <main className={style.chat}>
        <div className={style.chats}></div>

        <div className={style.input_container}>
          <form className={style.input} onSubmit={sendMessage}>
            <label htmlFor="image-upload" className={style.image}>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={addInputImage}
              />
              <img src={add_image} alt="add image" title="Add Image" />
            </label>
            <input type="text" placeholder="type message here..." />
            <button type="submit">
              <img src={send} alt="send" />
            </button>
          </form>
        </div>
      </main>
    </Window>
  );
};

export default Chat;
