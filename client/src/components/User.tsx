import style from "../assets/styles/user.module.css";
import user from "../assets/images/user.svg";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import auth from "../store/auth";
import { useNavigate } from "react-router-dom";
import userState from "../store/user";

const User = () => {
  const [authToken, setAuthToken] = useRecoilState(auth);
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      alert("Please login to continue!");
      navigate("/");
      return;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken("");
    navigate("/");
  };

  return (
    <div className={style.user}>
      <div className={style.detail}>
        <img src={user} alt="user profile" />
        <h2>{userData.user}</h2>

        <button className="button" onClick={handleLogout}>
          logout
        </button>
      </div>

      <div className={style.feedback}>
        <h2>Feedback history</h2>

        <table className={style.table}>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {userData.feedbacks?.length ? (
              userData.feedbacks.map((feedback: any) => {
                const time = new Date(feedback.createdAt);

                return (
                  <tr className={style.row} key={feedback.id}>
                    <td>{feedback.rating} / 5</td>
                    <td>{feedback.feedback}</td>
                    <td title={time.toTimeString()}>
                      {time.toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className={style.nofeedback}>
                <td>No feedbacks to show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
