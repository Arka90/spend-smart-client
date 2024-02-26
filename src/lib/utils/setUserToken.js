export default function setUserToken(token, chatToken, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("chat_token", chatToken);
  localStorage.setItem("user_id", user._id);
  localStorage.setItem("user_name", user.username);
}
