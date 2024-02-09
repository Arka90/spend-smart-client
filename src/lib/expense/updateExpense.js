import axios from "../../config/axios";

export default async function updateExpense(payload, id) {
  try {
    const { data } = await axios.patch(`/expenses/${id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
}
