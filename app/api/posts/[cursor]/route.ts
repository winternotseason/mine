import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cursor: string } }
) {
  let { cursor } = params;
  // 여기서 커서가 numbers임
  // 기본값 설정
  const limit = 10;
  // 정수로 변환
  const skip = parseInt(cursor) || 0;

  // DB 연결
  const client = await connectDB();
  const db = client.db("mine");
  const collection = db.collection("posts");
  console.log(skip);
  // 데이터 가져오기
  const posts = await collection
    .find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
  console.log("프로덕트", posts);
  // 결과가 없을 경우 404 반환
  if (posts.length === 0) {
    return NextResponse.json({
      message: "해당 게시글이 존재하지 않습니다.",
      status: 404,
    });
  }

  // 다음 페이지의 cursor를 계산
  // limit이 5고 skip 이 0인데 왜 nextCursor가 10임?
  const nextCursor = posts.length < limit ? null : skip + limit;
  console.log('넥스트커서',skip,limit,nextCursor)

  return NextResponse.json({ posts, nextCursor });
}
