import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import WalletClient from "./wallet-client";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />
      <WalletClient />
    </div>
  );
}
