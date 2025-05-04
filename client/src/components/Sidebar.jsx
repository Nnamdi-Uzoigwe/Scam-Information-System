// import { Link } from "react-router-dom";
// import { FaSearch, FaExclamationTriangle, FaListAlt, FaSignOutAlt, FaTimes } from "react-icons/fa"; 

// const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
//   return (
//     <div>
//       {/* Sidebar content */}
//       <div
//         className={`${
//           isSidebarOpen ? "block" : "hidden"
//         } md:block fixed inset-0 z-10 bg-gray-800 bg-opacity-80 md:w-64 md:h-full`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex-shrink-0 p-4 bg-gray-900 text-white">
//             <h1 className="text-2xl font-bold">Dashboard</h1>
//           </div>
//           <div className="flex-grow overflow-y-auto">
//             <Link
//               to="/search"
//               className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-md text-white"
//             >
//               <FaSearch className="w-5 h-5" />
//               <span>Search the Database</span>
//             </Link>
//             <Link
//               to="/report-scam"
//               className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-md text-white"
//             >
//               <FaExclamationTriangle className="w-5 h-5" />
//               <span>Report a Scam</span>
//             </Link>
//             <Link
//               to="/view-reports"
//               className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-md text-white"
//             >
//               <FaListAlt className="w-5 h-5" />
//               <span>View Submitted Reports</span>
//             </Link>
//             <Link
//               to="/logout"
//               className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-md text-white"
//             >
//               <FaSignOutAlt className="w-5 h-5" />
//               <span>Logout</span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       <div
//         className={`${
//           isSidebarOpen ? "block" : "hidden"
//         } fixed inset-0 z-0 bg-black bg-opacity-50 md:hidden`}
//         onClick={toggleSidebar}
//       >
//         {/* Close button */}
//         <button
//           className="absolute top-4 right-4 text-white text-2xl"
//           onClick={toggleSidebar}
//         >
//           <FaTimes />
//         </button>

//         {/* Links */}
//         <div className="flex flex-col items-center justify-center h-full space-y-4">
//           <Link
//             to="/search"
//             className="text-white text-xl"
//             onClick={toggleSidebar}
//           >
//             Search the Database
//           </Link>
//           <Link
//             to="/report-scam"
//             className="text-white text-xl"
//             onClick={toggleSidebar}
//           >
//             Report a Scam
//           </Link>
//           <Link
//             to="/view-reports"
//             className="text-white text-xl"
//             onClick={toggleSidebar}
//           >
//             View Submitted Reports
//           </Link>
//           <Link
//             to="/logout"
//             className="text-white text-xl"
//             onClick={toggleSidebar}
//           >
//             Logout
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import { Link } from "react-router-dom";
import { FaSearch, FaExclamationTriangle, FaListAlt, FaSignOutAlt, FaTimes } from "react-icons/fa"; 
import UserAvatar from "../sections/About/UserAvatar";

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {

  const user = localStorage.getItem("UserIdentity")
  return (
    <div>
      {/* Sidebar content */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block fixed inset-0 z-10 bg-gray-800 bg-opacity-80 md:w-64 md:h-full`}
      >
        <div className="flex flex-col h-full">
          <div className="flex gap-5 flex-shrink-0 p-4 bg-gray-900 text-white">
            <div className="">{user ? null : <UserAvatar/> }</div>
            <h1 className="text-2xl  font-bold">Dashboard</h1>
          </div>
          <div className="flex-grow overflow-y-auto">
            <Link
              to="/search"
              className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-md text-white"
            >
              <FaSearch className="w-5 h-5" />
              <span>Search the Database</span>
            </Link>
            <Link
              to="/report"
              className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-md text-white"
            >
              <FaExclamationTriangle className="w-5 h-5" />
              <span>Report a Scam</span>
            </Link>
            <Link
              to="/view-reports"
              className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-md text-white"
            >
              <FaListAlt className="w-5 h-5" />
              <span>View Submitted Reports</span>
            </Link>
            <Link
              to="/logout"
              className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-md text-white"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } fixed inset-0 z-40 bg-gray-800 bg-opacity-50 md:hidden`}
        onClick={toggleSidebar}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white text-3xl z-50"
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>

        {/* Links */}
        <div className="flex flex-col items-center justify-center h-full space-y-4 z-50">
          <Link
            to="/search"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            Search the Database
          </Link>
          <Link
            to="/report-scam"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            Report a Scam
          </Link>
          <Link
            to="/view-reports"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            View Submitted Reports
          </Link>
          <Link
            to="/logout"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
