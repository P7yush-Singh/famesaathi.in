"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Pencil,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";

export default function ProfileClient({ user }) {
  const router = useRouter();

  /* ---------------- BASIC INFO ---------------- */
  const [name, setName] = useState(user.name);
  const [editingName, setEditingName] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- PASSWORD CHANGE ---------------- */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ---------------- DELETE ACCOUNT ---------------- */
  const [deletePassword, setDeletePassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* ================= UPDATE NAME ================= */
  const handleUpdateName = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setLoading(false);

    if (!res.ok) {
      toast.error("Failed to update name");
      return;
    }

    toast.success("Name updated successfully");
    setEditingName(false);

    // 🔥 Auto-refresh (same trick as DashboardNavbar)
    router.refresh();
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/profile/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
    setLoading(false);

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Password change failed");
      return;
    }

    toast.success("Password changed successfully");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  /* ================= DELETE ACCOUNT ================= */
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Password is required");
      return;
    }

    if (!confirmDelete) {
      toast.error("Please confirm account deletion");
      return;
    }

    setDeleting(true);
    const res = await fetch("/api/profile/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: deletePassword }),
    });
    setDeleting(false);

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Delete failed");
      return;
    }

    toast.success("Account deleted successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-600/20 flex items-center justify-center">
          <User className="text-blue-400" size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-sm text-gray-400">{user.email}</p>
          {user.role === "admin" && (
            <span className="inline-block mt-1 text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
              🧑‍💼 Admin
            </span>
          )}
        </div>
      </div>

      {/* ================= PROFILE INFO ================= */}
      <div className="bg-[#081a33] rounded-xl p-6 space-y-4 border border-white/10">
        <div className="flex items-center justify-between bg-[#020b18] px-4 py-3 rounded">
          {editingName ? (
            <input
              className="bg-transparent outline-none flex-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span>{user.name}</span>
          )}

          {editingName ? (
            <button
              onClick={handleUpdateName}
              disabled={loading}
              className="text-sm bg-blue-600 px-3 py-1 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="text-gray-400 hover:text-white"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>

        <InfoRow label="Wallet Balance" value={`₹${Number(user.walletBalance).toFixed(2)}`} />
        <InfoRow label="Joined" value={new Date(user.createdAt).toDateString()} />
        <InfoRow
          label="Last Login"
          value={
            user.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "—"
          }
        />
      </div>

      {/* ================= CHANGE PASSWORD ================= */}
      <div className="bg-[#081a33] rounded-xl p-6 space-y-4 border border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-green-400" size={18} />
          <h2 className="font-semibold">Change Password</h2>
        </div>

        <input
          type="password"
          placeholder="Current password"
          className="w-full bg-[#020b18] p-3 rounded outline-none"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New password"
          className="w-full bg-[#020b18] p-3 rounded outline-none"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full bg-[#020b18] p-3 rounded outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          Change Password
        </button>
      </div>

      {/* ================= DELETE ACCOUNT ================= */}
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 space-y-4">
        <h2 className="text-red-400 font-semibold">Delete Account</h2>

        <input
          type="password"
          placeholder="Enter password to confirm"
          className="w-full bg-[#020b18] border border-red-500/40 p-3 rounded outline-none"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
        />

        <label className="flex items-center gap-2 text-sm text-red-300">
          <input
            type="checkbox"
            checked={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.checked)}
          />
          I understand this action is irreversible
        </label>

        <button
          onClick={handleDeleteAccount}
          disabled={!deletePassword || !confirmDelete || deleting}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 py-2 rounded font-semibold"
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}

/* ================= HELPER ================= */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
