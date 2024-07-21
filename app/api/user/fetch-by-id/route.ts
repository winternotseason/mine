import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

export async function POST(req: Request) {
  const client = await connectDB();
  const { id } = await req.json();
  const db = client.db("mine");
  const collection = db.collection("users");
  const foundUser = await collection.findOne({ id });
  if (foundUser) {
    const User = {
      id: foundUser.id,
      name: foundUser.name,
      selectedAvatar: foundUser.selectedAvatar,
    };
    return NextResponse.json(User);
  } else {
    return NextResponse.json(null);
  }
}
