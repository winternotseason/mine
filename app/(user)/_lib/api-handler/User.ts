import { fetcher } from "@/lib/utils";

export async function getUserPosts({
  queryKey,
}: {
  queryKey: [string, string, string];
}) {
  const [_1, _2, userid] = queryKey;
  const posts = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/user/posts/${userid}`,
    {
      next: {
        tags: ["posts", "users"],
      },
      cache: "no-store",
    }
  );
  return posts;
}

export async function getUser({ queryKey }: { queryKey: [string, string] }) {
  const [_, userid] = queryKey;
  const user = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/user/${userid}`,
    {
      next: {
        tags: ["users"],
      },
      cache: "no-store",
    }
  );
  return user;
}
