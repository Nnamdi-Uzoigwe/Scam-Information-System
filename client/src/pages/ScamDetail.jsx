// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";

// export default function ScamDetail() {
//   const { id } = useParams(); 
//   const [scamDetail, setScamDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);


// useEffect(() => {
//     const fetchScamDetail = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch(`https://scam-information-system.onrender.com/api/scam-reports/${id}`);
        
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Failed to fetch scam details");
//         }
        
//         const data = await response.json();
        
//         if (!data) {
//           throw new Error("Scam report data is empty");
//         }
        
//         setScamDetail(data);

// if (data?.evidence) {
//   try {
//     console.log('Raw evidence data:', data.evidence, 'Type:', typeof data.evidence);
    
//     let filePaths = [];
    
//     if (Array.isArray(data.evidence)) {
//       // Evidence is an array of objects with 'type' property
//       filePaths = data.evidence.map(item => {
//         if (typeof item === 'object' && item.type) {
//           return item.type; // Extract the filename from the object
//         } else if (typeof item === 'string') {
//           return item; // It's already a string
//         } else {
//           console.warn('Unexpected evidence item format:', item);
//           return String(item); // Convert to string as fallback
//         }
//       });
//     } else if (typeof data.evidence === 'string') {
//       // Evidence is a string, split by comma
//       filePaths = data.evidence.split(',');
//     } else {
//       // Evidence is some other type, try to convert to string first
//       console.warn('Evidence is in an unexpected format:', data.evidence);
//       filePaths = [String(data.evidence)];
//     }

//     const urls = filePaths
//       .map(path => {
//         // Ensure path is a string and trim whitespace
//         const trimmedPath = String(path).trim();
//         if (!trimmedPath) return null;

//         console.log("Processing path:", trimmedPath);

//         // Remove leading slashes if present
//         const cleanPath = trimmedPath.replace(/^\/+/, '');
        
//         // Extract filename if it's a full path
//         const fileName = cleanPath.includes('/') ? cleanPath.split('/').pop() : cleanPath;
        
//         console.log("Final filename:", fileName);
        
//         const finalUrl = `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
//         console.log("Generated URL:", finalUrl);
        
//         return finalUrl;
//       })
//       .filter(url => url !== null && url !== ''); // Remove any null or empty entries

//     console.log('Final image URLs:', urls);
//     setImageUrls(urls);
    
//   } catch (imageError) {
//     console.error("Error processing image URLs:", imageError);
//     setImageUrls([]); // Fallback to empty array
//   } 
// } else {
//   console.log('No evidence data found');
//   setImageUrls([]); // No evidence available
// }
//       } catch (err) {
//         setError(err.message);
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchScamDetail();
//   }, [id]); 
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063F3A]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-2xl mx-auto mt-8">
//         <h2 className="font-bold">Error Loading Report</h2>
//         <p>{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="mt-2 px-4 py-2 bg-[#063F3A] text-white rounded hover:bg-[#052b28]"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!scamDetail) {
//     return (
//       <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg max-w-2xl mx-auto mt-8">
//         No scam report found with ID: {id}
//       </div>
//     );
//   }

//   const reportedDate = new Date(scamDetail.dateReported).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
//       <div className="border-b border-gray-200 pb-4 mb-6">
//         <h1 className="text-3xl font-bold text-[#0F766E] my-3">Alleged Scammer: {scamDetail.scammerName}</h1>
//         <div className="mt-2 flex items-center">
//           <span className="bg-pink-100 border-[2px] border-pink-300 py-[6px] px-2 rounded-full">
//             {scamDetail.scamType}
//           </span>
//           <span className="ml-4 text-gray-600 font-semibold">Case ID: <span className="text-amber-600">{scamDetail.caseId}</span></span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Details</h2>
//           <p className="text-gray-700 mb-6 whitespace-pre-line">{scamDetail.description}</p>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Report Information</h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Scammer Contact</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.telephoneNumbers?.join(',  ')}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Scammer Email Address</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.emailAddress}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Point of First Contact:</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.firstContact}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Account Details</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.scammerAccountNumber}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Total Value of Alleged Scam</h3>
//               {scamDetail?.scamValue ? (
//     <p className="mt-1 text-lg font-semibold text-gray-900">
//       {new Intl.NumberFormat(undefined, {
//         style: 'currency',
//         currency: scamDetail.scamValue.currency,
//       }).format(scamDetail.scamValue.amount)}
//     </p>
//   ) : (
//     <p className="mt-1 text-gray-500">Not specified</p>
//   )}

//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Reported On</h3>
//               <p className="mt-1 text-gray-900">{reportedDate}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Status</h3>
//               <p className={`mt-1 ${
//                 scamDetail.status === 'verified' 
//                   ? 'text-green-600' 
//                   : 'text-yellow-600'
//               }`}>
//                 {scamDetail.status.charAt(0).toUpperCase() + scamDetail.status.slice(1)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

// {imageUrls.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4">Evidence</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {imageUrls.map((url, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={url}
//                   alt={`Evidence ${index + 1}`}
//                   className="w-full h-48 object-cover rounded-lg shadow-sm"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = '/image-placeholder.png';
//                   }}
//                 />
//                 <a 
//                   href={url} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="absolute inset-0 flex items-center justify-center  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
//                 >
//                   <span className="opacity-0 group-hover:opacity-100 text-white font-medium  bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
//                     View Full Size
//                   </span>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";

// export default function ScamDetail() {
//   const { id } = useParams(); 
//   const [scamDetail, setScamDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [scammerPhotoUrls, setScammerPhotoUrls] = useState([]);

//   useEffect(() => {
//     const fetchScamDetail = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Fetch scam report data
//         const response = await fetch(`https://scam-information-system.onrender.com/api/scam-reports/${id}`);
        
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Failed to fetch scam details");
//         }
        
//         const data = await response.json();
        
//         if (!data) {
//           throw new Error("Scam report data is empty");
//         }
        
//         setScamDetail(data);

//         // Process evidence images
//         if (data?.evidence) {
//           try {
//             console.log('Raw evidence data:', data.evidence, 'Type:', typeof data.evidence);
            
//             let filePaths = [];
            
//             if (Array.isArray(data.evidence)) {
//               // Evidence is an array of objects with 'type' property
//               filePaths = data.evidence.map(item => {
//                 if (typeof item === 'object' && item.type) {
//                   return item.type; // Extract the filename from the object
//                 } else if (typeof item === 'string') {
//                   return item; // It's already a string
//                 } else {
//                   console.warn('Unexpected evidence item format:', item);
//                   return String(item); // Convert to string as fallback
//                 }
//               });
//             } else if (typeof data.evidence === 'string') {
//               // Evidence is a string, split by comma
//               filePaths = data.evidence.split(',');
//             } else {
//               // Evidence is some other type, try to convert to string first
//               console.warn('Evidence is in an unexpected format:', data.evidence);
//               filePaths = [String(data.evidence)];
//             }

//             const urls = filePaths
//               .map(path => {
//                 // Ensure path is a string and trim whitespace
//                 const trimmedPath = String(path).trim();
//                 if (!trimmedPath) return null;

//                 console.log("Processing path:", trimmedPath);

//                 // Remove leading slashes if present
//                 const cleanPath = trimmedPath.replace(/^\/+/, '');
                
//                 // Extract filename if it's a full path
//                 const fileName = cleanPath.includes('/') ? cleanPath.split('/').pop() : cleanPath;
                
//                 console.log("Final filename:", fileName);
                
//                 const finalUrl = `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
//                 console.log("Generated URL:", finalUrl);
                
//                 return finalUrl;
//               })
//               .filter(url => url !== null && url !== ''); // Remove any null or empty entries

//             console.log('Final image URLs:', urls);
//             setImageUrls(urls);
            
//           } catch (imageError) {
//             console.error("Error processing image URLs:", imageError);
//             setImageUrls([]); // Fallback to empty array
//           } 
//         } else {
//           console.log('No evidence data found');
//           setImageUrls([]); // No evidence available
//         }

//         // Process scammer photos
//         if (data?.scammerPhotos) {
//           try {
//             console.log('Raw scammer photos data:', data.scammerPhotos, 'Type:', typeof data.scammerPhotos);
            
//             let photoUrls = [];
            
//             if (Array.isArray(data.scammerPhotos)) {
//               photoUrls = data.scammerPhotos
//                 .map(photo => {
//                   // Handle different photo formats
//                   let photoPath;
//                   if (typeof photo === 'string') {
//                     photoPath = photo;
//                   } else if (typeof photo === 'object' && photo.url) {
//                     photoPath = photo.url;
//                   } else if (typeof photo === 'object' && photo.path) {
//                     photoPath = photo.path;
//                   } else {
//                     console.warn('Unexpected scammer photo format:', photo);
//                     return null;
//                   }
                  
//                   if (!photoPath) return null;
                  
//                   const trimmedPath = String(photoPath).trim();
//                   if (!trimmedPath) return null;
                  
//                   console.log("Processing scammer photo path:", trimmedPath);
                  
//                   // Remove leading slashes if present
//                   const cleanPath = trimmedPath.replace(/^\/+/, '');
                  
//                   // Extract filename if it's a full path
//                   const fileName = cleanPath.includes('/') ? cleanPath.split('/').pop() : cleanPath;
                  
//                   console.log("Final scammer photo filename:", fileName);
                  
//                   const finalUrl = `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
//                   console.log("Generated scammer photo URL:", finalUrl);
                  
//                   return finalUrl;
//                 })
//                 .filter(url => url !== null && url !== '');
//             }
            
//             console.log('Final scammer photo URLs:', photoUrls);
//             setScammerPhotoUrls(photoUrls);
            
//           } catch (photoError) {
//             console.error("Error processing scammer photo URLs:", photoError);
//             setScammerPhotoUrls([]);
//           }
//         } else {
//           console.log('No scammer photos data found');
//           setScammerPhotoUrls([]);
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchScamDetail();
//   }, [id]); 
  
//   // Helper function to format scam value
//   const formatScamValue = (scamValue) => {
//     console.log('Scam value data:', scamValue, 'Type:', typeof scamValue);
    
//     if (!scamValue) {
//       return "Not specified";
//     }
    
//     // If it's an object with amount and currency
//     if (typeof scamValue === 'object' && scamValue.amount && scamValue.currency) {
//       return new Intl.NumberFormat(undefined, {
//         style: 'currency',
//         currency: scamValue.currency,
//       }).format(scamValue.amount);
//     }
    
//     // If it's a number, format as currency with default currency (USD)
//     if (typeof scamValue === 'number') {
//       return new Intl.NumberFormat(undefined, {
//         style: 'currency',
//         currency: 'USD',
//       }).format(scamValue);
//     }
    
//     // If it's a string that looks like a number
//     if (typeof scamValue === 'string') {
//       const numericValue = parseFloat(scamValue.replace(/[^\d.-]/g, ''));
//       if (!isNaN(numericValue)) {
//         return new Intl.NumberFormat(undefined, {
//           style: 'currency',
//           currency: 'USD',
//         }).format(numericValue);
//       }
//       // If it's a string that doesn't parse to a number, return as is
//       return scamValue;
//     }
    
//     // Fallback: convert to string
//     return String(scamValue);
//   };
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063F3A]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-2xl mx-auto mt-8">
//         <h2 className="font-bold">Error Loading Report</h2>
//         <p>{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="mt-2 px-4 py-2 bg-[#063F3A] text-white rounded hover:bg-[#052b28]"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!scamDetail) {
//     return (
//       <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg max-w-2xl mx-auto mt-8">
//         No scam report found with ID: {id}
//       </div>
//     );
//   }

//   const reportedDate = new Date(scamDetail.dateReported).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
//       <div className="border-b border-gray-200 pb-4 mb-6">
//         <h1 className="text-3xl font-bold text-[#0F766E] my-3">Alleged Scammer: {scamDetail.scammerName}</h1>
//         <div className="mt-2 flex items-center">
//           <span className="bg-pink-100 border-[2px] border-pink-300 py-[6px] px-2 rounded-full">
//             {scamDetail.scamType}
//           </span>
//           <span className="ml-4 text-gray-600 font-semibold">Case ID: <span className="text-amber-600">{scamDetail.caseId}</span></span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Details</h2>
//           <p className="text-gray-700 mb-6 whitespace-pre-line">{scamDetail.description}</p>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Report Information</h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Scammer Contact</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.telephoneNumbers?.join(',  ')}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Scammer Email Address</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.emailAddress}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Point of First Contact:</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.firstContact}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Account Details</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.scammerAccountNumber}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Total Value of Alleged Scam</h3>
//               <p className="mt-1 text-lg font-semibold text-gray-900">
//                 {formatScamValue(scamDetail.scamValue)}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Reported On</h3>
//               <p className="mt-1 text-gray-900">{reportedDate}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Status</h3>
//               <p className={`mt-1 ${
//                 scamDetail.status === 'verified' 
//                   ? 'text-green-600' 
//                   : 'text-yellow-600'
//               }`}>
//                 {scamDetail.status.charAt(0).toUpperCase() + scamDetail.status.slice(1)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {scammerPhotoUrls.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4">Scammer Photos</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {scammerPhotoUrls.map((url, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={url}
//                   alt={`Scammer Photo ${index + 1}`}
//                   className="w-full h-48 object-cover rounded-lg shadow-sm"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = '/image-placeholder.png';
//                   }}
//                 />
//                 <a 
//                   href={url} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
//                 >
//                   <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
//                     View Full Size
//                   </span>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {imageUrls.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4">Evidence</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {imageUrls.map((url, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={url}
//                   alt={`Evidence ${index + 1}`}
//                   className="w-full h-48 object-cover rounded-lg shadow-sm"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = '/image-placeholder.png';
//                   }}
//                 />
//                 <a 
//                   href={url} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
//                 >
//                   <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
//                     View Full Size
//                   </span>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";

// export default function ScamDetail() {
//   const { id } = useParams(); 
//   const [scamDetail, setScamDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [scammerPhotoUrls, setScammerPhotoUrls] = useState([]);

//   useEffect(() => {
//     const fetchScamDetail = async () => {
//       console.log(`Starting fetch for ID: ${id}`);
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Fetch scam report data
//         const response = await fetch(`https://scam-information-system.onrender.com/api/scam-reports/${id}`);
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Failed to fetch scam details");
//         }
        
//         const data = await response.json();
        
//         if (!data) {
//           throw new Error("Scam report data is empty");
//         }
        
//         // Debug: Log the entire data object to see what we're getting
//         console.log('Full API response data:', data);
//         console.log('Scam value specifically:', data.scamValue);
//         console.log('Type of scamValue:', typeof data.scamValue);
        
//         setScamDetail(data);

//         // Process evidence images
//         if (data?.evidence) {
//           try {
//             console.log('Raw evidence data:', data.evidence, 'Type:', typeof data.evidence);
            
//             let filePaths = [];
            
//             if (Array.isArray(data.evidence)) {
//               console.log('Evidence is an array');
//               // Evidence is an array of objects with 'type' property
//               filePaths = data.evidence.map(item => {
//                 if (typeof item === 'object' && item !== null && item.type) {
//                   return item.type; // Extract the filename from the object
//                 } else if (typeof item === 'string') {
//                   return item; // It's already a string
//                 } else {
//                   console.warn('Unexpected evidence item format:', item);
//                   return String(item); // Convert to string as fallback
//                 }
//               });
//             } else if (typeof data.evidence === 'string') {
//                   console.log('Evidence is a string');
//                   // Handle both comma-separated and single strings
//                   filePaths = data.evidence.trim() ? data.evidence.split(',').map(s => s.trim()) : [];
//             } else if (typeof data.evidence === 'object' && data.evidence !== null) {
//               console.log('Evidence is an object');
//               // Evidence is an object, try to extract meaningful data
//               if (data.evidence.type) {
//                 filePaths = [data.evidence.type];
//               } else if (data.evidence.url) {
//                 filePaths = [data.evidence.url];
//               } else if (data.evidence.path) {
//                 filePaths = [data.evidence.path];
//               } else {
//                 console.warn('Evidence object format not recognized:', data.evidence);
//                 filePaths = [];
//               }
//             } else {
//               // Evidence is some other type, try to convert to string first
//               console.warn('Evidence is in an unexpected format:', data.evidence);
//               filePaths = [String(data.evidence)];
//             }

//             const urls = filePaths
//               .map(path => {
//                 // Ensure path is a string and trim whitespace
//                 const trimmedPath = String(path).trim();
//                 if (!trimmedPath) return null;

//                 console.log("Processing path:", trimmedPath);

//                 // Remove leading slashes if present
//                 const cleanPath = trimmedPath.replace(/^\/+/, '');
                
//                 // Extract filename if it's a full path
//                 const fileName = cleanPath.includes('/') ? cleanPath.split('/').pop() : cleanPath;
                
//                 console.log("Final filename:", fileName);
                
//                 const finalUrl = `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
//                 console.log("Generated URL:", finalUrl);
                
//                 return finalUrl;
//               })
//               .filter(url => url !== null && url !== ''); // Remove any null or empty entries

//             console.log('Final image URLs:', urls);
//             setImageUrls(urls);
            
//           } catch (imageError) {
//             console.error("Error processing image URLs:", imageError);
//             setImageUrls([]); // Fallback to empty array
//           } 
//         } else {
//           console.log('No evidence data found');
//           setImageUrls([]); // No evidence available
//         }

//         // Process scammer photos
//         if (data?.scammerPhotos) {
//           try {
//             console.log('Raw scammer photos data:', data.scammerPhotos, 'Type:', typeof data.scammerPhotos);
            
//             let photoUrls = [];
            
//             if (Array.isArray(data.scammerPhotos)) {
//               photoUrls = data.scammerPhotos
//                 .map(photo => {
//                   // Handle different photo formats
//                   let photoPath;
//                   if (typeof photo === 'string') {
//                     photoPath = photo;
//                   } else if (typeof photo === 'object' && photo.url) {
//                     photoPath = photo.url;
//                   } else if (typeof photo === 'object' && photo.path) {
//                     photoPath = photo.path;
//                   } else {
//                     console.warn('Unexpected scammer photo format:', photo);
//                     return null;
//                   }
                  
//                   if (!photoPath) return null;
                  
//                   const trimmedPath = String(photoPath).trim();
//                   if (!trimmedPath) return null;
                  
//                   console.log("Processing scammer photo path:", trimmedPath);
                  
//                   // Remove leading slashes if present
//                   const cleanPath = trimmedPath.replace(/^\/+/, '');
                  
//                   // Extract filename if it's a full path
//                   const fileName = cleanPath.includes('/') ? cleanPath.split('/').pop() : cleanPath;
                  
//                   console.log("Final scammer photo filename:", fileName);
                  
//                   const finalUrl = `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
//                   console.log("Generated scammer photo URL:", finalUrl);
                  
//                   return finalUrl;
//                 })
//                 .filter(url => url !== null && url !== '');
//             }
            
//             console.log('Final scammer photo URLs:', photoUrls);
//             setScammerPhotoUrls(photoUrls);
            
//           } catch (photoError) {
//             console.error("Error processing scammer photo URLs:", photoError);
//             setScammerPhotoUrls([]);
//           }
//         } else {
//           console.log('No scammer photos data found');
//           setScammerPhotoUrls([]);
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchScamDetail();
//   }, [id]); 
  
//   // Helper function to format scam value
//   const formatScamValue = (scamValue) => {
//     console.log('formatScamValue called with:', scamValue, 'Type:', typeof scamValue);
    
//     if (!scamValue) {
//       console.log('No scam value provided');
//       return "Not specified";
//     }
    
//     // If it's an object with amount and currency
//     if (typeof scamValue === 'object' && scamValue !== null) {
//       console.log('scamValue is an object:', scamValue);
//       console.log('Available properties:', Object.keys(scamValue));
      
//       // Check for amount and currency properties
//       if (scamValue.amount !== undefined && scamValue.currency) {
//         console.log('Found amount and currency:', scamValue.amount, scamValue.currency);
        
//         // Make sure amount is a valid number
//         const amount = parseFloat(scamValue.amount);
//         if (!isNaN(amount)) {
//           try {
//             return new Intl.NumberFormat(undefined, {
//               style: 'currency',
//               currency: scamValue.currency,
//             }).format(amount);
//           } catch (error) {
//             console.error('Error formatting currency:', error);
//             return `${scamValue.currency} ${amount.toFixed(2)}`;
//           }
//         } else {
//           console.log('Amount is not a valid number:', scamValue.amount);
//           return "Invalid amount";
//         }
//       }
      
//       // If it's an object but missing expected properties
//       console.log('Object format not recognized, available properties:', Object.keys(scamValue));
//       return "Invalid format";
//     }
    
//     // If it's a number, format as currency with default currency (USD)
//     if (typeof scamValue === 'number') {
//       console.log('scamValue is a number:', scamValue);
//       return new Intl.NumberFormat(undefined, {
//         style: 'currency',
//         currency: 'USD',
//       }).format(scamValue);
//     }
    
//     // If it's a string that looks like a number
//     if (typeof scamValue === 'string') {
//       console.log('scamValue is a string:', scamValue);
//       const numericValue = parseFloat(scamValue.replace(/[^\d.-]/g, ''));
//       console.log('Parsed numeric value:', numericValue);
//       if (!isNaN(numericValue)) {
//         return new Intl.NumberFormat(undefined, {
//           style: 'currency',
//           currency: 'USD',
//         }).format(numericValue);
//       }
//       // If it's a string that doesn't parse to a number, return as is
//       return scamValue;
//     }
    
//     // Fallback: convert to string
//     console.log('Using fallback, converting to string:', String(scamValue));
//     return String(scamValue);
//   };
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063F3A]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-2xl mx-auto mt-8">
//         <h2 className="font-bold">Error Loading Report</h2>
//         <p>{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="mt-2 px-4 py-2 bg-[#063F3A] text-white rounded hover:bg-[#052b28]"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!scamDetail) {
//     return (
//       <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg max-w-2xl mx-auto mt-8">
//         No scam report found with ID: {id}
//       </div>
//     );
//   }

//   const reportedDate = new Date(scamDetail.dateReported).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
//       <div className="border-b border-gray-200 pb-4 mb-6">
//         <h1 className="text-3xl font-bold text-[#0F766E] my-3">Alleged Scammer: {scamDetail.scammerName}</h1>
//         <div className="mt-2 flex items-center">
//           <span className="bg-pink-100 border-[2px] border-pink-300 py-[6px] px-2 rounded-full">
//             {scamDetail.scamType}
//           </span>
//           <span className="ml-4 text-gray-600 font-semibold">Case ID: <span className="text-amber-600">{scamDetail.caseId}</span></span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Details</h2>
//           <p className="text-gray-700 mb-6 whitespace-pre-line">{scamDetail.description}</p>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Report Information</h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Scammer Contact</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.telephoneNumbers?.join(',  ')}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Scammer Email Address</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.emailAddress}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Point of First Contact:</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.firstContact}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Account Details</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.scammerAccountNumber}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Total Value of Alleged Scam</h3>
//               <p className="mt-1 text-lg font-semibold text-gray-900">
//                 {formatScamValue(scamDetail.scamValue)}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Reported On</h3>
//               <p className="mt-1 text-gray-900">{reportedDate}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Status</h3>
//               <p className={`mt-1 ${
//                 scamDetail.status === 'verified' 
//                   ? 'text-green-600' 
//                   : 'text-yellow-600'
//               }`}>
//                 {scamDetail.status.charAt(0).toUpperCase() + scamDetail.status.slice(1)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {scammerPhotoUrls.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4">Scammer Photos</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {scammerPhotoUrls.map((url, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={url}
//                   alt={`Scammer Photo ${index + 1}`}
//                   className="w-full h-48 object-cover rounded-lg shadow-sm"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = '/image-placeholder.png';
//                   }}
//                 />
//                 <a 
//                   href={url} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
//                 >
//                   <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
//                     View Full Size
//                   </span>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {imageUrls.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4">Evidence</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {imageUrls.map((url, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={url}
//                   alt={`Evidence ${index + 1}`}
//                   className="w-full h-48 object-cover rounded-lg shadow-sm"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = '/image-placeholder.png';
//                   }}
//                 />
//                 <a 
//                   href={url} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
//                 >
//                   <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
//                     View Full Size
//                   </span>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ScamDetail() {
  const { id } = useParams(); 
  const [scamDetail, setScamDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [scammerPhotoUrls, setScammerPhotoUrls] = useState([]);

  useEffect(() => {
    const fetchScamDetail = async () => {
      console.log(`Starting fetch for ID: ${id}`);
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
        
        console.log('Full API response data:', data);
        setScamDetail(data);

        // Process evidence images - fixed handling
        try {
          let evidenceUrls = [];
          if (data?.evidence) {
            if (Array.isArray(data.evidence)) {
              evidenceUrls = data.evidence
                .map(item => {
                  if (typeof item === 'string') return item;
                  if (item?.type) return item.type;
                  if (item?.url) return item.url;
                  return null;
                })
                .filter(Boolean);
            } else if (typeof data.evidence === 'string') {
              evidenceUrls = data.evidence.split(',').map(s => s.trim()).filter(Boolean);
            }
          }
          
          const processedEvidenceUrls = evidenceUrls.map(path => {
            const fileName = String(path).trim().replace(/^\/+/, '').split('/').pop();
            return `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
          });
          
          setImageUrls(processedEvidenceUrls);
        } catch (imageError) {
          console.error("Error processing evidence:", imageError);
          setImageUrls([]);
        }

        // Process scammer photos - fixed handling
        try {
          let scammerPhotoUrls = [];
          if (data?.scammerPhotos) {
            if (Array.isArray(data.scammerPhotos)) {
              scammerPhotoUrls = data.scammerPhotos
                .map(photo => {
                  if (typeof photo === 'string') return photo;
                  if (photo?.url) return photo.url;
                  if (photo?.path) return photo.path;
                  return null;
                })
                .filter(Boolean);
            }
          }
          
          const processedPhotoUrls = scammerPhotoUrls.map(path => {
            const fileName = String(path).trim().replace(/^\/+/, '').split('/').pop();
            return `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
          });
          
          setScammerPhotoUrls(processedPhotoUrls);
        } catch (photoError) {
          console.error("Error processing scammer photos:", photoError);
          setScammerPhotoUrls([]);
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
  
  // Enhanced currency formatting function
  const formatScamValue = (scamValue) => {
    if (!scamValue) return "Not specified";
    
    // Handle object case (like {amount: 200000, currency: "NGN"})
    if (typeof scamValue === 'object' && scamValue !== null) {
      if (scamValue.amount !== undefined && scamValue.currency) {
        const amount = parseFloat(scamValue.amount);
        if (isNaN(amount)) return "Invalid amount";
        
        // Special handling for Nigerian Naira
        if (scamValue.currency === 'NGN') {
          return `₦${amount.toLocaleString('en-NG')}`;
        }
        
        try {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: scamValue.currency,
          }).format(amount);
        } catch {
          return `${scamValue.currency} ${amount.toLocaleString()}`;
        }
      }
      return "Invalid format";
    }
    
    // Handle other cases (number or string)
    const numericValue = typeof scamValue === 'number' 
      ? scamValue 
      : parseFloat(String(scamValue).replace(/[^\d.-]/g, ''));
    
    if (!isNaN(numericValue)) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(numericValue);
    }
    
    return "Not specified";
  };
  
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
              <h3 className="text-sm font-bold text-gray-500">Scammer Contact</h3>
              <p className="mt-1 text-gray-900">
                {scamDetail.telephoneNumbers?.join(', ') || "Not provided"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Scammer Email Address</h3>
              <p className="mt-1 text-gray-900">{scamDetail.emailAddress || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Point of First Contact:</h3>
              <p className="mt-1 text-gray-900">{scamDetail.firstContact || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Account Details</h3>
              <p className="mt-1 text-gray-900">{scamDetail.scammerAccountNumber || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Total Value of Alleged Scam</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                <span className="bg-red-500">{formatScamValue(scamDetail.scamValue)}</span>
              </p>
            </div> 
            <div>
              <h3 className="text-sm font-bold text-gray-500">Reported On</h3>
              <p className="mt-1 text-gray-900">{reportedDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Status</h3>
              <p className={`mt-1 ${
                scamDetail.status === 'verified' 
                  ? 'text-green-600' 
                  : 'text-yellow-600'
              }`}>
                {scamDetail.status?.charAt(0)?.toUpperCase() + scamDetail.status?.slice(1) || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {scammerPhotoUrls.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Scammer Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scammerPhotoUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Scammer Photo ${index + 1}`}
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
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
                    View Full Size
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

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
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
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