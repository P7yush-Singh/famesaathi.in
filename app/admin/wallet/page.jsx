import AdminNavbar from "@/components/admin/AdminNav";
import WalletRequests from "./wallet-requests";

export default function AdminWalletPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#020b18] to-[#04142b] text-white">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <WalletRequests />
      </div>
    </div>
  );
}
