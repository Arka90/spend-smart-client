import axios from "../../config/axios";

export default async function updateIncome(payload, id) {
  try {
    const { data } = await axios.patch(`/income/${id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
}
