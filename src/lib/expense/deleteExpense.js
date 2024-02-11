import axios from "../../config/axios";

export default async function deleteExpense(id) {
  await axios.delete(`/expenses/${id}`);
}
