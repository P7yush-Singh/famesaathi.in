import Navbar from "@/components/Navbar";
import AuthSplitCard from "@/components/AuthSplitCard";

export const metadata = {
  title: "FameSaathi - Login",
  description: "Login to access your FameSaathi account and manage your orders seamlessly.",
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen flex items-center justify-center
                   bg-gradient-to-br from-[#020b18] via-[#06162b] to-[#020b18]
                   px-4"
      >
        <AuthSplitCard mode="login" />
      </main>
    </>
  );
}
