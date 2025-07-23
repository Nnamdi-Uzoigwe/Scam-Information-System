import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ScamDetail() {
  const { id } = useParams();
  const [scamDetail, setScamDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [scammerPhotoUrls, setScammerPhotoUrls] = useState([]);

  const supabaseBaseURL =
    "https://nwoubihqkqhynhaqbssi.supabase.co/storage/v1/object/public/fraud-report-site/";

  useEffect(() => {
    const fetchScamDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://scam-information-system.onrender.com/api/scam-reports/${id}`
        );
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
          ? data.evidence.split(",").map((s) => s.trim())
          : [];

        const processedEvidenceUrls = evidencePaths.map((path) => {
          return path.startsWith("http")
            ? path
            : `${supabaseBaseURL}${path.replace(/^\/+/, "")}`;
        });

        setImageUrls(processedEvidenceUrls);

        // Scammer photos
        const photoPaths = Array.isArray(data.scammerPhotos)
          ? data.scammerPhotos
          : [];

        const processedPhotoUrls = photoPaths.map((path) => {
          return path.startsWith("http")
            ? path
            : `${supabaseBaseURL}${path.replace(/^\/+/, "")}`;
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

    if (typeof scamValue === "object" && scamValue !== null) {
      const amount = parseFloat(scamValue.amount);
      if (isNaN(amount)) return "Invalid amount";
      if (scamValue.currency === "NGN") {
        return `₦${amount.toLocaleString("en-NG")}`;
      }
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: scamValue.currency,
        }).format(amount);
      } catch {
        return `${scamValue.currency} ${amount.toLocaleString()}`;
      }
    }

    const numericValue = parseFloat(String(scamValue).replace(/[^\d.-]/g, ""));
    if (!isNaN(numericValue)) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
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

  const reportedDate = new Date(scamDetail.dateReported).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-[#0F766E] my-3">
          Alleged Scammer: {scamDetail.scammerName?.firstName || ""}{" "}
          {scamDetail.scammerName?.surname || ""}
        </h1>
        <div className="mt-2 flex items-center">
          <span className="bg-pink-100 border-[2px] border-pink-300 py-[6px] px-2 rounded-full">
            {scamDetail.scamType}
          </span>
          <span className="ml-4 text-gray-600 font-semibold">
            Case ID: <span className="text-amber-600">{scamDetail.caseId}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {scamDetail.description}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Report Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-500">
                Scammer Contact
              </h3>
              <p className="mt-1 text-gray-900">
                {scamDetail.telephoneNumbers?.join(", ") || "Not provided"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500">
                Scammer Email Address(es)
              </h3>
              <p className="mt-1 text-gray-900">
                {Array.isArray(scamDetail.emailAddresses) &&
                scamDetail.emailAddresses.length > 0
                  ? scamDetail.emailAddresses.join(", ")
                  : "Not provided"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500">
                Point of First Contact
              </h3>
              <p className="mt-1 text-gray-900">
                {scamDetail.firstContact
                  ? scamDetail.firstContact
                  : "Not provided"}
              </p>

              {scamDetail.wasThoughAd !== undefined && (
                <p className="mt-1 text-gray-900">
                  Contact was through ad:{" "}
                  <span className="font-semibold">
                    {scamDetail.wasThoughAd === "yes" ? "Yes" : "No"}
                  </span>
                </p>
              )}

              {scamDetail.wasThoughAd === "yes" && scamDetail.adUrl && (
                <p className="mt-1 text-blue-700 underline break-words">
                  <a
                    href={scamDetail.adUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Advertisement Link
                  </a>
                </p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500">
                Scammer Account Number
              </h3>
              <p className="mt-1 text-gray-900">
                {scamDetail.scammerAccountNumber || "Not provided"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500">
                Scammer Physical Address
              </h3>
              <p className="mt-1 text-gray-900">
                {scamDetail.physicalAddress
                  ? `${scamDetail.physicalAddress.line1 || ""}, ${
                      scamDetail.physicalAddress.line2 || ""
                    }, ${scamDetail.physicalAddress.city || ""}, ${
                      scamDetail.physicalAddress.state || ""
                    }, ${scamDetail.physicalAddress.country || ""}`
                  : "Not provided"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500">Scam Location</h3>
              <p className="mt-1 text-gray-900">
                {scamDetail.scamLocationType === "physical"
                  ? scamDetail.scamLocation?.physical?.address
                  : scamDetail.scamLocation?.website?.url || "Not provided"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500">Scam Value</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formatScamValue(scamDetail.scamValue)}
              </p>
            </div>

            {/* Scammer Bank Account Details */}
            {(scamDetail?.scammerBankName ||
              scamDetail?.scammerAccountNumber) && (
              <div className="mt-4 space-y-2">
                <h3 className="text-md font-bold text-gray-700">
                  Bank Account Details
                </h3>

                {scamDetail.scammerBankName && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Bank Name:{" "}
                    </span>
                    <span className="text-gray-900">
                      {scamDetail.scammerBankName}
                    </span>
                  </div>
                )}

                {scamDetail.scammerAccountNumber && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Account Number:{" "}
                    </span>
                    <span className="text-gray-900">
                      {scamDetail.scammerAccountNumber}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold text-gray-500">Reported On</h3>
              <p className="mt-1 text-gray-900">{reportedDate}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500">Status</h3>
              <p
                className={`mt-1 ${
                  scamDetail.status === "verified"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {scamDetail.status?.charAt(0)?.toUpperCase() +
                  scamDetail.status?.slice(1) || "Unknown"}
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
