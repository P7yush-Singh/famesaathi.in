import Navbar from "@/components/Navbar";
import OrderRow from "@/components/orders/OrderRow";

const MOCK_ORDERS = [
  {
    id: "ORD001",
    service: "Instagram Reel Views",
    link: "https://instagram.com/reel/abc",
    quantity: 5000,
    price: 195,
    status: "pending",
    date: "2025-01-10",
  },
  {
    id: "ORD002",
    service: "Instagram Story Views",
    link: "https://instagram.com/stories/xyz",
    quantity: 3000,
    price: 75,
    status: "completed",
    date: "2025-01-08",
  },
  {
    id: "ORD003",
    service: "Instagram Post Views",
    link: "https://instagram.com/p/123",
    quantity: 10000,
    price: 200,
    status: "cancelled",
    date: "2025-01-05",
  },
];

export default function OrdersPage() {
  return (
    <>
      <Navbar />

      <main
        className="min-h-screen bg-linear-to-b
                   from-[#020b18] via-[#06162b] to-[#020b18]
                   text-white px-4 py-8"
      >
        <div className="max-w-6xl mx-auto">

          <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

          <div className="overflow-x-auto rounded-2xl
                          bg-[#0b2545] border border-white/10">
            <table className="w-full border-collapse">
              <thead className="bg-[#102a4d] text-sm text-gray-300">
                <tr>
                  <th className="text-left py-3 px-3">Order ID</th>
                  <th className="text-left py-3 px-3">Service</th>
                  <th className="text-left py-3 px-3">Link</th>
                  <th className="text-left py-3 px-3">Quantity</th>
                  <th className="text-left py-3 px-3">Price</th>
                  <th className="text-left py-3 px-3">Status</th>
                  <th className="text-left py-3 px-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {MOCK_ORDERS.length > 0 ? (
                  MOCK_ORDERS.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-400"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </>
  );
}
