import axios from "../../config/axios";

export default async function getMonthlyIncomes() {
  const { data } = await axios.get("/income/monthly");
  return data;
}
