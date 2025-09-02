import { supabaseServer } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

async function fetchMessages() {
  const { data, error } = await supabaseServer.from("messages").select("*").order("timestamp", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });
}
