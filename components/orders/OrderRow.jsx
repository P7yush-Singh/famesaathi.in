import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderRow({ order }) {
  return (
    <tr className="border-b border-white/5 text-sm">
      <td className="py-3 px-3">{order.id}</td>
      <td className="py-3 px-3">{order.service}</td>
      <td className="py-3 px-3 truncate max-w-45">
        <a
          href={order.link}
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          {order.link}
        </a>
      </td>
      <td className="py-3 px-3">{order.quantity}</td>
      <td className="py-3 px-3">₹{order.price}</td>
      <td className="py-3 px-3">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="py-3 px-3 text-gray-400">{order.date}</td>
    </tr>
  );
}
