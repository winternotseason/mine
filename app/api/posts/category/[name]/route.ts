import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  let { name } = params;

  const client = await connectDB();
  const db = client.db("mine");
  const collection = db.collection("posts");
  const posts = await collection.find({ "address.category": name }).toArray();
  // posts 컬렉션의 address key의 객체안의 key에 category가 name인 배열 출력
  if (!posts) {
    return NextResponse.json({
      message: "해당하는 카테고리의 리뷰가 존재하지 않습니다.",
      status: 404,
    });
  }

  return NextResponse.json(posts );
}
