import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import { Container } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import style from "./assets/styles/app.module.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Popup from "./components/Popup";
import Verify from "./components/Verify";
import Feedback from "./components/Feedback";
import User from "./components/User";
import Header from "./components/Header";
import Timing from "./components/Timing";
import Footer from "./components/Footer";

import auth from "./store/auth";
import userState from "./store/user";
import timingPop from "./store/timing";
import feedbackPop from "./store/feedback";

function App() {
  const feedback = useRecoilValue(feedbackPop);
  const timing = useRecoilValue(timingPop);
  const setAuth = useSetRecoilState(auth);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setAuth(authToken);

      const fetchFeedback = fetch(
        `${import.meta.env.VITE_BACKEND_URL}/feedback`,
        {
          method: "GET",
          headers: {
            authorization: authToken,
          },
        }
      );

      fetchFeedback
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((e) => console.log("Error on fetching feedbacks :", e));
    }
  }, []);

  return (
    <Container className={style.app}>
      <Header />

      <Popup />
      {feedback && <Feedback />}
      {timing && <Timing />}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/verify" element={<Verify />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>

      <Footer />
      <ToastContainer />
    </Container>
  );
}

export default App;
