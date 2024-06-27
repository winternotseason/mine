import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const input = await req.json();
  // encoding된 input value
  const res = await fetch(
    `https://openapi.naver.com/v1/search/shop.json?query=${input}&display=10`,
    {
      headers: {
        "X-Naver-Client-Id": `${process.env.NAVER_CLIENT_ID}`,
        "X-Naver-Client-Secret": `${process.env.NAVER_CLIENT_SECRET}`,
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}

