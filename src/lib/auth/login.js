import axios from "../../config/axios";

export default async function login(payload) {
  const { data } = await axios.post("/users/login", payload);
  return data;
}
