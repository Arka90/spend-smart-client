import axios from "../../config/axios";

export default async function login(payload) {
  try {
    const { data } = await axios.post("/users/login", payload);
    return data;
  } catch (error) {
    console.log(error);
  }
}
