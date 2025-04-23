import { useState } from "react";
import Sidebar from "../components/Sidebar"; // Import the sidebar
import { FaBars } from "react-icons/fa"; // Hamburger icon
import SearchDatabase from "../sections/Dashboard/SearchDatabase";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar on small screens */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden p-4 text-2xl text-white bg-gray-800 hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <main className="flex-1 p-6 ml-0 md:ml-50">
          <SearchDatabase />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
