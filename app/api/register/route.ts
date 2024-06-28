import { connectDB } from "@/lib/db";
import { hashUserPassword } from "@/lib/hash";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {id, name, password} = await req.json();

    const client = await connectDB();
    const db = client.db("mine");

    const user = await db.collection("users").countDocuments({ id });

    // 이미 같은 이메일의 유저가 존재하면?
    if (user > 0) {
      return NextResponse.json({
        status: 500,
        message: "이미 존재하는 아이디입니다.",
      });
    }
    const hashedPassword = await hashUserPassword(password);
    await db.collection("users").insertOne({
      id,
      password: hashedPassword,
      name,
    });
    console.log("성공?");
    return NextResponse.json({ message: "회원 등록", status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "회원가입 오류",
      status: 500,
    });
  }
}
