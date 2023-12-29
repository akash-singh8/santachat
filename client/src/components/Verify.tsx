import { useSearchParams } from "react-router-dom";
import Window from "./Window";
import { useEffect, useState } from "react";
import style from "../assets/styles/verify.module.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying");

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    const user = searchParams.get("user");

    if (!user) {
      setMessage("Invalid Verification Link!");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/verify`,
        {
          method: "POST",
          headers: {
            authorization: user,
          },
        }
      );

      let dotCounts = 3;
      const loading = setInterval(() => {
        if (dotCounts++ === 5) {
          setMessage("Verifying");
          dotCounts = 1;
        } else {
          setMessage((curr) => curr + ".");
        }
      }, 400);

      const data = await res.json();
      clearInterval(loading);

      if (res.ok) {
        localStorage.setItem("authToken", data.authToken);
        setMessage("Successfully Verified 🎊🎉.");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setMessage("Invalid Verification Link!");
      }
    } catch (e) {
      console.log(e);
      alert("Unable to verify at present moment!");
    }
  };

  return (
    <div className={style.verify}>
      <Window>
        <p className={style.message}>{message}</p>
      </Window>
    </div>
  );
};

export default Verify;
