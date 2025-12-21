import UserSidebar from "@/components/user/UserSidebar";
import UserTopbar from "@/components/user/UserTopbar";

export default function UserLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#020b18] text-white">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <UserTopbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
