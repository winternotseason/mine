// api/user/:id 가 왔을때, id의 정보를 return

import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  
  const { id } = params;
  // db에서 해당 id 유저 찾음
  const client = await connectDB();
  const db = client.db("mine");
  const collection = db.collection("users");
  const user = await collection.findOne({ id });
  if (!user) {
    return NextResponse.json({
      message: "해당 유저가 존재하지 않습니다.",
      status: 404,
    });
  }
  console.log(user)
  return NextResponse.json(user);
}
