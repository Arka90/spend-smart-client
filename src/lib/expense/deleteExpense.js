import axios from "../../config/axios";

export default async function deleteExpense(id) {
  try {
    await axios.delete(`/expenses/${id}`);
  } catch (error) {
    console.log(error);
  }
}
