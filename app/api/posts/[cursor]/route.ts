import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cursor: string } }
) {
  let { cursor } = params;
  const limit = 10;
  const skip = parseInt(cursor) || 0;

  const client = await connectDB();
  const db = client.db("mine");
  const collection = db.collection("posts");

  const posts = await collection
    .find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit + 1)
    .toArray();

  const hasNextPage = posts.length > limit;

  const results = hasNextPage ? posts.slice(0, limit) : posts;

  const nextCursor = hasNextPage ? skip + limit : null;

  if (results.length === 0) {
    return NextResponse.json({
      message: "해당 게시글이 존재하지 않습니다.",
      status: 404,
    });
  }

  return NextResponse.json({ posts: results, nextCursor });
}
