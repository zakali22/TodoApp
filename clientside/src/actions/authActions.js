import { AUTH_USER } from "./types";
import axios from "axios";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/auth/current_user");
  dispatch({
    type: AUTH_USER,
    payload: res.data
  });
};
