import AdminNavbar from "@/components/admin/AdminNav";
import WalletRequests from "./wallet-requests";

export default function AdminWalletPage() {
  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <AdminNavbar />
      <WalletRequests />
    </div>
  );
}
