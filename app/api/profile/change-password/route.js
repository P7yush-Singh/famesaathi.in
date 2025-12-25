import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  const { oldPassword, newPassword } = await req.json();
  const token = (await cookies()).get("token")?.value;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  await connectDB();

  const user = await User.findById(decoded.userId);
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return Response.json({ error: "Wrong password" }, { status: 401 });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return Response.json({ success: true });
}
