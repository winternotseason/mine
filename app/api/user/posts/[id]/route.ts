// api/user/posts/:id 가 왔을때, 게시글들 return

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
  const collection = db.collection("posts");
  const posts = await collection.find({ writer: id }).toArray();

  if (!posts) {
    return NextResponse.json({
      message: "작성한 글이 존재하지 않습니다.",
      status: 404,
    });
  }
  console.log(posts);
  return NextResponse.json(posts);
}
