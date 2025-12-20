export default function DashboardHeader() {
  return (
    <div
      className="rounded-2xl p-6
                 bg-linear-to-r from-blue-600 to-blue-500
                 shadow-[0_0_40px_rgba(59,130,246,0.45)]"
    >
      <h2 className="text-xl font-semibold">Welcome, User</h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white/20 rounded-xl p-4">
          <p className="text-sm opacity-80">Balance</p>
          <p className="text-2xl font-bold">₹0.00</p>
        </div>

        <div className="bg-white/20 rounded-xl p-4">
          <p className="text-sm opacity-80">Total Orders</p>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
