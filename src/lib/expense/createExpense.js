import axios from "../../config/axios";

export default async function createExpense(payload) {
  try {
    const { data } = await axios.post(`/expenses`, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
}
