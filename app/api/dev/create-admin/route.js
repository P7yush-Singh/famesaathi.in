import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, secret } = await req.json();

    if (secret !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json(
        { error: "Invalid secret" },
        { status: 403 }
      );
    }

    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    user.role = "admin";
    await user.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CREATE ADMIN ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}
