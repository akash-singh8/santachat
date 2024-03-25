import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../shared/Button";

import style from "../assets/styles/user.module.css";
import user from "../assets/images/user.svg";

import auth from "../store/auth";
import userState from "../store/user";
import {
  Box,
  Typography,
  useTheme,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  styled,
} from "@mui/material";

const User = () => {
  const theme = useTheme();

  const [authToken, setAuthToken] = useRecoilState(auth);
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      toast.warning("Please login to continue!");
      navigate("/");
      return;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken("");
    navigate("/");
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.primary[200],
    },
    td: {
      color: theme.palette.primary[800],
      borderBottom: `1px solid ${theme.palette.primary[500]}`,
    },
    th: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary[100],
      fontWeight: 600,
      border: 0,
    },
  }));

  return (
    <div className={style.user}>
      <div className={style.detail}>
        <Box
          className={style.userLogo}
          sx={{ border: `2px solid ${theme.palette.primary.main}` }}
        >
          <img src={user} alt="user profile" />
        </Box>
        <Typography
          variant="h2"
          sx={{ fontFamily: "Poppins", color: theme.palette.primary[800] }}
        >
          {userData.user}
        </Typography>

        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <div className={style.feedback}>
        <Typography
          variant="h2"
          sx={{ fontFamily: "Poppins", color: theme.palette.primary[800] }}
        >
          Feedback history
        </Typography>

        <TableContainer sx={{ borderRadius: "8px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <TableCell>Feedback</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Date</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {userData.feedbacks?.length ? (
                userData.feedbacks.map((feedback) => {
                  const time = new Date(feedback.createdAt);

                  return (
                    <StyledTableRow key={feedback.id}>
                      <TableCell scope="row">{feedback.feedback}</TableCell>
                      <TableCell align="right">{feedback.rating}</TableCell>
                      <TableCell align="right" title={time.toTimeString()}>
                        {time.toLocaleDateString()}
                      </TableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <TableCell>No feedbacks to show</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default User;
