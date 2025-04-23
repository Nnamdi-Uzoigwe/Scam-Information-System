// import React, { useState } from "react";

// const SearchDatabase = () => {
//   // State to handle the search query and scam results
  
//   // Dummy scam data (you can replace this with API data later)
//   const dummyScams = [
//       {
//           id: 1,
//       title: "Fake Investment Scheme",
//       description: "A fake investment opportunity that promises high returns with little risk.",
//       date: "2025-04-20",
//     },
//     {
//       id: 2,
//       title: "Phishing Email Scam",
//       description: "Scam emails pretending to be from legitimate companies to steal personal info.",
//       date: "2025-03-15",
//     },
//     {
//       id: 3,
//       title: "Lottery Scam",
//       description: "A scam where individuals are told they have won a lottery they never entered.",
//       date: "2025-02-10",
//     },
//     {
//       id: 4,
//       title: "Tech Support Scam",
//       description: "Fraudulent tech support calls tricking people into giving access to their computers.",
//       date: "2025-01-25",
//     },
//   ];
  
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredScams, setFilteredScams] = useState(dummyScams);
//   // Handle search input and filter results
//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query === "") {
//       setFilteredScams(dummyScams);
//     } else {
//       setFilteredScams(
//         dummyScams.filter(
//           (scam) =>
//             scam.title.toLowerCase().includes(query.toLowerCase()) ||
//             scam.description.toLowerCase().includes(query.toLowerCase())
//         )
//       );
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         {/* Search Bar */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search for scams..."
//             value={searchQuery}
//             onChange={handleSearch}
//             className="w-full p-4 text-xl rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Search Results */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Scams in the Database</h2>

//           {filteredScams.length === 0 ? (
//             <p>No scams found for your search query.</p>
//           ) : (
//             filteredScams.map((scam) => (
//               <div
//                 key={scam.id}
//                 className="mb-4 p-4 bg-gray-50 border rounded-lg shadow-sm hover:bg-gray-200"
//               >
//                 <h3 className="text-xl font-bold">{scam.title}</h3>
//                 <p className="text-gray-700">{scam.description}</p>
//                 <span className="text-sm text-gray-500">{scam.date}</span>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchDatabase;


import { useState } from "react";
import { FiSearch, FiAlertTriangle, FiShield } from "react-icons/fi";
import { FaMoneyBillWave, FaGlobeAmericas } from "react-icons/fa";

export default function SearchDatabase() {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy scam data
  const scamData = [
    {
      id: 1,
      title: "Fake Investment Scheme",
      type: "Financial",
      description: "Promises high returns with no risk. Victims are asked to invest money but never see returns.",
      reportedDate: "2023-05-15",
      reports: 142,
      severity: "High"
    },
    {
      id: 2,
      title: "Phishing Email Scam",
      type: "Online",
      description: "Emails pretending to be from banks asking for login credentials with fake urgency.",
      reportedDate: "2023-06-22",
      reports: 89,
      severity: "Medium"
    },
    {
      id: 3,
      title: "Tech Support Scam",
      type: "Phone",
      description: "Callers claim to be from Microsoft/Apple support needing remote access to fix non-existent problems.",
      reportedDate: "2023-04-10",
      reports: 203,
      severity: "High"
    },
    {
      id: 4,
      title: "Romance Scam",
      type: "Social",
      description: "Fake profiles on dating sites build relationships to eventually ask for money for emergencies.",
      reportedDate: "2023-07-05",
      reports: 67,
      severity: "Medium"
    },
    {
      id: 5,
      title: "Romance Scam",
      type: "Social",
      description: "Fake profiles on dating sites build relationships to eventually ask for money for emergencies.",
      reportedDate: "2023-07-05",
      reports: 67,
      severity: "Medium"
    },
    {
      id: 6,
      title: "Romance Scam",
      type: "Social",
      description: "Fake profiles on dating sites build relationships to eventually ask for money for emergencies.",
      reportedDate: "2023-07-05",
      reports: 67,
      severity: "Medium"
    },
    {
      id: 7,
      title: "Romance Scam",
      type: "Social",
      description: "Fake profiles on dating sites build relationships to eventually ask for money for emergencies.",
      reportedDate: "2023-07-05",
      reports: 67,
      severity: "Medium"
    }
  ];

  // Filter scams based on search query
  const filteredScams = scamData.filter(scam =>
    scam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scam.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scam.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "High":
        return <FiAlertTriangle className="h-5 w-5 text-red-500" />;
      case "Medium":
        return <FiShield className="h-5 w-5 text-yellow-500" />;
      default:
        return <FiAlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Financial":
        return <FaMoneyBillWave className="h-5 w-5 text-blue-500" />;
      case "Online":
        return <FaGlobeAmericas className="h-5 w-5 text-green-500" />;
      default:
        return <FiAlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[700px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Search Scam Database
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Look up known scams and fraudulent activities reported by our community
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 py-4 border-gray-300 rounded-md text-lg"
              placeholder="Search by scam name, type, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 text-sm">
                {filteredScams.length} results
              </span>
            </div>
          </div>
        </div>

        {/* Scam Results */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredScams.map((scam) => (
            <div key={scam.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {getTypeIcon(scam.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{scam.title}</h3>
                      <div className="flex items-center">
                        {getSeverityIcon(scam.severity)}
                        <span className="ml-1 text-sm text-gray-500">{scam.severity}</span>
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <span className="font-medium">{scam.type}</span> • Reported on {scam.reportedDate}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{scam.description}</p>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    {scam.reports} reports
                  </span>
                  <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredScams.length === 0 && (
          <div className="text-center py-12">
            <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No scams found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}