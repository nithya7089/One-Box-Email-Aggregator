// src/hooks/useEmails.ts
import { useQuery } from "react-query";
import { fetchGmailMessages } from "../services/api";

export function useEmails() {
  console.log("🪝 useEmails hook called");

  return useQuery(
    ["emails"],
    async () => {
      console.log("🪝 useEmails → queryFn running");
      const res = await fetchGmailMessages();
      console.log("🪝 useEmails → queryFn result:", res);
      return res;
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (err) => console.error("❌ useEmails Error:", err),
    }
  );
}
