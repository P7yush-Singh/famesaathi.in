import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import WalletRequest from "@/models/WalletRequest";
import User from "@/models/User";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const amount = Number(formData.get("amount"));
    const mobile = formData.get("mobile");
    const utr = formData.get("utr");
    const file = formData.get("screenshot");

    if (!amount || amount < 10) {
      return NextResponse.json({ error: "Minimum ₹10 required" }, { status: 400 });
    }

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
    }

    if (!utr || !/^\d+$/.test(utr)) {
      return NextResponse.json({ error: "Invalid UTR" }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: "Screenshot required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "wallet_requests" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    await WalletRequest.create({
      userId: user._id,
      amount,
      mobile,
      utr,
      screenshot: upload.secure_url,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Wallet Request Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
