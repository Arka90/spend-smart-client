import axios from "../../config/axios";

export default async function getMonthlyExpenses() {
  try {
    const { data } = await axios.get("/expenses/monthly");
    return data;
  } catch (error) {
    console.log(error);
  }
}
