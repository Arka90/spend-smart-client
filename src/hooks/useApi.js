import { useState } from "react";

export default function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function startLoading() {
    setIsLoading(true);
  }
  function stopLoading() {
    setIsLoading(false);
  }

  function setSuccess() {
    setStatus("success");
    setStatus("idle");
  }
  function setError() {
    setStatus("error");
    setStatus("idle");
  }

  function setResponseMessage(message) {
    setMessage(message);
  }

  return {
    isLoading,
    status,
    message,
    startLoading,
    stopLoading,
    setSuccess,
    setError,
    setResponseMessage,
  };
}
