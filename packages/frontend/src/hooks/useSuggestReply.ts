import { useMutation } from "react-query";
import { suggestEmailReply } from "../services/api";

export function useSuggestReply() {
  return useMutation(
    async (id: string) => {
      console.log("🤖 useSuggestReply → Request:", id);
      const res = await suggestEmailReply(id);
      console.log("🤖 useSuggestReply → Response:", res);
      return res;
    },

    {
      onError: (err) => console.error("❌ useSuggestReply Error:", err)
    }
  );
}
