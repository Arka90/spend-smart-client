export default function getUserToken() {
  const token = localStorage.getItem("token");
  return token;
}
