"use client";

export default function AdminDashboardClient({ stats }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Stat title="Users" value={stats.users} />
        <Stat title="Orders" value={stats.orders} />
        <Stat title="Pending" value={stats.pending} />
        <Stat title="Revenue" value={`₹${stats.revenue}`} highlight />
      </div>

      {/* EXPORT SECTION */}
      <div className="bg-[#0b2545] p-6 rounded-xl border border-white/10">
        <h2 className="font-semibold mb-4">Exports</h2>

        <div className="flex flex-wrap gap-3">
          <a
            href="/api/admin/export/orders"
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Orders CSV
          </a>

          <a
            href="/api/admin/export/wallet"
            className="bg-green-600 px-4 py-2 rounded"
          >
            Wallet CSV
          </a>

          <DateRangeExport />
        </div>
      </div>
    </>
  );
}

/* ---------- Components ---------- */

function Stat({ title, value, highlight }) {
  return (
    <div
      className={`p-4 rounded-xl border border-white/10 ${
        highlight ? "bg-green-600/20" : "bg-[#0b2545]"
      }`}
    >
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function DateRangeExport() {
  const exportRange = () => {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    if (!from || !to) {
      alert("Select date range");
      return;
    }

    window.location.href =
      `/api/admin/export/revenue-range?from=${from}&to=${to}`;
  };

  return (
    <div className="flex gap-2 items-end">
      <input id="from" type="date" className="input" />
      <input id="to" type="date" className="input" />
      <button
        onClick={exportRange}
        className="bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Export Revenue
      </button>
    </div>
  );
}
