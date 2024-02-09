import axios from "../../config/axios";

export default async function createIncome(payload) {
  try {
    const { data } = await axios.post(`/income`, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
}
