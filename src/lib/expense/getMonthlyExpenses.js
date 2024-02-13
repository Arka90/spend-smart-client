import axios from "../../config/axios";

export default async function getMonthlyExpenses(month, year) {
  const { data } = await axios.get(
    `/expenses/monthly?month=${month}&year=${year}`
  );
  return data;
}
