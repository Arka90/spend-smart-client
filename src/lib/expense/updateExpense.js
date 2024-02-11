import axios from "../../config/axios";

export default async function updateExpense(payload, id) {
  const { data } = await axios.patch(`/expenses/${id}`, payload);
  return data;
}
