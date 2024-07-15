import clientPromise from "./db";

export const getPosts = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("mine");
    const collection = db.collection("posts");
    const posts = await collection.find({},{}).toArray()
    return posts
  } catch (err){
    console.error('글 목록 불러오기 오류')
  }
};
