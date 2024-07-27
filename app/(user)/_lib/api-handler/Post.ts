import { fetcher } from "@/lib/utils";

export async function getAllPosts({ pageParam }: { pageParam?: number }) {
  console.log("페이지파람", pageParam);
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/posts/${pageParam}`,
    {
      next: {
        // revalidateTage('posts') : cache 초기화
        tags: ["posts"],
      },
      cache: "no-store",
    }
  );

  return {
    posts: response.posts,
    nextCursor: parseInt(response.nextCursor),
  };
}

export async function getPost({ queryKey }: { queryKey: [string, string] }) {
  const [_, postid] = queryKey;
  const post = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/post/${postid}`,
    {
      next: {
        tags: ["posts"],
      },
      cache: "no-store",
    }
  );
  return post;
}
