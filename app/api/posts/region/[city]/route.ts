import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { city: string } }
) {
  const { city } = params;
 // console.log(city)
  // city = 서울 중구
  const client = await connectDB();
  const db = client.db("mine");
  const collection = db.collection("posts");
  const posts = await collection
    .find({
      "address.address_name": { $regex: `^${city}` },
    })
    .toArray();
  // $regex => 정규식 패턴 ^ : ~로 시작해야함을 알린다.
  
  if (!posts) {
    return NextResponse.json({
      message: "해당하는 카테고리의 리뷰가 존재하지 않습니다.",
      status: 404,
    });
  }

  return NextResponse.json(posts);
}
