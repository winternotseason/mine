import { uploadImage } from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { City, IPost, Region } from "@/app/(user)/_lib/type";

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
    // 중복되지 않는 경우에만 카테고리 추가 ex) category:'한식', count:1
    if (existingCategory) {
      // 이미 있는 카테고리는 count를 1 올림
      await db
        .collection("categories")
        .updateOne({ category: address.category }, { $inc: { count: 1 } });
    } else {
      // 중복되지 않는 경우에만 카테고리 추가
      await db
        .collection("categories")
        .insertOne({ category: address.category, count: 1 });
    }

    const region_arr: string[] = address.address_name.split(" ");
    const state = region_arr[0]; // 서울
    const district = region_arr[1]; // 중구

    // state가 '서울'인 객체의 존재 여부
    const existingState = await db.collection("region").findOne({ state });
    // existingState = { state : '서울' , cites : [{city:'중구', count: 1}, {city: '강남구', count:2}]}
    if (existingState) {
      // '서울'이 있다면
      // '중구'의 존재 여부
      const existingCity = existingState.cites.find(
        (city: City) => city.cityname === district
      );
      if (existingCity) {
        // 만약 '중구' 가 존재한다면, '중구' count를 1 올림
        await db.collection("region").updateOne(
          { state, "cites.cityname": district }, // cites.city : 중구인 객체를 업데이트
          { $inc: { "cites.$.count": 1 } } // count 1 올림
        );
      } else {
        // '서울'은 있는데 '중구'는 없을 때
        await db.collection<Region>("region").updateOne(
          { state }, // state가 '서울'인
          { $push: { cites: { cityname: district, count: 1 } } }
        );
      }
    } else {
      // '서울'이 없을때
      await db.collection<Region>("region").insertOne({
        state,
        cites: [{ cityname: district, count: 1 }],
      });
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

    await db.collection<IPost>("posts").insertOne(insertData);
    return NextResponse.json(insertData);
  } catch (error) {
    console.error(error);
  }
}
