// api/posts/query/${query}

import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { query: string } }
) {
  let { query } = params;

  const client = await connectDB();
  const db = client.db("mine");
  const collection = db.collection("posts");

  // address.place_namd에 query 문자열이 포함되는 posts들 조회

  const posts = await collection
    .find({ "address.place_name": { $regex: query, $options: "i" } })
    .toArray();

  return NextResponse.json(posts);
}
