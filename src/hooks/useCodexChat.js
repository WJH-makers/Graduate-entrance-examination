import { useCallback, useRef, useState } from "react";
import { chatCodex } from "../services/codexClient";

/**
 * Simple chat hook with cancel guard (no streaming for now)
 */
export const useCodexChat = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cancelRef = useRef(false);

  const send = useCallback(
    async ({ content, mode = "optimize" }) => {
      setLoading(true);
      setError("");
      cancelRef.current = false;
      const nextMessages = [...messages, { role: "user", content }];
      setMessages(nextMessages);
      try {
        const reply = await chatCodex({
          messages: nextMessages,
          mode
        });
        if (cancelRef.current) return null;
        const updated = [...nextMessages, { role: "assistant", content: reply }];
        setMessages(updated);
        return reply;
      } catch (err) {
        if (!cancelRef.current) {
          setError(err.message || "请求失败");
        }
        return null;
      } finally {
        if (!cancelRef.current) {
          setLoading(false);
        }
      }
    },
    [messages]
  );

  const cancel = useCallback(() => {
    cancelRef.current = true;
    setLoading(false);
  }, []);

  return { messages, send, loading, error, cancel };
};
