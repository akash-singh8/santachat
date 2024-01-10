import style from "./assets/styles/app.module.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Popup from "./components/Popup";
import Verify from "./components/Verify";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={style.app}>
      <header className={style.header}>
        <h1>SANTaCHAT</h1>
        <p>CONNECTING STUDENTS, CREATING COMMUNITY!</p>
      </header>

      <Popup />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/verify" element={<Verify />}></Route>
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
