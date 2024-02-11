import axios from "../../config/axios";

export default async function getMonthlyExpenses() {
  const { data } = await axios.get("/expenses/monthly");
  return data;
}
