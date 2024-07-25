// api/user/:id 가 왔을때, id의 정보를 return

import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { postid: string } }
) {
  const { postid } = params;

  const client = await connectDB();
  const db = client.db("mine");
  const collection = db.collection("posts");
  const post = await collection.findOne({ _id: new ObjectId(postid) });

  if (!post) {
    return NextResponse.json({
      message: "해당 게시글이 존재하지 않습니다.",
      status: 404,
    });
  }

  return NextResponse.json(post);
}
