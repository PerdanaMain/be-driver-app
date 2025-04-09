import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid grid-cols-5 max-w-screen-2xl mx-auto border-x-2 border-gray-100">
        <Sidebar />

        {/* Main */}
        <div className="col-span-4 bg-gray-100 ">
          <Navbar />
          {/* Main Section */}
          {children}
        </div>
        {/* /Main */}
      </div>
    </>
  );
}
