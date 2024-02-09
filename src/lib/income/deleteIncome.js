import axios from "../../config/axios";

export default async function deleteIncome(id) {
  try {
    await axios.delete(`/income/${id}`);
  } catch (error) {
    console.log(error);
  }
}
