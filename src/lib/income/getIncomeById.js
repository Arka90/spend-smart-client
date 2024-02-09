import axios from "../../config/axios";

export default async function getIncomeById(id) {
  try {
    const { data } = await axios.get(`/income/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
