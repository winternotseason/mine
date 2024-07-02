import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = await req.json();

  const { inputValue, start, display } = request;

  const res = await fetch(
    `https://openapi.naver.com/v1/search/shop.json?query=${inputValue}&display=${display}&start=${start}`,
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
