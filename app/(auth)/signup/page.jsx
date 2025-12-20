import Navbar from "@/components/Navbar";
import AuthSplitCard from "@/components/AuthSplitCard";

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen flex items-center justify-center
                   bg-linear-to-br from-[#020b18] via-[#06162b] to-[#020b18]
                   px-4"
      >
        <AuthSplitCard mode="signup" />
      </main>
    </>
  );
}
