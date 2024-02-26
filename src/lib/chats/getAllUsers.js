import axios from "../../config/axios";

export default async function getAllUsers() {
  const { data } = await axios.get(`/chats`);

  return data;
}
