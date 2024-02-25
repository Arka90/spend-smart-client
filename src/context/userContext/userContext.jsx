import { createContext, useState } from "react";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  // const [streamChat, setStreamChat] = useState();
  // useEffect(() => {
  //   if (token == null || currentUser == null) return;
  //   const chat = new StreamChat("mvmyte5tn7pb");
  //   console.log(chat);
  //   if (chat.tokenManager.token === token && chat.userID === currentUser._id)
  //     return;

  //   const user = { id: currentUser._id, name: currentUser.username };

  //   let isInterrupted = false;
  //   const connectPromise = chat
  //     .connectUser(user, token)
  //     .then(() => {
  //       if (isInterrupted) return;

  //       setStreamChat(chat);

  //     })
  //     .catch((error) => console.log(error));

  //   return () => {
  //     isInterrupted = true;
  //     setStreamChat(undefined);

  //     connectPromise.then(() => {
  //       chat.disconnectUser();
  //     });
  //   };
  // }, [token, currentUser]);

  const value = { currentUser, setCurrentUser, token, setToken };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
