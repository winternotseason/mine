import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full p-4 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="font-bold text-6xl">MINE</h1>
          <p className="font-semibold">중고거래플랫폼</p>
        </div>
        <div className="w-72 flex flex-col items-center mt-10">
          <Link
            href="/join"
            className="w-full flex justify-center items-center bg-black text-white p-4 mb-2"
          >
            시작하기
          </Link>
          <div className="flex">
            <p>이미 계정이 있나요?</p>
            <Link href="/login" className="ml-2 font-semibold">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
