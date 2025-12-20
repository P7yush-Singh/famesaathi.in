export default function StatCard({ title, value }) {
  return (
    <div
      className="rounded-xl p-4
                 bg-[#0b2545]
                 border border-white/10"
    >
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}
