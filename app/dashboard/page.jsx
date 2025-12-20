import Navbar from "@/components/Navbar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickActions from "@/components/dashboard/QuickActions";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main
        className="min-h-screen bg-linear-to-b
                   from-[#020b18] via-[#06162b] to-[#020b18]
                   text-white px-4 py-6"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <DashboardHeader />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Pending Orders" value="0" />
            <StatCard title="Completed Orders" value="0" />
            <StatCard title="Total Spent" value="₹0" />
            <StatCard title="Active Services" value="0" />
          </div>

          <QuickActions />
        </div>
      </main>
    </>
  );
}
