import axios from "../../config/axios";

export default async function signup(payload) {
  const { data } = await axios.post("/users/signup", payload);
  return data;
}
