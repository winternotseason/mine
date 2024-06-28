import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";

const url = `mongodb+srv://xitseo:${process.env.MONGODB_PASSWORD}@universe.bpzvwux.mongodb.net/?retryWrites=true&w=majority&appName=universe`;

export const client = new MongoClient(url);

client
  .connect()
  .then(() => {
    const db = client.db("mine");
    const User = db.collection("users") as Collection<UserDoc>;
    const Session = db.collection("sessions") as Collection<SessionDoc>;

    const adapter = new MongodbAdapter(Session, User);

    const lucia = new Lucia(adapter, {
      sessionCookie: {
        expires: false,
        attributes: {
          secure: process.env.NODE_ENV === "production",
        },
      },
    });

    return lucia;
  })
  .then((luciaInstance) => {
    console.log("Lucia setup complete:", luciaInstance);
  })
  .catch((error) => {
    console.error("Error setting up Lucia:", error);
  });

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
  }
}

interface UserDoc {
  _id: string;
}

interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}
