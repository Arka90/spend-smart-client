import axios from "../../config/axios";

export default async function signup(payload) {
  try {
    const { data } = await axios.post("/users/signup", payload);
    return data;
  } catch (error) {
    console.log(error);
  }
}
