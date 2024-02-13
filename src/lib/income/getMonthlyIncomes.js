import axios from "../../config/axios";

export default async function getMonthlyIncomes(month, year) {
  const { data } = await axios.get(
    `/income/monthly?month=${month}&year=${year}`
  );
  return data;
}
