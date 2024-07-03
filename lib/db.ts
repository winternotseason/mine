import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let mongoDB: MongoClient | null = null;
let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

/* export async function connectDB() {
  const url = `mongodb+srv://xitseo:ajvls450@universe.bpzvwux.mongodb.net/?retryWrites=true&w=majority&appName=universe`;

  if (!mongoDB) {
    mongoDB = new MongoClient(url);
    try {
      await mongoDB.connect();
      console.log("데이터베이스 연결에 성공했습니다.");
    } catch (error) {
      console.log("데이터베이스 연결 중 오류가 발생했습니다.", error);
      mongoDB = null;
      throw error;
    }
  }
  return mongoDB;
} */
