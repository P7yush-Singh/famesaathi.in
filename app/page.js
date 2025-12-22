import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = (await cookies()).get("token")?.value;
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    await connectDB();
    const user = await User.findById(decoded.userId).lean();
    if(decoded.role === 'admin') redirect("/admin")
    if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-linear-to-b from-[#020b18] via-[#06162b] to-[#020b18] text-white">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
