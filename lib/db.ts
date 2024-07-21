import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!uri) {
    console.error("MONGODB URI가 존재하지 않습니다.");
  }

  try {
    const client = new MongoClient(uri);
    return client.connect();
  } catch (error) {
    console.error("MONGODB 연결에 실패하였습니다.");
  }
};

export default connectDB;
