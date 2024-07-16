import { ObjectId } from "mongodb";
import clientPromise from "./db";


export const getPosts = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("mine");
    const collection = db.collection("posts");
    const posts = await collection.find({}, {}).toArray();
    return posts;
  } catch (err) {
    console.log("글 목록 불러오기 오류");
  }
};

export const detailPost = async (postid: string) => {
  try {
    const client = await clientPromise;
    const db = client.db("mine");
    const collection = db.collection("posts");
    const objid = new ObjectId(postid);
    const post = await collection.findOne({ _id: objid });

    return post;
  } catch {
    console.log("글 불러오기 오류");
  }
};
