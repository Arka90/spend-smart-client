import axios from "../../config/axios";

export default async function getAllIncome() {
  const { data } = await axios.get("/income");
  return data;
}
