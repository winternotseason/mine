import bcrypt from "bcryptjs";

export async function hashUserPassword(password: string): Promise<string> {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error("해싱 오류", err);
    throw err;
  }
}

export async function verifyPassword(
  storedPassword: string,
  suppliedPassword: string
) {
  try {
    const isMatch = await bcrypt.compare(suppliedPassword, storedPassword);
    return isMatch;
  } catch (err) {
    console.error("비밀번호 검증 오류", err);
    throw err;
  }
}