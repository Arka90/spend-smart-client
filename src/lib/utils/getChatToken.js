export default function getChatToken() {
  const token = localStorage.getItem("chat_token");
  return token;
}
