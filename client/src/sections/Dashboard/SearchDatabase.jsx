import { useState, useEffect } from "react";
import { FiSearch, FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function SearchDatabase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scamData, setScamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scamsPerPage] = useState(20);

  // Fetch scams data from the database
  useEffect(() => {
    const fetchScams = async () => {
      try {
        setLoading(true);

        // Make the API request to fetch scams
        const response = await fetch("https://scam-information-system.onrender.com/api/scam-reports"); 
        if (!response.ok) {
          throw new Error("Failed to fetch scam data");
        }

        const data = await response.json();
        setScamData(data); 
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
    (scam.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (scam.scamType || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (scam.caseId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (scam.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination values
  const indexOfLastScam = currentPage * scamsPerPage;
  const indexOfFirstScam = indexOfLastScam - scamsPerPage;
  const currentScams = filteredScams.slice(indexOfFirstScam, indexOfLastScam);
  const totalPages = Math.ceil(filteredScams.length / scamsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {/* Search Bar */}
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
                {filteredScams.length > 1 ? <b>{filteredScams.length} results</b> : <b>{filteredScams.length} result</b>}
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
              {currentScams.map((scam) => (
                <div key={scam.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Name of Scammer: {scam.scammerName}</h3>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 font-semibold">Type of Scam: {scam.scamType}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600 font-bold">
                          Case No: <span className="text-amber-500">{scam.caseId}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500 font-semibold">
                          <span className="font-medium">{scam.type}</span>Reported on {scam.dateReported.split('T')[0]}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">{scam.description}</p>
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                      <Link
                         to={`/scam/${scam.caseId}`}
                         className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#063F3A] hover:bg-[#063F3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#063F3A]"
                      >
                         View Details
                      </Link>
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

            {/* Pagination */}
            {filteredScams.length > scamsPerPage && (
              <div className="flex justify-center mt-6">
                <nav className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        currentPage === index + 1
                          ? "bg-indigo-600 text-white"
                          : "text-gray-500 bg-white"
                      } border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
