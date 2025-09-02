// app/api/messages/[id]/route.ts
import { supabaseServer } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { likes, reactions } = body;

  const { data, error } = await supabaseServer
    .from("messages")
    .update({
      ...(likes !== undefined && { likes }),
      ...(reactions !== undefined && { reactions }),
    })
    .eq("id", params.id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data[0]);
}
