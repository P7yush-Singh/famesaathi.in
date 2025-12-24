import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import OrderForm from "./OrderForm";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function NewOrderPage() {
  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />
      <OrderForm />
      <MobileBottomNav />
    </div>
  );
}
