import Navbar from "@/components/Navbar";
import AdminNav from "@/components/admin/AdminNav";
import PaymentRow from "@/components/admin/PaymentRow";

export default function AdminPaymentsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-linear-to-b
                       from-[#020b18] via-[#06162b] to-[#020b18]
                       text-white px-4 py-8">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-2xl font-bold mb-4">Wallet Payments</h1>

          <AdminNav />

          {/* Payments table stays same */}
        </div>
      </main>
    </>
  );
}
