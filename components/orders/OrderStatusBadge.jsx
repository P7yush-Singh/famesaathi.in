export default function OrderStatusBadge({ status }) {
  const base =
    "px-3 py-1 rounded-full text-xs font-semibold inline-block";

  const styles = {
    pending: "bg-yellow-500/20 text-yellow-400",
    completed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  return (
    <span className={`${base} ${styles[status] || ""}`}>
      {status.toUpperCase()}
    </span>
  );
}
