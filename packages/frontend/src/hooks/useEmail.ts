// src/hooks/useEmail.ts
import { useQuery } from "react-query";
import { fetchGmailMessageById } from "../services/api";

export function useEmail(id: string) {
  console.log("🪝 useEmail hook called with id:", id);

  return useQuery(
    ["gmailEmail", id],
    async () => {
      console.log("🪝 useEmail → queryFn running for id:", id);
      const res = await fetchGmailMessageById(id);
      console.log("🪝 useEmail → queryFn result:", res);
      return res;
    },
    {
      enabled: !!id,
      retry: 1,
      refetchOnWindowFocus: false,
      onError: (err) => console.error("❌ useEmail Error:", err),
    }
  );
}
