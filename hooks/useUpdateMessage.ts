"use client";

import { supabaseServer } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMessages() {
  const queryClient = useQueryClient();

  // ✅ Update likes
  const likeMutation = useMutation({
    mutationFn: async (messageId: number) => {
      const { data: current, error: fetchError } = await supabaseServer
        .from("messages")
        .select("likes")
        .eq("id", messageId)
        .single();

      if (fetchError) throw fetchError;

      const { data, error } = await supabaseServer
        .from("messages")
        .update({ likes: (current.likes || 0) + 1 })
        .eq("id", messageId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(["messages"], (old: any) =>
        old?.map((m: any) => (m.id === updated.id ? updated : m))
      );
    },
  });

  // ✅ Update reactions
  const reactionMutation = useMutation({
    mutationFn: async ({
      messageId,
      emoji,
      reactions,
    }: {
      messageId: number;
      emoji: string;
      reactions: Record<string, number>;
    }) => {
      const updatedReactions = {
        ...reactions,
        [emoji]: (reactions?.[emoji] || 0) + 1,
      };

      const { data, error } = await supabaseServer
        .from("messages")
        .update({ reactions: updatedReactions })
        .eq("id", messageId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["messages"], (old: any) =>
        old ? old.map((m: any) => (m.id === data.id ? data : m)) : [data]
      );
    },
  });

  return {
    likeMessage: likeMutation.mutate,
    reactMessage: reactionMutation.mutate,
    isLiking: likeMutation.isPending,
    isReacting: reactionMutation.isPending,
  };
}
