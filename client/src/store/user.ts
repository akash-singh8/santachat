import { atom } from "recoil";
import User from "../components/User";

type User = {
  user?: string;
  feedbacks?: {
    id: string;
    feedback: string;
    rating: number;
    createdAt: string;
  }[];
};

const userState = atom<User>({
  key: "user",
  default: {},
});

export default userState;
