import axios from "../../config/axios";

export default async function getExpensesById(id) {
  const { data } = await axios.get(`/expenses/${id}`);
  return data;
}
