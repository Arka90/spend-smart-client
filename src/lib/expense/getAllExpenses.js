import axios from "../../config/axios";

export default async function getAllExpenses() {
  const { data } = await axios.get("/expenses");
  return data;
}
