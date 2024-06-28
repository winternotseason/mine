import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

const url = `mongodb+srv://xitseo:${process.env.MONGODB_PASSWORD}@universe.bpzvwux.mongodb.net/?retryWrites=true&w=majority&appName=universe`;

let luciaInstance: Lucia | null = null;

export const client = new MongoClient(url);

client
  .connect()
  .then(() => {
    const db = client.db("mine");
    const User = db.collection("users") as Collection<UserDoc>;
    const Session = db.collection("sessions") as Collection<SessionDoc>;

    const adapter = new MongodbAdapter(Session, User);

    luciaInstance = new Lucia(adapter, {
      sessionCookie: {
        expires: false,
        attributes: {
          secure: process.env.NODE_ENV === "production",
        },
      },
    });

    console.log("Lucia 설정 완료:", luciaInstance);
  })
  .catch((error) => {
    console.error("Lucia 설정 중 오류 발생:", error);
  });

export function getLuciaInstance(): Lucia | null {
  return luciaInstance;
}

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

export async function createAuthSession(userData: any) {
  const lucia = getLuciaInstance();

  const session = await lucia.createSession(userData._id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  const lucia = getLuciaInstance();
  if (lucia === null || lucia.sessionCookieName === null) {
    return;
  }
  console.log(lucia.sessionCookieName);
  const sessionCookie = cookies().get(lucia.sessionCookieName);
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value; // fdox3cwmxlnnt6xjanwyf472rgpaqupq2b7sziri

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  console.log("세션:", result);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
}
export async function destroySession() {
  const lucia = getLuciaInstance();
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: "Unauthorized!",
    };
  }
  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
