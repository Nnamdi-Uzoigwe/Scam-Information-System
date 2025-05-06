import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaFilter, FaFileAlt, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';

const ViewReports = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://scam-information-system.onrender.com/api/scam-reports/my-reports', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch reports');
        }

        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (caseId) => {
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://scam-information-system.onrender.com/api/scam-reports/${caseId}`,
        {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete report');
      }

      setReports(reports.filter(report => report.caseId !== caseId));
      console.log("deleted successfully")
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } catch (err) {
      setError(err.message || 'Failed to delete report');
    }
  };

  const filteredReports = reports
    .filter(report => {
      if (filter === 'all') return true;
      return report.status === filter;
    })
    .filter(report => {
      const searchLower = searchTerm.toLowerCase();
      return (
        report.scammerName.toLowerCase().includes(searchLower) ||
        report.scamType.toLowerCase().includes(searchLower) ||
        report.caseId.toLowerCase().includes(searchLower)
    )});

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
      <div className="flex items-center">
        <FaExclamationTriangle className="text-red-500 mr-2" />
        <span className="text-red-700">{error}</span>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - hidden on mobile unless isSidebarOpen is true */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-64 fixed lg:relative z-50`}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content container */}
      <div className="flex flex-col flex-1">
        {/* Mobile Topbar */}
        <div className="lg:hidden w-full bg-[#063F3A]">
          <button
            className="cursor-pointer p-4 text-2xl text-white"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>

        {/* Reports content */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#0F766E] mb-6">My Submitted Reports</h1>
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search my reports..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F766E]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-600" />
              <select 
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0F766E]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
              </select>
            </div>
          </div>

          {/* Reports Grid */}
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <FaFileAlt className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">
                {reports.length === 0 
                  ? "You haven't submitted any scam reports yet."
                  : "No reports match your search criteria."}
              </p>
              <Link 
                to="/report-scam" 
                className="inline-block px-6 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0d625b] transition"
              >
                Report a New Scam
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredReports.map((scam) => (
                <div key={scam.caseId} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg leading-6 font-medium text-[#0F766E]">Alleged Scammer: {scam.scammerName}</h3>

                        </div>
                        <div className="my-2">
                          <span className="text-sm text-gray-600 font-semibold">Scam type: <span className="text-xs bg-pink-100 text-red-400 py-[4px] px-2 rounded-2xl">{scam.scamType}</span></span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600 font-bold">
                          Case No: <span className="text-amber-600">{scam.caseId}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600 font-semibold">
                          <span className="">Reported on {new Date(scam.dateReported).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-1">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            scam.status === 'verified' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {scam.status === 'verified' ? (
                              <FaCheckCircle className="inline mr-1" />
                            ) : (
                              <FaClock className="inline mr-1" />
                            )}
                            {scam.status.charAt(0).toUpperCase() + scam.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 w-full">
                      <p className="text-sm text-gray-600 line-clamp-3">{scam.description}</p>
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                      <Link
                        to={`/scam/${scam.caseId}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#063F3A] hover:bg-[#063F3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#063F3A]"
                      >
                        View Details
                      </Link>
                      <button
                           onClick={() => handleDelete(scam.caseId)}
                           className="cursor-pointer bg-red-600 text-sm text-white px-3 py-1 font-medium rounded"
                           title="Delete report"
                      >
                           Delete Report
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReports;