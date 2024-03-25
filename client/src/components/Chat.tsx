import style from "../assets/styles/chat.module.css";
import Window from "./Window";
import { useEffect } from "react";
import userInterestState from "../store/interests";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";

import feedbackPop from "../store/feedback";
import auth from "../store/auth";

const Chat = () => {
  const theme = useTheme();

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

      switch (data.status) {
        case 200:
          addMessage(data.message, style.left, data.image);
          break;
        case 201:
          toast.info(data.message);
          break;
        case 202:
          toast.success(data.message);
          break;
        case 303:
          setFeedback(true);
          break;
        default:
          toast.error(data.message);
          break;
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

    if (className === style.right) {
      div.style.border = `1px solid ${theme.palette.primary[500]}`;
      div.style.backgroundColor = theme.palette.primary[100];
      div.style.color = theme.palette.primary[800];
    } else {
      div.style.border = `1px solid ${theme.palette.primary[100]}`;
      div.style.backgroundColor = theme.palette.primary.main;
      div.style.color = theme.palette.primary[100];
    }

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
  const sendMessage = (e) => {
    e.preventDefault();

    if (!ws) {
      toast.error("Connection not established yet!", {
        toastId: "not-connected",
      });
      return;
    }

    const messageInput = document.querySelector(
      `.${style.input_container} input[type="text"]`
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

  const addInputImage = (e) => {
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

          <div
            className={style.input_container}
            style={{
              backgroundColor: theme.palette.primary[100],
              border: `2px solid ${theme.palette.primary[200]}`,
            }}
          >
            <form className={style.input} onSubmit={sendMessage}>
              <label htmlFor="image-upload" className={style.image}>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={addInputImage}
                />
                <svg width="23" height="23" viewBox="0 0 23 23">
                  <path
                    d="M18.1394 22.9548H1.68505C0.755911 22.9548 0 22.2001 0 21.2724V5.76927C0 4.84161 0.755911 4.08691 1.68505 4.08691H13.137V5.01179H1.68505C1.26664 5.01179 0.926362 5.35153 0.926362 5.76927V21.2724C0.926362 21.6901 1.26664 22.0299 1.68505 22.0299H18.1394C18.5578 22.0299 18.8981 21.6901 18.8981 21.2724V10.7636H19.8244V21.2724C19.8241 22.2001 19.0682 22.9548 18.1394 22.9548Z"
                    fill={theme.palette.primary[500]}
                  />
                  <path
                    d="M16.7757 20.2447H3.04884C2.87715 20.2447 2.71936 20.1498 2.63908 19.9981C2.55879 19.8464 2.56929 19.663 2.66625 19.5212L5.21683 15.7958C5.3033 15.6697 5.44626 15.5941 5.59911 15.5941C5.75196 15.5941 5.89524 15.6697 5.98139 15.7958L7.10383 17.4353L11.0344 11.6945C11.1208 11.5685 11.2638 11.4929 11.4167 11.4929C11.5695 11.4929 11.7128 11.5685 11.7989 11.6945L17.1576 19.5212C17.2546 19.6627 17.2651 19.8464 17.1848 19.9981C17.1051 20.1498 16.9474 20.2447 16.7757 20.2447ZM3.92672 19.3199H15.8981L11.4173 12.7751L7.48673 18.5155C7.40027 18.6416 7.2573 18.7172 7.10445 18.7172C6.9516 18.7172 6.80832 18.6416 6.72217 18.5155L5.59973 16.876L3.92672 19.3199Z"
                    fill={theme.palette.primary[500]}
                  />
                  <path
                    d="M5.2682 11.2762C4.22296 11.2762 3.37256 10.4272 3.37256 9.38358C3.37256 8.34001 4.22296 7.49097 5.2682 7.49097C6.31345 7.49097 7.16385 8.34001 7.16385 9.38358C7.16385 10.4272 6.31345 11.2762 5.2682 11.2762ZM5.2682 8.41585C4.73369 8.41585 4.29892 8.84992 4.29892 9.38358C4.29892 9.91723 4.73369 10.3513 5.2682 10.3513C5.80271 10.3513 6.23749 9.91723 6.23749 9.38358C6.23749 8.84992 5.80271 8.41585 5.2682 8.41585Z"
                    fill={theme.palette.primary[500]}
                  />
                  <path
                    d="M19.8238 0.916016H18.8975V8.18279H19.8238V0.916016Z"
                    fill={theme.palette.primary[500]}
                  />
                  <path
                    d="M23.0001 4.08716H15.7217V5.01204H23.0001V4.08716Z"
                    fill={theme.palette.primary[500]}
                  />
                </svg>
              </label>

              <input
                type="text"
                placeholder="type message here..."
                required
                style={{ color: theme.palette.primary[800] }}
              />
              <button type="submit">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z"
                    stroke={theme.palette.primary[500]}
                    fill={theme.palette.primary[200]}
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </Window>
    </div>
  );
};

export default Chat;
