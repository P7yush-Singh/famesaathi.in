import Navbar from "@/components/Navbar";
import AdvancedOrderForm from "@/components/orders/AdvancedOrderForm";

export default function NewOrderPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-b
                       from-[#020b18] via-[#06162b] to-[#020b18]
                       text-white px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <AdvancedOrderForm />
        </div>
      </main>
    </>
  );
}
