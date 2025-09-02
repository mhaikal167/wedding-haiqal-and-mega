import { supabaseServer } from "@/lib/utils";
import { NextResponse } from "next/server";

// GET semua ucapan
export async function GET() {
  const { data, error } = await supabaseServer
    .from("messages")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST tambah ucapan
export async function POST(req: Request) {
  const body = await req.json();
  const { name, category, message } = body;

  const { data, error } = await supabaseServer
    .from("messages")
    .insert([
      {
        name,
        category,
        message,
        reactions: {},
        likes: 0,
        timestamp: new Date(),
      },
    ])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data[0]);
}