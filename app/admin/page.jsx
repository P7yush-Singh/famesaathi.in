import Navbar from "@/components/Navbar";
import AdminNav from "@/components/admin/AdminNav";
import AdminStatCard from "@/components/admin/AdminStatCard";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-linear-to-b
                       from-[#020b18] via-[#06162b] to-[#020b18]
                       text-white px-4 py-8">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

          <AdminNav />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AdminStatCard title="Pending Payments" value="2" />
            <AdminStatCard title="Pending Orders" value="5" />
            <AdminStatCard title="Completed Orders" value="120" />
            <AdminStatCard title="Total Users" value="18" />
          </div>

        </div>
      </main>
    </>
  );
}
