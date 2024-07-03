import clientPromise from "@/lib/db";
import { hashUserPassword } from "@/lib/hash";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // {id : 'xitseo', name : '황서연', password: 'ajvls450@"}
    const { id, name, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("mine");

    const user = await db.collection("users").countDocuments({ id });

    // 이미 같은 이메일의 유저가 존재하면?
    if (user > 0) {
      return NextResponse.json({
        status: 500,
        message: "이미 존재하는 아이디입니다.",
      });
    }
    // 아이디가 존재하지 않으면 비밀번호 해시화해서 mine => users 컬렉션에 저장
    const hashedPassword = await hashUserPassword(password);
    await db.collection("users").insertOne({
      id,
      password: hashedPassword,
      name,
    });
    // 성공하면 actions/users.ts의 회원가입 함수로
    return NextResponse.json({ message: "회원 등록", status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "회원가입 오류",
      status: 500,
    });
  }
}
