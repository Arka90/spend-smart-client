import axios from "../../config/axios";

export default async function getAllExpenses() {
  try {
    const { data } = await axios.get("/expenses");
    return data;
  } catch (error) {
    console.log(error);
  }
}
