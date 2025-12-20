import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#071b33]/80 border-b border-white/10">
      <div className="flex items-center justify-between px-5 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link href='/' className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="FameSaathi Logo"
            width={160}
            height={50}
            priority
          />
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-full text-sm font-semibold 
                       bg-white/10 hover:bg-white/20 
                       transition backdrop-blur text-white"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2 rounded-full text-sm font-semibold 
                       bg-linear-to-r from-blue-500 to-blue-600
                       shadow-[0_0_18px_rgba(59,130,246,0.45)]
                       hover:scale-105 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
