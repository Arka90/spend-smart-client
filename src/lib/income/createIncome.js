import axios from "../../config/axios";

export default async function createIncome(payload) {
  const { data } = await axios.post(`/income`, payload);
  return data;
}
