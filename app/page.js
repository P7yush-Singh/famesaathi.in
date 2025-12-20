import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#020b18] via-[#06162b] to-[#020b18] text-white">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
