export default function ServiceSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">Service</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl
                   bg-[#102a4d] border border-white/10
                   text-white focus:outline-none focus:border-blue-500"
      >
        <option value="">Select Service</option>
        <option value="likes">Instagram Likes</option>
        <option value="followers">Instagram Followers</option>
        <option value="views">Instagram Views</option>
        <option value="reels">Instagram Reel Views</option>
      </select>
    </div>
  );
}
