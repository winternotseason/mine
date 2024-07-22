export async function getAllProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/post`, {
      next: {
        // revalidateTage('posts') : cache 초기화
        tags: ["posts"],
      },
      cache: "no-store",
    });
    const data = await res.json()
    
    return data
  }
  