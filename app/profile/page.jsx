import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "Profile - FameSaathi",
};

export default async function ProfilePage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/login");
  }

  await connectDB();
  const user = await User.findById(decoded.userId).lean();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-linear-to-b from-[#020b18] via-[#06162b] to-[#020b18] text-white">
      <DashboardNavbar />
      <ProfileClient
        user={{
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          walletBalance: user.walletBalance ?? 0,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
          role: user.role,
        }}
      />
    </div>
  );
}
