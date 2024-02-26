export default function removeUserToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("chat_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_name");
}
