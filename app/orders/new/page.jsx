import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import OrderForm from "./OrderForm";

export default function NewOrderPage() {
  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />
      <OrderForm />
    </div>
  );
}
