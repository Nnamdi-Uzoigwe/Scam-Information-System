// // import { useParams } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import { supabase } from "../lib/supabaseClient";

// // export default function ScamDetail() {
// //   const { id } = useParams(); 
// //   const [scamDetail, setScamDetail] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [imageUrls, setImageUrls] = useState([]);
// //   const [scammerPhotoUrls, setScammerPhotoUrls] = useState([]);

// //   useEffect(() => {
// //     const fetchScamDetail = async () => {
// //       console.log(`Starting fetch for ID: ${id}`);
// //       try {
// //         setLoading(true);
// //         setError(null);
        
// //         // Fetch scam report data
// //         const response = await fetch(`https://scam-information-system.onrender.com/api/scam-reports/${id}`);
        
// //         if (!response.ok) {
// //           const errorData = await response.json();
// //           throw new Error(errorData.message || "Failed to fetch scam details");
// //         }
        
// //         const data = await response.json();
        
// //         if (!data) {
// //           throw new Error("Scam report data is empty");
// //         }
        
// //         console.log('Full API response data:', data);
// //         setScamDetail(data);

// //         // Process evidence images - fixed handling
// //         try {
// //           let evidenceUrls = [];
// //           if (data?.evidence) {
// //             if (Array.isArray(data.evidence)) {
// //               evidenceUrls = data.evidence
// //                 .map(item => {
// //                   if (typeof item === 'string') return item;
// //                   if (item?.type) return item.type;
// //                   if (item?.url) return item.url;
// //                   return null;
// //                 })
// //                 .filter(Boolean);
// //             } else if (typeof data.evidence === 'string') {
// //               evidenceUrls = data.evidence.split(',').map(s => s.trim()).filter(Boolean);
// //             }
// //           }
          
// //           // const processedEvidenceUrls = evidenceUrls.map(path => {
// //           //   const fileName = String(path).trim().replace(/^\/+/, '').split('/').pop();
// //           //   return `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
// //           // });
// //           const processedEvidenceUrls = evidenceUrls.map(path => {
// //           if (path.startsWith("http")) return path;
// //           const fileName = String(path).trim().replace(/^\/+/, '').split('/').pop();
// //           return `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
// //           });
          
// //           setImageUrls(processedEvidenceUrls);
// //         } catch (imageError) {
// //           console.error("Error processing evidence:", imageError);
// //           setImageUrls([]);
// //         }

// //         // Process scammer photos - fixed handling
// //         try {
// //           let scammerPhotoUrls = [];
// //           if (data?.scammerPhotos) {
// //             if (Array.isArray(data.scammerPhotos)) {
// //               scammerPhotoUrls = data.scammerPhotos
// //                 .map(photo => {
// //                   if (typeof photo === 'string') return photo;
// //                   if (photo?.url) return photo.url;
// //                   if (photo?.path) return photo.path;
// //                   return null;
// //                 })
// //                 .filter(Boolean);
// //             }
// //           }
          
// //           const processedPhotoUrls = scammerPhotoUrls.map(path => {
// //             const fileName = String(path).trim().replace(/^\/+/, '').split('/').pop();
// //             return `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
// //           });
          
// //           setScammerPhotoUrls(processedPhotoUrls);
// //         } catch (photoError) {
// //           console.error("Error processing scammer photos:", photoError);
// //           setScammerPhotoUrls([]);
// //         }
// //       } catch (err) {
// //         setError(err.message);
// //         console.error("Fetch error:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     fetchScamDetail();
// //   }, [id]); 
  
// //   // Enhanced currency formatting function
// //   const formatScamValue = (scamValue) => {
// //     if (!scamValue) return "Not specified";
    
// //     // Handle object case (like {amount: 200000, currency: "NGN"})
// //     if (typeof scamValue === 'object' && scamValue !== null) {
// //       if (scamValue.amount !== undefined && scamValue.currency) {
// //         const amount = parseFloat(scamValue.amount);
// //         if (isNaN(amount)) return "Invalid amount";
        
// //         // Special handling for Nigerian Naira
// //         if (scamValue.currency === 'NGN') {
// //           return `₦${amount.toLocaleString('en-NG')}`;
// //         }
        
// //         try {
// //           return new Intl.NumberFormat('en-US', {
// //             style: 'currency',
// //             currency: scamValue.currency,
// //           }).format(amount);
// //         } catch {
// //           return `${scamValue.currency} ${amount.toLocaleString()}`;
// //         }
// //       }
// //       return "Invalid format";
// //     }
    
// //     // Handle other cases (number or string)
// //     const numericValue = typeof scamValue === 'number' 
// //       ? scamValue 
// //       : parseFloat(String(scamValue).replace(/[^\d.-]/g, ''));
    
// //     if (!isNaN(numericValue)) {
// //       return new Intl.NumberFormat('en-US', {
// //         style: 'currency',
// //         currency: 'USD',
// //       }).format(numericValue);
// //     }
    
// //     return "Not specified";
// //   };
  
// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063F3A]"></div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-2xl mx-auto mt-8">
// //         <h2 className="font-bold">Error Loading Report</h2>
// //         <p>{error}</p>
// //         <button 
// //           onClick={() => window.location.reload()}
// //           className="mt-2 px-4 py-2 bg-[#063F3A] text-white rounded hover:bg-[#052b28]"
// //         >
// //           Try Again
// //         </button>
// //       </div>
// //     );
// //   }

// //   if (!scamDetail) {
// //     return (
// //       <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg max-w-2xl mx-auto mt-8">
// //         No scam report found with ID: {id}
// //       </div>
// //     );
// //   }

// //   const reportedDate = new Date(scamDetail.dateReported).toLocaleDateString('en-US', {
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric'
// //   });

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
// //       <div className="border-b border-gray-200 pb-4 mb-6">
// //         <h1 className="text-3xl font-bold text-[#0F766E] my-3">Alleged Scammer: {scamDetail.scammerName}</h1>
// //         <div className="mt-2 flex items-center">
// //           <span className="bg-pink-100 border-[2px] border-pink-300 py-[6px] px-2 rounded-full">
// //             {scamDetail.scamType}
// //           </span>
// //           <span className="ml-4 text-gray-600 font-semibold">Case ID: <span className="text-amber-600">{scamDetail.caseId}</span></span>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4">Details</h2>
// //           <p className="text-gray-700 mb-6 whitespace-pre-line">{scamDetail.description}</p>
// //         </div>

// //         <div className="bg-gray-50 p-6 rounded-lg">
// //           <h2 className="text-xl font-semibold mb-4">Report Information</h2>
// //           <div className="space-y-4">
// //             <div>
// //               <h3 className="text-sm font-bold text-gray-500">Scammer Contact</h3>
// //               <p className="mt-1 text-gray-900">
// //                 {scamDetail.telephoneNumbers?.join(', ') || "Not provided"}
// //               </p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm font-bold text-gray-500">Scammer Email Address</h3>
// //               <p className="mt-1 text-gray-900">{scamDetail.emailAddress || "Not provided"}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm font-bold text-gray-500">Point of First Contact:</h3>
// //               <p className="mt-1 text-gray-900">{scamDetail.firstContact || "Not provided"}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm font-bold text-gray-500">Account Details</h3>
// //               <p className="mt-1 text-gray-900">{scamDetail.scammerAccountNumber || "Not provided"}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm font-bold text-gray-500">Total Value of Alleged Scam</h3>
// //               <p className="mt-1 text-lg font-semibold text-gray-900">
// //                 {formatScamValue(scamDetail.scamValue)}
// //               </p>
// //             </div> 
// //             <div>
// //               <h3 className="text-sm font-bold text-gray-500">Reported On</h3>
// //               <p className="mt-1 text-gray-900">{reportedDate}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm font-bold text-gray-500">Status</h3>
// //               <p className={`mt-1 ${
// //                 scamDetail.status === 'verified' 
// //                   ? 'text-green-600' 
// //                   : 'text-yellow-600'
// //               }`}>
// //                 {scamDetail.status?.charAt(0)?.toUpperCase() + scamDetail.status?.slice(1) || "Unknown"}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {scammerPhotoUrls.length > 0 && (
// //         <div className="mt-8">
// //           <h2 className="text-xl font-semibold mb-4">Scammer Photos</h2>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {scammerPhotoUrls.map((url, index) => (
// //               <div key={index} className="relative group">
// //                 <img
// //                   src={url}
// //                   alt={`Scammer Photo ${index + 1}`}
// //                   className="w-full h-48 object-cover rounded-lg shadow-sm"
// //                   onError={(e) => {
// //                     e.target.onerror = null;
// //                     e.target.src = '/image-placeholder.png';
// //                   }}
// //                 />
// //                 <a 
// //                   href={url} 
// //                   target="_blank" 
// //                   rel="noopener noreferrer"
// //                   className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
// //                 >
// //                   <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
// //                     View Full Size
// //                   </span>
// //                 </a>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {imageUrls.length > 0 && (
// //         <div className="mt-8">
// //           <h2 className="text-xl font-semibold mb-4">Evidence</h2>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             {imageUrls.map((url, index) => (
// //               <div key={index} className="relative group">
// //                 <img
// //                   src={url}
// //                   alt={`Evidence ${index + 1}`}
// //                   className="w-full h-48 object-cover rounded-lg shadow-sm"
// //                   onError={(e) => {
// //                     e.target.onerror = null;
// //                     e.target.src = '/image-placeholder.png';
// //                   }}
// //                 />
// //                 <a 
// //                   href={url} 
// //                   target="_blank" 
// //                   rel="noopener noreferrer"
// //                   className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
// //                 >
// //                   <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-3 py-1 rounded-lg transition-all duration-200">
// //                     View Full Size
// //                   </span>
// //                 </a>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

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
        
//         console.log('Full API response data:', data);
//         setScamDetail(data);

//         // Process evidence images - FIXED
//         try {
//           let evidenceUrls = [];
//           if (data?.evidence) {
//             if (Array.isArray(data.evidence)) {
//               evidenceUrls = data.evidence
//                 .map(item => {
//                   if (typeof item === 'string') return item;
//                   if (item?.type) return item.type;
//                   if (item?.url) return item.url;
//                   return null;
//                 })
//                 .filter(Boolean);
//             } else if (typeof data.evidence === 'string') {
//               evidenceUrls = data.evidence.split(',').map(s => s.trim()).filter(Boolean);
//             }
//           }
          
//           // FIXED: Don't process URLs that are already complete
//           const processedEvidenceUrls = evidenceUrls.map(path => {
//             // If it's already a complete URL, return as-is
//             if (path.startsWith("http")) return path;
            
//             // Only process partial paths
//             const fileName = String(path).trim().replace(/^\/+/, '').split('/').pop();
//             return `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
//           });
          
//           setImageUrls(processedEvidenceUrls);
//           console.log('Processed evidence URLs:', processedEvidenceUrls);
//         } catch (imageError) {
//           console.error("Error processing evidence:", imageError);
//           setImageUrls([]);
//         }

//         // Process scammer photos - FIXED
//         try {
//           let scammerPhotoUrls = [];
//           if (data?.scammerPhotos && Array.isArray(data.scammerPhotos) && data.scammerPhotos.length > 0) {
//             scammerPhotoUrls = data.scammerPhotos
//               .map(photo => {
//                 if (typeof photo === 'string') return photo;
//                 if (photo?.url) return photo.url;
//                 if (photo?.path) return photo.path;
//                 return null;
//               })
//               .filter(Boolean);
//           }
          
//           // FIXED: Don't process URLs that are already complete
//           const processedPhotoUrls = scammerPhotoUrls.map(path => {
//             // If it's already a complete URL, return as-is
//             if (path.startsWith("http")) return path;
            
//             // Only process partial paths
//             const fileName = String(path).trim().replace(/^\/+/, '').split('/').pop();
//             return `https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/${fileName}`;
//           });
          
//           setScammerPhotoUrls(processedPhotoUrls);
//           console.log('Processed scammer photo URLs:', processedPhotoUrls);
//         } catch (photoError) {
//           console.error("Error processing scammer photos:", photoError);
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
  
//   // Enhanced currency formatting function
//   const formatScamValue = (scamValue) => {
//     if (!scamValue) return "Not specified";
    
//     // Handle object case (like {amount: 200000, currency: "NGN"})
//     if (typeof scamValue === 'object' && scamValue !== null) {
//       if (scamValue.amount !== undefined && scamValue.currency) {
//         const amount = parseFloat(scamValue.amount);
//         if (isNaN(amount)) return "Invalid amount";
        
//         // Special handling for Nigerian Naira
//         if (scamValue.currency === 'NGN') {
//           return `₦${amount.toLocaleString('en-NG')}`;
//         }
        
//         try {
//           return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: scamValue.currency,
//           }).format(amount);
//         } catch {
//           return `${scamValue.currency} ${amount.toLocaleString()}`;
//         }
//       }
//       return "Invalid format";
//     }
    
//     // Handle other cases (number or string)
//     const numericValue = typeof scamValue === 'number' 
//       ? scamValue 
//       : parseFloat(String(scamValue).replace(/[^\d.-]/g, ''));
    
//     if (!isNaN(numericValue)) {
//       return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//       }).format(numericValue);
//     }
    
//     return "Not specified";
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
//               <p className="mt-1 text-gray-900">
//                 {scamDetail.telephoneNumbers?.join(', ') || "Not provided"}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Scammer Email Address</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.emailAddress || "Not provided"}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Point of First Contact:</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.firstContact || "Not provided"}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-bold text-gray-500">Account Details</h3>
//               <p className="mt-1 text-gray-900">{scamDetail.scammerAccountNumber || "Not provided"}</p>
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
//                 {scamDetail.status?.charAt(0)?.toUpperCase() + scamDetail.status?.slice(1) || "Unknown"}
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
//                     console.error(`Failed to load scammer photo: ${url}`);
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
//                     console.error(`Failed to load evidence image: ${url}`);
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

//       {/* Show message if no images are available */}
//       {imageUrls.length === 0 && scammerPhotoUrls.length === 0 && (
//         <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
//           <p className="text-gray-600">No images available for this scam report.</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ScamDetail() {
  const { id } = useParams(); 
  const [scamDetail, setScamDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [scammerPhotoUrls, setScammerPhotoUrls] = useState([]);

  const supabaseBaseURL = "https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/";

  useEffect(() => {
    const fetchScamDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://scam-information-system.onrender.com/api/scam-reports/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch scam details");
        }

        const data = await response.json();
        if (!data) throw new Error("Scam report data is empty");

        setScamDetail(data);

        // Evidence images
        const evidencePaths = Array.isArray(data.evidence)
          ? data.evidence
          : typeof data.evidence === "string"
            ? data.evidence.split(",").map(s => s.trim())
            : [];

        const processedEvidenceUrls = evidencePaths.map(path => {
          return path.startsWith("http") ? path : `${supabaseBaseURL}${path.replace(/^\/+/, "")}`;
        });

        setImageUrls(processedEvidenceUrls);

        // Scammer photos
        const photoPaths = Array.isArray(data.scammerPhotos)
          ? data.scammerPhotos
          : [];

        const processedPhotoUrls = photoPaths.map(path => {
          return path.startsWith("http") ? path : `${supabaseBaseURL}${path.replace(/^\/+/, "")}`;
        });

        setScammerPhotoUrls(processedPhotoUrls);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScamDetail();
  }, [id]);

  const formatScamValue = (scamValue) => {
    if (!scamValue) return "Not specified";

    if (typeof scamValue === 'object' && scamValue !== null) {
      const amount = parseFloat(scamValue.amount);
      if (isNaN(amount)) return "Invalid amount";
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

    const numericValue = parseFloat(String(scamValue).replace(/[^\d.-]/g, ''));
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

        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Report Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-500">Scammer Contact</h3>
              <p className="mt-1 text-gray-900">{scamDetail.telephoneNumbers?.join(', ') || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Scammer Email Address</h3>
              <p className="mt-1 text-gray-900">{scamDetail.emailAddress || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">First Contact</h3>
              <p className="mt-1 text-gray-900">{scamDetail.firstContact || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Scammer Account Number</h3>
              <p className="mt-1 text-gray-900">{scamDetail.scammerAccountNumber || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Scam Value</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{formatScamValue(scamDetail.scamValue)}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Reported On</h3>
              <p className="mt-1 text-gray-900">{reportedDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500">Status</h3>
              <p className={`mt-1 ${scamDetail.status === 'verified' ? 'text-green-600' : 'text-yellow-600'}`}>
                {scamDetail.status?.charAt(0)?.toUpperCase() + scamDetail.status?.slice(1) || "Unknown"}
              </p>
            </div>
          </div>
        </div> */}
        <div className="bg-gray-50 p-6 rounded-lg">
  <h2 className="text-xl font-semibold mb-4">Report Information</h2>
  <div className="space-y-4">
    <div>
      <h3 className="text-sm font-bold text-gray-500">Scammer Contact</h3>
      <p className="mt-1 text-gray-900">{scamDetail.telephoneNumbers?.join(', ') || "Not provided"}</p>
    </div>

    <div>
      <h3 className="text-sm font-bold text-gray-500">Scammer Email Address(es)</h3>
      <p className="mt-1 text-gray-900">
        {Array.isArray(scamDetail.emailAddresses) && scamDetail.emailAddresses.length > 0
          ? scamDetail.emailAddresses.join(', ')
          : "Not provided"}
      </p>
    </div>

    <div>
      <h3 className="text-sm font-bold text-gray-500">First Contact</h3>
      <p className="mt-1 text-gray-900">{scamDetail.firstContact || "Not provided"}</p>
    </div>

    <div>
      <h3 className="text-sm font-bold text-gray-500">Scammer Account Number</h3>
      <p className="mt-1 text-gray-900">{scamDetail.scammerAccountNumber || "Not provided"}</p>
    </div>

    <div>
      <h3 className="text-sm font-bold text-gray-500">Scammer Physical Address</h3>
      <p className="mt-1 text-gray-900">
        {scamDetail.physicalAddress
          ? `${scamDetail.physicalAddress.line1 || ''}, ${scamDetail.physicalAddress.line2 || ''}, ${scamDetail.physicalAddress.city || ''}, ${scamDetail.physicalAddress.state || ''}, ${scamDetail.physicalAddress.country || ''}`
          : "Not provided"}
      </p>
    </div>

    <div>
      <h3 className="text-sm font-bold text-gray-500">Scam Location</h3>
      <p className="mt-1 text-gray-900">
        {scamDetail.scamLocationType === 'physical'
          ? scamDetail.scamLocation?.physical?.address
          : scamDetail.scamLocation?.website?.url || "Not provided"}
      </p>
    </div>

    <div>
      <h3 className="text-sm font-bold text-gray-500">Scam Value</h3>
      <p className="mt-1 text-lg font-semibold text-gray-900">{formatScamValue(scamDetail.scamValue)}</p>
    </div>

    <div>
      <h3 className="text-sm font-bold text-gray-500">Reported On</h3>
      <p className="mt-1 text-gray-900">{reportedDate}</p>
    </div>

    <div>
      <h3 className="text-sm font-bold text-gray-500">Status</h3>
      <p className={`mt-1 ${scamDetail.status === 'verified' ? 'text-green-600' : 'text-yellow-600'}`}>
        {scamDetail.status?.charAt(0)?.toUpperCase() + scamDetail.status?.slice(1) || "Unknown"}
      </p>
    </div>
  </div>
</div>

      </div>

      {scammerPhotoUrls.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Scammer Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scammerPhotoUrls.map((url, index) => (
              <div key={index} className="bg-white rounded-lg shadow">
                <img
                  src={url}
                  alt={`Scammer ${index + 1}`}
                  className="w-full object-contain max-h-96 rounded-lg bg-white p-2"
                  onError={(e) => {
                    console.error(`Error loading scammer photo: ${url}`);
                    e.target.onerror = null;
                    e.target.src = "/image-placeholder.png";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {imageUrls.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Evidence</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {imageUrls.map((url, index) => (
              <div key={index} className="bg-white rounded-lg shadow">
                <img
                  src={url}
                  alt={`Evidence ${index + 1}`}
                  className="w-full object-contain max-h-96 rounded-lg bg-white p-2"
                  onError={(e) => {
                    console.error(`Error loading evidence image: ${url}`);
                    e.target.onerror = null;
                    e.target.src = "/image-placeholder.png";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {imageUrls.length === 0 && scammerPhotoUrls.length === 0 && (
        <div className="mt-8 p-4 bg-gray-100 text-gray-600 text-center rounded">
          No images available for this report.
        </div>
      )}
    </div>
  );
}
