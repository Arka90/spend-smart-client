import axios from "../../config/axios";

export default async function getMonthlyIncomes() {
  try {
    const { data } = await axios.get("/income/monthly");
    return data;
  } catch (error) {
    console.log(error);
  }
}
