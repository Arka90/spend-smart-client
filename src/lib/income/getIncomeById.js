import axios from "../../config/axios";

export default async function getIncomeById(id) {
  const { data } = await axios.get(`/income/${id}`);
  return data;
}
