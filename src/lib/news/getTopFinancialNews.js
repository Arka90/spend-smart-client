import axios from "../../config/axios";

export default async function getTopFinancialNews() {
  const { data } = await axios.get(`/news`);
  return data;
}
