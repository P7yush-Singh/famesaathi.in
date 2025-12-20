import Navbar from "@/components/Navbar";
import AdminNav from "@/components/admin/AdminNav";
import AdminOrderRow from "@/components/admin/AdminOrderRow";

export default function AdminOrdersPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-linear-to-b
                       from-[#020b18] via-[#06162b] to-[#020b18]
                       text-white px-4 py-8">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

          <AdminNav />

          {/* Orders table stays same */}
        </div>
      </main>
    </>
  );
}
