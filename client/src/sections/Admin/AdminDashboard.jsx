// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const token = localStorage.getItem('adminToken');
//         if (!token) {
//           navigate('/admin');
//           return;
//         }

//         const response = await fetch('https://scam-information-system.onrender.com/api/scam-reports', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch reports');
//         }

//         const data = await response.json();
//         setReports(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     setTimeout(() => {
//         navigate('/');
//     }, 2000)
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

// return (
//     <div className="container mx-auto px-4 py-8 mb-20">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-[#0F766E]">Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>
  
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-5 sm:px-6 bg-gray-50">
//           <h3 className="text-lg font-medium leading-6 text-gray-900">All Scam Reports</h3>
//         </div>
  
//         {/* Responsive table wrapper */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scammer Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scam Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {reports.map((report) => (
//                 <tr key={report._id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.caseId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.scammerName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.scamType}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       report.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {report.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button className="text-[#0F766E] hover:text-[#0d625b] mr-3">View</button>
//                     <button className="text-red-600 hover:text-red-900">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default AdminDashboard;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState({
    reports: true,
    testimonials: true
  });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('reports'); // 'reports' or 'testimonials'
  const navigate = useNavigate();

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin');
          return;
        }

        const response = await fetch('https://scam-information-system.onrender.com/api/scam-reports', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch reports');
        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(prev => ({ ...prev, reports: false }));
      }
    };

    if (activeTab === 'reports') fetchReports();
  }, [navigate, activeTab]);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin');
          return;
        }

        const response = await fetch('https://scam-information-system.onrender.com/api/testimonials', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(prev => ({ ...prev, testimonials: false }));
      }
    };

    if (activeTab === 'testimonials') fetchTestimonials();
  }, [navigate, activeTab]);

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://scam-information-system.onrender.com/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete testimonial');
      
      setTestimonials(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  if (loading.reports && activeTab === 'reports') return <div className="text-center py-8">Loading reports...</div>;
  if (loading.testimonials && activeTab === 'testimonials') return <div className="text-center py-8">Loading testimonials...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#0F766E]">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'reports' ? 'border-b-2 border-[#0F766E] text-[#0F766E]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('reports')}
        >
          Scam Reports
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'testimonials' ? 'border-b-2 border-[#0F766E] text-[#0F766E]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('testimonials')}
        >
          Testimonials
        </button>
      </div>

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* ... (your existing reports table code) ... */}
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === 'testimonials' && (
        <div className="bg-white shadow rounded-lg overflow-hidden overflow-x-auto">
          <div className="min-w-full">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">All Testimonials</h3>
            </div>
            <div className="border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {testimonial.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {testimonial.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteTestimonial(testimonial._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard