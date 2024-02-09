import axios from "../../config/axios";

export default async function getExpensesById(id) {
  try {
    const { data } = await axios.get(`/expenses/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
