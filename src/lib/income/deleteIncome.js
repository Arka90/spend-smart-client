import axios from "../../config/axios";

export default async function deleteIncome(id) {
  await axios.delete(`/income/${id}`);
}
