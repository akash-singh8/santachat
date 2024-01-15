import style from "./assets/styles/app.module.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Popup from "./components/Popup";
import Verify from "./components/Verify";
import Feedback from "./components/Feedback";
import Notification from "./components/Notification";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import feedbackPop from "./store/feedback";
import User from "./components/User";
import auth from "./store/auth";
import Header from "./components/Header";

function App() {
  const feedback = useRecoilValue(feedbackPop);
  const setAuth = useSetRecoilState(auth);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) setAuth(authToken);
  }, []);

  return (
    <div className={style.app}>
      <Header />

      <Popup />
      {feedback && <Feedback />}
      <Notification />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/verify" element={<Verify />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>

      <footer className={style.footer}>
        <ul>
          <li>COPYRIGHT</li>
          <li>2023-2024</li>
          <li>SANTaCHAT</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
