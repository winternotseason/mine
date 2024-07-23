// api/user/:id 가 왔을때, id의 정보를 return

import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productid: string } }
) {
  const { productid } = params;
  // db에서 해당 id 유저 찾음
  const client = await connectDB();
  const db = client.db("mine");
  const collection = db.collection("products");
  const product = await collection.findOne({ _id: new ObjectId(productid) });

  if (!product) {
    return NextResponse.json({
      message: "해당 게시글이 존재하지 않습니다.",
      status: 404,
    });
  }
  console.log(product);
  return NextResponse.json(product);
}
