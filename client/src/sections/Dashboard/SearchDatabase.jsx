import { useState, useEffect } from "react";
import { FiSearch, FiAlertTriangle, FiShield } from "react-icons/fi";
import { FaMoneyBillWave, FaGlobeAmericas } from "react-icons/fa";

export default function SearchDatabase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scamData, setScamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching data from a database
  useEffect(() => {
    const fetchScams = async () => {
      try {
        // Simulate API delay (remove in production)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Replace this with your actual API call
        const dummyData = [
          {
            id: 1,
            title: "Fake Investment Scheme",
            type: "Financial",
            description: "Promises high returns with no risk. Victims are asked to invest money but never see returns.",
            reportedDate: "2023-05-15",
            severity: "High"
          },
          {
                  id: 2,
                  title: "Phishing Email Scam",
                  type: "Online",
                  description: "Emails pretending to be from banks asking for login credentials with fake urgency.",
                  reportedDate: "2023-06-22",
                  severity: "Medium"
                },
                {
                  id: 3,
                  title: "Tech Support Scam",
                  type: "Phone",
                  description: "Callers claim to be from Microsoft/Apple support needing remote access to fix non-existent problems.",
                  reportedDate: "2023-04-10",
                  severity: "High"
                },
                {
                  id: 4,
                  title: "Romance Scam",
                  type: "Social",
                  description: "Fake profiles on dating sites build relationships to eventually ask for money for emergencies.",
                  reportedDate: "2023-07-05",
                  severity: "Medium"
                },
                {
                  id: 5,
                  title: "Romance Scam",
                  type: "Social",
                  description: "Fake profiles on dating sites build relationships to eventually ask for money for emergencies.",
                  reportedDate: "2023-07-05",
                  severity: "Medium"
                },
                {
                  id: 6,
                  title: "Romance Scam",
                  type: "Social",
                  description: "Fake profiles on dating sites build relationships to eventually ask for money for emergencies.",
                  reportedDate: "2023-07-05",
                  severity: "Medium"
                },
                {
                  id: 7,
                  title: "Romance Scam",
                  type: "Social",
                  description: "Fake profiles on dating sites build relationships to eventually ask for money for emergencies.",
                  reportedDate: "2023-07-05",
                  severity: "Medium"
                }
          
        ];
        
        setScamData(dummyData);
      } catch (err) {
        setError("Failed to load scam data");
      } finally {
        setLoading(false);
      }
    };

    fetchScams();
  }, []);

  // Filter scams based on search query
  const filteredScams = scamData.filter(scam =>
    scam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scam.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scam.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ... (keep your existing getSeverityIcon and getTypeIcon functions)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[700px] mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-3xl font-extrabold text-[#0F766E] sm:text-4xl">
             Search Scam Database
           </h1>
           <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
             Look up known scams and fraudulent activities reported by our community
           </p>
        </div>
        <div className="max-w-3xl mx-auto mb-16">
          {/* ... (keep your existing search bar markup) */}
          <div className="relative rounded-md shadow-sm">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <FiSearch className="h-5 w-5 text-gray-400" />
             </div>
             <input
               type="text"
               className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 py-4 border-gray-300 rounded-md text-lg"
               placeholder="Search scams..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
               <span className="text-gray-500 text-sm">
                 {filteredScams.length > 1 ? <b>{filteredScams.length} results</b> : <b>{filteredScams.length} result</b> }
               </span>
             </div>
           </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6 animate-pulse">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 h-5 w-5 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading data</h3>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loaded State */}
        {!loading && !error && (
          <>
            {/* Scam Results */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredScams.map((scam) => (
                <div key={scam.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                               <div className="px-4 py-5 sm:p-6">
                                 <div className="flex items-start">
                                   {/* <div className="flex-shrink-0 mr-3">
                                     {getTypeIcon(scam.type)}
                                   </div> */}
                                   <div className="flex-1">
                                     <div className="flex justify-between">
                                       <h3 className="text-lg leading-6 font-medium text-gray-900">{scam.title}</h3>
                                       <div className="flex items-center">
                                         {/* {getSeverityIcon(scam.severity)} */}
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
                                   <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#063F3A] hover:bg-[#063F3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#063F3A]">
                                     View Details
                                   </button>
                                 </div>
                               </div>
                             </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredScams.length === 0 && !loading && (
              <div className="text-center py-12">
                    <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No scams found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}