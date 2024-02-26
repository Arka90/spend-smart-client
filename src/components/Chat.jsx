// import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat as ChatComponent,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import getUserId from "../lib/utils/getUserId";
import getUserName from "../lib/utils/getUsername";
import getChatToken from "../lib/utils/getChatToken";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const Chat = () => {
  const client = new StreamChat("xc8uzz5rmcs5");

  const navigate = useNavigate();

  client.connectUser(
    {
      id: getUserId(),
      name: getUserName(),
    },
    getChatToken()
  );

  if (!client) return null;

  return (
    <ChatComponent client={client}>
      <Box sx={{ display: "flex" }}>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          gap="40px"
          width="90%"
          margin="0 auto"
        >
          <Button
            onClick={() => navigate("/create-channel")}
            variant="contained"
          >
            Create Channel
          </Button>

          <ChannelList filters={filters} sort={sort} options={options} />
        </Box>
        <Box flex={4}>
          <Channel>
            <Box height="95vh" width="100%">
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
            </Box>

            <Thread />
          </Channel>
        </Box>
      </Box>
    </ChatComponent>
  );
};

export default Chat;
