import style from "../assets/styles/chat.module.css";
import Window from "./Window";
import send from "../assets/images/send.png";
import { useEffect } from "react";
import userInterestState from "../store/interests";
import { useSetRecoilState, useRecoilValue } from "recoil";
import add_image from "../assets/images/add_image.svg";
import feedbackPop from "../store/feedback";
import Notify from "../store/notification";
import auth from "../store/auth";

const Chat = () => {
  const setNotifcation = useSetRecoilState(Notify);
  const setFeedback = useSetRecoilState(feedbackPop);
  const userInterest = useRecoilValue(userInterestState);
  const authToken = useRecoilValue(auth);
  let ws: WebSocket;

  useEffect(() => {
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
        image?: string;
      };

      const data: Message = JSON.parse(event.data);
      console.log("Received message :", data);

      if (data.status === 303) {
        setFeedback(true);
      }

      if (data.status === 200) {
        addMessage(data.message, style.left, data.image);
      } else {
        setNotifcation(data.message);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from websocket server");
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [authToken]);

  // function to add message block to chats
  const addMessage = async (
    message: string,
    className: string,
    image?: string
  ) => {
    const chats = document.querySelector(`.${style.chats}`) as HTMLDivElement;
    const div = document.createElement("div");

    div.classList.add(style.message);
    div.classList.add(className);

    if (image) {
      const fetchImage = await fetch(image);
      const blob = await fetchImage.blob();
      const url = URL.createObjectURL(blob);

      const imageElement = document.createElement("img");
      imageElement.classList.add(style.add_image);
      imageElement.setAttribute("src", image);

      const a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      a.appendChild(imageElement);

      div.appendChild(a);
    }

    const p = document.createElement("p");
    p.innerText = message;
    div.appendChild(p);

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

    const messageInput = document.querySelector(
      `.${style.input} input[type="text"]`
    ) as HTMLInputElement;

    const image = document.querySelector(`.${style.image} input`);
    const messageObj = {
      message: messageInput.value,
      image: "",
    };

    // @ts-ignore
    const imageFile = image.files[0];
    if (imageFile) {
      const fileReader = new FileReader();
      fileReader.onload = async function (e: any) {
        const input = document.querySelector(
          `.${style.input_container}`
        ) as HTMLDivElement;

        const prevImage = input.querySelector(`.${style.add_image}`);
        input.removeChild(prevImage!);

        messageObj.image = e.target.result;
        await addMessage(messageInput.value, style.right, e.target.result);
        ws.send(JSON.stringify(messageObj));
        messageInput.value = "";
        // @ts-ignore
        image.value = "";
      };

      fileReader.readAsDataURL(imageFile);
    } else {
      addMessage(messageInput.value, style.right);
      ws.send(JSON.stringify(messageObj));
      messageInput.value = "";
    }
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
    <div className={style.container}>
      <Window>
        <div className={style.chat}>
          <div className={style.chats}></div>
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

            <input type="text" placeholder="type message here..." required />
            <button type="submit">
              <img src={send} alt="send" />
            </button>
          </form>
        </div>
      </Window>
    </div>
  );
};

export default Chat;
