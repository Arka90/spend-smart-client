import axios from "../../config/axios";

export default async function createChannel(payload) {
  const { data } = await axios.post(`/chats`, payload);

  return data;
}
