import { fetcher } from "../utils";

export const fetchUserById = async (id: string) => {
  // session의 user.id 들어오면, DB에서 해당 id에 맞는 유저 정보 반환
  try {
    const user = await fetcher(
      `${process.env.NEXT_PUBLIC_URL}/api/user/fetch-by-id`,
      {
        method: "POST",
        body: JSON.stringify({ id }),
      }
    );
    // console.log({user})

    if (user) return user;

    return null;
  } catch {
    return null;
  }
};
