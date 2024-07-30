
export async function getRegion() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/region`, {
    cache: "no-store",
  });
  const result = await res.json();
  return result;
}
