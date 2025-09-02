import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/utils";

export function usePostMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMessage: {
      name: string;
      category: string;
      message: string;
    }) => {
      const { data, error } = await supabaseServer
        .from("messages")
        .insert([
          {
            ...newMessage,
            reactions: {},
            likes: 0,
            timestamp: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      // biar list messages auto refresh
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}