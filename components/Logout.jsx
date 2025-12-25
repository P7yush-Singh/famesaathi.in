"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/"); // ✅ redirect to landing page
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 px-3 py-1 cursor-pointer hover:bg-red-700 rounded text-xs sm:text-sm"
    >
      Logout
    </button>
  );
}
