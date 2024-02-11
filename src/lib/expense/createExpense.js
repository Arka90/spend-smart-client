import axios from "../../config/axios";

export default async function createExpense(payload) {
  const { data } = await axios.post(`/expenses`, payload);
  return data;
}
