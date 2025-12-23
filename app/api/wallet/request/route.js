import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import {connectDB} from "@/lib/db";
import WalletRequest from "@/models/WalletRequest";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();

    /* ---------------- COOKIES (FIXED) ---------------- */
    const cookieStore = await cookies(); // 🔥 MUST await
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id || decoded.userId || decoded._id;

if (!userId) {
  return NextResponse.json(
    { error: "Invalid token payload" },
    { status: 401 }
  );
}

const user = await User.findById(userId);
if (!user) {
  return NextResponse.json(
    { error: "User not found" },
    { status: 404 }
  );
}


    /* ---------------- FORM DATA ---------------- */
    const formData = await req.formData();

    const amount = Number(formData.get("amount"));
    const mobile = formData.get("mobile");
    const utr = formData.get("utr");
    const file = formData.get("screenshot");

    if (!file) {
      return NextResponse.json(
        { error: "Payment screenshot required" },
        { status: 400 }
      );
    }

    if (isNaN(amount) || amount < 10) {
      return NextResponse.json(
        { error: "Minimum recharge is ₹10" },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: "Invalid mobile number" },
        { status: 400 }
      );
    }

    if (!/^\d+$/.test(utr)) {
      return NextResponse.json(
        { error: "Invalid UTR number" },
        { status: 400 }
      );
    }

    /* ---------------- CLOUDINARY UPLOAD ---------------- */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "wallet_requests",
          resource_type: "image",
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    /* ---------------- SAVE WALLET REQUEST ---------------- */
    await WalletRequest.create({
      user: user._id,
      amount,
      mobile,
      utr,
      screenshot: uploadResult.secure_url,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      message: "Wallet request submitted successfully",
    });
  } catch (err) {
    console.error("Wallet Request Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
