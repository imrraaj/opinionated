import { sign } from "jsonwebtoken";

const SECRET_KEY: string = process.env.SECRET_KEY!;

export async function signToken(payload) {
    const token = await sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn: "2h" });
    return token;
}