import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ScamDetail() {
  const { id } = useParams(); 
  const [scamDetail, setScamDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);


useEffect(() => {
    const fetchScamDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch scam report data
        const response = await fetch(`https://scam-information-system.onrender.com/api/scam-reports/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch scam details");
        }
        
        const data = await response.json();
        
        if (!data) {
          throw new Error("Scam report data is empty");
        }
        
        setScamDetail(data);

        if (data.evidence) {
          try {
            const filePaths = data.evidence.split(',');
      
            const urls = await Promise.all(
                filePaths.map(async (path) => {
                  const trimmedPath = path.trim();
                  console.log("Processing path:", trimmedPath);
                  const fileName = trimmedPath.split('/').pop();
                  console.log("Extracted filename:", fileName);
          
                  const correctUrl = `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
                  console.log("Constructed correct URL:", correctUrl);
          
                  return correctUrl;
                })
              );
        
            console.log("Fetched URLs:", urls);
            setImageUrls(urls.filter(url => url));
          } catch (imageError) {
            console.error("Error fetching images:", imageError);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchScamDetail();
  }, [id]); 
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063F3A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-2xl mx-auto mt-8">
        <h2 className="font-bold">Error Loading Report</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-[#063F3A] text-white rounded hover:bg-[#052b28]"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!scamDetail) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg max-w-2xl mx-auto mt-8">
        No scam report found with ID: {id}
      </div>
    );
  }

  const reportedDate = new Date(scamDetail.dateReported).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-[#0F766E] my-3">Alleged Scammer: {scamDetail.scammerName}</h1>
        <div className="mt-2 flex items-center">
          <span className="bg-pink-100 border-[2px] border-pink-300 py-[6px] px-2 rounded-full">
            {scamDetail.scamType}
          </span>
          <span className="ml-4 text-gray-600 font-semibold">Case ID: <span className="text-amber-600">{scamDetail.caseId}</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{scamDetail.description}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Report Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Scammer Contact</h3>
              <p className="mt-1 text-gray-900">{scamDetail.scammerEmail}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Account Details</h3>
              <p className="mt-1 text-gray-900">{scamDetail.scammerAccountNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Reported On</h3>
              <p className="mt-1 text-gray-900">{reportedDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className={`mt-1 ${
                scamDetail.status === 'verified' 
                  ? 'text-green-600' 
                  : 'text-yellow-600'
              }`}>
                {scamDetail.status.charAt(0).toUpperCase() + scamDetail.status.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

{imageUrls.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Evidence</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Evidence ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/image-placeholder.png';
                  }}
                />
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-white font-medium  bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
                    View Full Size
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
