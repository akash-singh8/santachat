import style from "./assets/styles/app.module.css";
import Home from "./components/Home";

function App() {
  return (
    <div className={style.app}>
      <header className={style.header}>
        <h1>SANTaCHAT</h1>
        <p>CONNECTING STUDENTS, CREATING COMMUNITY!</p>
      </header>

      <Home />

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
