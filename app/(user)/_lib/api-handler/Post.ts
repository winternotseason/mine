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

export async function getPostsByCategory({
  queryKey,
}: {
  queryKey: [string, string, string];
}) {
  const [_1, _2, name] = queryKey;
  const posts = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/posts/category/${name}`,
    {
      next: {
        tags: ["posts", "category"],
      },
      cache: "no-store",
    }
  );
  return posts;
}

export async function getPostsByRegion({
  queryKey,
}: {
  queryKey: [string, string, string];
}) {
  const [_1, _2, city] = queryKey;
  const posts = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/posts/region/${city}`,
    {
      next: {
        tags: ["posts", "region"],
      },
      cache: "no-store",
    }
  );
  return posts;
}

export async function getPostsByQuery({
  queryKey,
}: {
  queryKey: [string, string, string];
}) {
  // ['posts', 'query', query]
  const [_1, _2, query] = queryKey;
  const posts = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/posts/query/${query}`,
    {
      next: {
        tags: ["posts", "query"],
      },
      cache: "no-store",
    }
  );
  return posts;
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
