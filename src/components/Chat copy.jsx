import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import getChatToken from "../lib/utils/getChatToken";

import getUserId from "../lib/utils/getUserId";
import getUserName from "../lib/utils/getUsername";

import {
  LoadingIndicator,
  Chat as ChatComponent,
  ChannelList,
  Channel,
  Window,
  MessageInput,
  MessageList,
  ChannelHeader,
} from "stream-chat-react";
import Loader from "./Loader";

const Chat = () => {
  const chat = new StreamChat("mvmyte5tn7pb");
  const [chatClient, setChatClient] = useState(null);
  useEffect(() => {
    async function connectUserToStream() {
      try {
        const user = { id: getUserId(), name: getUserName() };
        const resp = await chat.connectUser(user, getChatToken());
        setChatClient(resp);
      } catch (error) {
        console.log(error);
      }
    }

    connectUserToStream();

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chatClient) return <Loader />;

  console.log(chatClient);

  return (
    <ChatComponent client={chatClient}>
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </ChatComponent>
  );
};

export default Chat;
