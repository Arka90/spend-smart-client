import axios from "../../config/axios";

export default async function updateIncome(payload, id) {
  const { data } = await axios.patch(`/income/${id}`, payload);
  return data;
}
