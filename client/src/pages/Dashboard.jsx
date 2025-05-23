import { useState } from "react";
import Sidebar from "../components/Sidebar"; 
import { FaBars } from "react-icons/fa"; 
import SearchDatabase from "./SearchDatabase";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar on small screens */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Hamburger icon for mobile */}
        <button
          className="lg:hidden p-4 text-2xl text-white bg-[#063F3A] hover:bg-[#063F3A]"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <main className="flex-1 p-6 ml-0 lg:ml-50">
          <SearchDatabase />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
