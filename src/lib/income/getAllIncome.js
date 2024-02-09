import axios from "../../config/axios";

export default async function getAllIncome() {
  try {
    const { data } = await axios.get("/income");
    return data;
  } catch (error) {
    console.log(error);
  }
}
