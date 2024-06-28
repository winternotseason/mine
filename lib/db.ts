import { MongoClient } from "mongodb";

export async function connectDB() {
  const url = `mongodb+srv://xitseo:ajvls450@universe.bpzvwux.mongodb.net/?retryWrites=true&w=majority&appName=universe`;
  const mongoDB = new MongoClient(url);
  try {
    await mongoDB.connect();
    console.log("데이터베이스 연결에 성공했습니다.");
    return mongoDB;
  } catch (error) {
    console.log("데이터베이스 연결 중 오류가 발생했습니다.");
  }
}
