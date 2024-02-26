import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import getAllUsers from "../lib/chats/getAllUsers";
import getUserId from "../lib/utils/getUserId";
import createChannel from "../lib/chats/createChannel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const CreateChannelForm = () => {
  const [channelName, setChannelName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      const data = await getAllUsers();

      const suggestionArrayWithCurrentUser = data.users.map((user) => ({
        id: user.id,
        text: user.name || "Admin",
      }));

      const suggestionArray = suggestionArrayWithCurrentUser.filter(
        (item) => item.id != getUserId()
      );

      setSuggestions(suggestionArray);
    })();
  }, []);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  async function handelSubmit() {
    if (!channelName || tags.length == 0) return;

    const members = tags.map((item) => item.id);
    members.push(getUserId());
    const channelCreated = await createChannel({
      name: channelName,
      members,
    });

    navigate("/chats");
    setChannelName("");
    setTags([]);
    toast(channelCreated.message);
  }

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <TextField
        id="outlined-controlled"
        label="Channel Name"
        fullWidth
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="bottom"
        autocomplete
      />

      <Button onClick={handelSubmit} variant="contained">
        Create Channel
      </Button>
    </Box>
  );
};

export default CreateChannelForm;
