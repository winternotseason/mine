import { uploadImage } from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { IPost } from "@/app/(user)/_lib/type";


export async function GET() {
  const client = await connectDB();
  const db = client.db("mine");
  const posts = await db
    .collection("posts")
    .find({})
    .sort({ _id: -1 })
    .toArray();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  // form data가 들어옴
  const data = await req.formData();
  const title = data.get("title") as string;
  const menu = data.get("menu") as string;
  const content = data.get("content") as string;
  const image = data.get("image") as File;
  const writer = data.get("writer") as string;
  const address = JSON.parse(data.get("address") as string); // JSON 문자열을 객체로 변환
  const rating = parseFloat(data.get("rating") as string);
  console.log(address.catr);
  let imageUri: string | undefined;
  try {
    // cloudinary에 이미지 업로드
    imageUri = await uploadImage(image);
  } catch (error) {
    console.error("이미지 업로드 오류", error);
  }
  // DB
  try {
    const client = await connectDB();
    const db = client.db("mine");

    // categories 컬렉션에 같은 문자열이 존재?
    const existingCategory = await db
      .collection("categories")
      .findOne({ category: address.category });
    // 중복되지 않는 경우에만 카테고리 추가 ex) 한식
    if (!existingCategory) {
      await db
        .collection("categories")
        .insertOne({ category: address.category });
    }
    const insertData: IPost = {
      title,
      menu,
      content,
      imageUri,
      writer,
      address,
      rating,
      createAt: new Date(),
    };
    console.log(insertData);
    await db.collection<IPost>("posts").insertOne(insertData);
    return NextResponse.json(insertData);
  } catch (error) {
    console.error(error);
  }
}
