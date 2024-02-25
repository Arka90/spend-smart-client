export default function getUserId() {
  const userId = localStorage.getItem("user_id");
  return userId;
}
