import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#0b2545] border-r border-white/10 p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-2">
        <NavItem href="/admin" label="Dashboard" />
        <NavItem href="/admin/orders" label="Orders" />
        <NavItem href="/admin/payments" label="Wallet Requests" />
      </nav>
    </aside>
  );
}

function NavItem({ href, label }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 rounded-lg
                 hover:bg-white/10 transition"
    >
      {label}
    </Link>
  );
}
