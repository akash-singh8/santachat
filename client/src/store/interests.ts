import { atom } from "recoil";

const userInterestState = atom({
  key: "userInterestState",
  default: "",
});

export default userInterestState;
