"use client";

import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="h-14 bg-[#020b18] border-b border-white/10
                       flex items-center justify-between px-6">
      <span className="text-sm text-gray-400">
        Admin Dashboard
      </span>

      <button
        onClick={logout}
        className="text-sm bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg"
      >
        Logout
      </button>
    </header>
  );
}
