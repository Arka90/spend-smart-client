export default function getUserName() {
  const username = localStorage.getItem("user_name");
  return username;
}
