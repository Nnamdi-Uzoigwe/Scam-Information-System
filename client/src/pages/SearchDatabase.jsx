import { useState, useEffect } from "react";
import { FiSearch, FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";

export default function SearchDatabase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scamData, setScamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scamsPerPage] = useState(8);

  useEffect(() => {
    const fetchScams = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://scam-information-system.onrender.com/api/scam-reports"
        );
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

  const filteredScams = scamData.filter((scam) => {
    const searchTerm = searchQuery.toLowerCase();

    let fullName = "";

    if (typeof scam.scammerName === "object" && scam.scammerName !== null) {
      if (Array.isArray(scam.scammerName.names)) {
        fullName = scam.scammerName.names.join(" ").toLowerCase();
      } else {
        const first = scam.scammerName.firstName || "";
        const other = scam.scammerName.otherNames || "";
        const last = scam.scammerName.surname || "";
        fullName = `${first} ${other} ${last}`.trim().toLowerCase();
      }
    } else if (typeof scam.scammerName === "string") {
      fullName = scam.scammerName.toLowerCase().trim();
    }

    return (
      (scam.title || "").toLowerCase().includes(searchTerm) ||
      fullName.includes(searchTerm) ||
      (scam.scamType || "").toLowerCase().includes(searchTerm) ||
      (scam.caseId || "").toLowerCase().includes(searchTerm) ||
      (scam.description || "").toLowerCase().includes(searchTerm) ||
      (scam.scammerBankName || "").toLowerCase().includes(searchTerm) ||
      (scam.scammerAccountNumber || "").toLowerCase().includes(searchTerm)
    );
  });

  // Calculate pagination values
  const indexOfLastScam = currentPage * scamsPerPage;
  const indexOfFirstScam = indexOfLastScam - scamsPerPage;
  const currentScams = filteredScams.slice(indexOfFirstScam, indexOfLastScam);
  const totalPages = Math.ceil(filteredScams.length / scamsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-[700px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-[#0F766E] sm:text-4xl">
            Search Scam Database
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Look up known scams and fraudulent activities reported by our
            community
          </p>
        </div>
        <div className="max-w-3xl mx-auto mb-16">
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
                {filteredScams.length > 1 ? (
                  <b>{filteredScams.length} results</b>
                ) : (
                  <b>{filteredScams.length} result</b>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Error loading data
            </h3>
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
                <div
                  key={scam.caseId}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg leading-6 font-medium text-[#0F766E]">
                            Alleged Scammer:{" "}
                            {Array.isArray(scam.scammerName?.names) &&
                            scam.scammerName.names.length > 0
                              ? scam.scammerName.names.join(" ")
                              : typeof scam.scammerName === "object" &&
                                (scam.scammerName.firstName ||
                                  scam.scammerName.surname)
                              ? `${scam.scammerName.firstName || ""} ${
                                  scam.scammerName.surname || ""
                                }`.trim()
                              : typeof scam.scammerName === "string" &&
                                scam.scammerName.trim() !== ""
                              ? scam.scammerName
                              : "Unknown"}
                          </h3>
                        </div>
                        <div className="my-2">
                          <span className="text-sm text-gray-600 font-semibold">
                            Scam type:{" "}
                            <span className="text-xs bg-pink-100 text-red-400 py-[4px] px-2 rounded-2xl">
                              {scam.scamType}
                            </span>
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600 font-bold">
                          Case No:{" "}
                          <span className="text-amber-600">{scam.caseId}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600 font-semibold">
                          <span className="">
                            Reported on {scam.dateReported.split("T")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 w-full">
                      <p className="text-sm text-gray-600 truncate">
                        {scam.description}
                      </p>
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
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No scams found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredScams.length > scamsPerPage && (
              <div className="flex justify-center mt-6 ">
                <nav className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        currentPage === index + 1
                          ? "bg-[#0F766E] text-white"
                          : "text-gray-500 bg-white"
                      } border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F766E]`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
