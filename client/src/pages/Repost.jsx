import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";
import { toast } from "react-toastify";

const Repost = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    scammerName: {
      firstName: "",
      surname: "",
      otherNames: "",
    },
    gender: "",
    telephoneNumber1: "",
    telephoneNumber2: "",
    emailAddresses: [""],
    physicalAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
    },
    scamType: "",
    scamLocationType: "", // 'physical' or 'website'
    scamLocation: {
      physical: {
        address: "",
      },
      website: {
        url: "",
      },
    },
    firstContact: "",
    scamValue: {
      amount: "",
      currency: "USD",
    },
    description: "",
    scammerAccountNumber: "",
    evidence: null,
    scammerPhotos: [],
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [scammerPhotosPreview, setScammerPhotosPreview] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScammerNameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      scammerName: {
        ...prev.scammerName,
        [name]: value,
      },
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      physicalAddress: {
        ...prev.physicalAddress,
        [name]: value,
      },
    }));
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...formData.emailAddresses];
    newEmails[index] = value;
    setFormData((prev) => ({
      ...prev,
      emailAddresses: newEmails,
    }));
  };

  const addEmailField = () => {
    setFormData((prev) => ({
      ...prev,
      emailAddresses: [...prev.emailAddresses, ""],
    }));
  };

  const removeEmailField = (index) => {
    const newEmails = formData.emailAddresses.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      emailAddresses: newEmails,
    }));
  };

  const handleScamLocationTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      scamLocationType: value,
    }));
  };

  const handleScamLocationChange = (e) => {
    const { name, value } = e.target;
    const locationType = formData.scamLocationType;

    setFormData((prev) => ({
      ...prev,
      scamLocation: {
        ...prev.scamLocation,
        [locationType]: {
          ...prev.scamLocation[locationType],
          [name]: value,
        },
      },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, evidence: file });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleScammerPhotosChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setScammerPhotosPreview((prev) => [...prev, ...previews]);
    setFormData((prev) => ({
      ...prev,
      scammerPhotos: [...prev.scammerPhotos, ...files],
    }));
  };

  const handleScammerPhotoDelete = (index) => {
    setScammerPhotosPreview((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      scammerPhotos: prev.scammerPhotos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting data", formData);
    setMessage("");

    try {
      let evidenceUrl = "";
      let scammerPhotoUrls = [];

      // Upload Evidence File
      if (formData.evidence) {
        const file = formData.evidence;
        const fileName = `${Date.now()}_${file.name}`;

        const { data, error } = await supabase.storage
          .from("fraud-report-site")
          .upload(fileName, file);

        if (error) {
          console.error("Error uploading image:", error.message);
          toast.error("Failed to upload evidence image.", {
            position: "top-center",
            autoClose: 2000,
          });
          throw new Error("Failed to upload evidence image.");
        }

        const { data: publicData } = supabase.storage
          .from("fraud-report-site")
          .getPublicUrl(fileName);

        evidenceUrl = publicData.publicUrl;
      }

      // Upload Scammer Photos
      if (formData.scammerPhotos && formData.scammerPhotos.length > 0) {
        for (const file of formData.scammerPhotos) {
          const fileName = `scammer_${Date.now()}_${file.name}`;

          const { data, error } = await supabase.storage
            .from("fraud-report-site")
            .upload(fileName, file);

          if (error) {
            console.error("Error uploading scammer photo:", error.message);
            toast.error(`Failed to upload ${file.name}`, {
              position: "top-center",
              autoClose: 2000,
            });
            continue;
          }

          const { data: publicData } = supabase.storage
            .from("fraud-report-site")
            .getPublicUrl(fileName);

          scammerPhotoUrls.push(publicData.publicUrl);
        }
      }

      //   // Prepare the data for submission
      //   const newReport = {
      //     scammerName: `${formData.scammerName.firstName} ${formData.scammerName.surname} ${formData.scammerName.otherNames}`.trim(),
      //     gender: formData.gender,
      //     scamType: formData.scamType,
      //     description: formData.description,
      //     emailAddresses: formData.emailAddresses.filter(email => email.trim() !== ""),
      //     scammerAccountNumber: formData.scammerAccountNumber,
      //     telephoneNumbers: [
      //       formData.telephoneNumber1,
      //       formData.telephoneNumber2,
      //     ].filter(Boolean),
      //     scamLocation: formData.scamLocationType === 'physical'
      //       ? formData.scamLocation.physical.address
      //       : formData.scamLocation.website.url,
      //     scamLocationType: formData.scamLocationType,
      //     firstContact: formData.firstContact,
      //     physicalAddress: `${formData.physicalAddress.line1}, ${formData.physicalAddress.line2}, ${formData.physicalAddress.city}, ${formData.physicalAddress.state}, ${formData.physicalAddress.country}`,
      //     scamValue: {
      //       amount: parseFloat(formData.scamValue.amount),
      //       currency: formData.scamValue.currency,
      //     },
      //     evidence: evidenceUrl,
      //     scammerPhotos: scammerPhotoUrls,
      //   };

      const newReport = {
        scammerName: {
          firstName: formData.scammerName.firstName,
          surname: formData.scammerName.surname,
          otherNames: formData.scammerName.otherNames,
        },
        gender: formData.gender,
        scamType: formData.scamType,
        description: formData.description,
        emailAddresses: formData.emailAddresses.filter(
          (email) => email.trim() !== ""
        ),
        scammerAccountNumber: formData.scammerAccountNumber,
        telephoneNumbers: [
          formData.telephoneNumber1,
          formData.telephoneNumber2,
        ].filter(Boolean),
        scamLocationType: formData.scamLocationType,
        scamLocation: {
          physical: {
            address: formData.scamLocation.physical.address,
          },
          website: {
            url: formData.scamLocation.website.url,
          },
        },
        firstContact: formData.firstContact,
        physicalAddress: {
          line1: formData.physicalAddress.line1,
          line2: formData.physicalAddress.line2,
          city: formData.physicalAddress.city,
          state: formData.physicalAddress.state,
          country: formData.physicalAddress.country,
        },
        scamValue: {
          amount: parseFloat(formData.scamValue.amount),
          currency: formData.scamValue.currency,
        },
        evidence: evidenceUrl ? [evidenceUrl] : [],
        scammerPhotos: scammerPhotoUrls,
      };

      const token = sessionStorage.getItem("authToken");
      const response = await fetch(
        "https://scam-information-system.onrender.com/api/scam-reports",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReport),
        }
      );

      if (response.ok) {
        setMessage("Scam reported successfully!");
        console.log("Submitted Report:", newReport);

        // Reset form
        setFormData({
          scammerName: {
            firstName: "",
            surname: "",
            otherNames: "",
          },
          gender: "",
          telephoneNumber1: "",
          telephoneNumber2: "",
          emailAddresses: [""],
          physicalAddress: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            country: "",
          },
          scamType: "",
          scamLocationType: "",
          scamLocation: {
            physical: {
              address: "",
            },
            website: {
              url: "",
            },
          },
          firstContact: "",
          scamValue: { amount: "", currency: "USD" },
          description: "",
          scammerAccountNumber: "",
          evidence: null,
          scammerPhotos: [],
        });
        setImagePreview(null);
        setScammerPhotosPreview([]);

        toast.success("Scam report submitted successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/dashboard"), 3000);
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.message || "Failed to submit report. Please try again."
        );
        toast.error("Failed to submit report. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "Something went wrong.", {
        position: "top-center",
        autoClose: 2000,
      });
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageDelete = () => {
    setImagePreview(null);
    setFormData({ ...formData, evidence: "" });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-64 fixed lg:relative z-50`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      {/* Main content container */}
      <div className="flex flex-col flex-1">
        {/* Mobile Topbar */}
        <div className="block lg:hidden w-full bg-[#063F3A]">
          <button
            className="cursor-pointer p-4 text-2xl text-white"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>

        {/* Actual page content */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[700px] p-6 my-10">
            <h1 className="text-2xl font-bold text-center text-[#0F766E] mb-2">
              Report a Scam
            </h1>
            <div className="flex justify-center">
              <p className="mb-8 text-sm w-[80%] text-center text-gray-500">
                Please provide details of the fraud case you are a victim of in
                the form below if any.{" "}
                <span className="font-semibold">
                  Note that until verified, this is an allegation.
                </span>
              </p>
            </div>

            {message && (
              <div
                className={`p-4 mb-6 rounded-lg ${
                  message.includes("success")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Scammer Name Fields */}
              <div className="space-y-4">
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Scammer's Name
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      name="firstName"
                      type="text"
                      value={formData.scammerName.firstName}
                      onChange={handleScammerNameChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <input
                      name="surname"
                      type="text"
                      value={formData.scammerName.surname}
                      onChange={handleScammerNameChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Surname"
                    />
                  </div>
                </div>
                <div>
                  <input
                    name="otherNames"
                    type="text"
                    value={formData.scammerName.otherNames}
                    onChange={handleScammerNameChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Other Names (optional)"
                  />
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-[#0F766E]"
                      required
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-[#0F766E]"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>

              {/* Telephone numbers */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Telephone Numbers (1 or 2)
                </label>
                <input
                  name="telephoneNumber1"
                  type="tel"
                  value={formData.telephoneNumber1}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                  placeholder="Primary phone number"
                />
                <input
                  name="telephoneNumber2"
                  type="tel"
                  value={formData.telephoneNumber2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Secondary phone number (optional)"
                />
              </div>

              {/* Email Addresses - Multiple */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Email Addresses
                </label>
                {formData.emailAddresses.map((email, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Email address ${index + 1}`}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeEmailField(index)}
                        className="ml-2 px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEmailField}
                  className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  + Add Another Email
                </button>
              </div>

              {/* Physical Address - Multiple Fields */}
              <div className="space-y-2">
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Physical Address (if known)
                </label>
                <input
                  name="line1"
                  type="text"
                  value={formData.physicalAddress.line1}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Address Line 1"
                />
                <input
                  name="line2"
                  type="text"
                  value={formData.physicalAddress.line2}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Address Line 2 (optional)"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    name="city"
                    type="text"
                    value={formData.physicalAddress.city}
                    onChange={handleAddressChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City"
                  />
                  <input
                    name="state"
                    type="text"
                    value={formData.physicalAddress.state}
                    onChange={handleAddressChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="State/Province"
                  />
                  <input
                    name="country"
                    type="text"
                    value={formData.physicalAddress.country}
                    onChange={handleAddressChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Country"
                  />
                </div>
              </div>

              {/* Scam Type */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Type of Scam
                </label>
                <select
                  name="scamType"
                  value={formData.scamType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select scam type</option>
                  <option value="Phishing">Phishing</option>
                  <option value="Investment Scam">Investment Scam</option>
                  <option value="Romance Scam">Romance Scam</option>
                  <option value="Fake Marketplace">Fake Marketplace</option>
                  <option value="Impersonation">Impersonation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Location of Scam - Conditional Fields */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Location of Scam
                </label>
                <div className="mb-3">
                  <select
                    name="scamLocationType"
                    value={formData.scamLocationType}
                    onChange={handleScamLocationTypeChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select location type</option>
                    <option value="physical">Physical Location</option>
                    <option value="website">Website/Online</option>
                  </select>
                </div>

                {formData.scamLocationType === "physical" && (
                  <input
                    name="address"
                    type="text"
                    value={formData.scamLocation.physical.address}
                    onChange={handleScamLocationChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Physical address where scam occurred"
                  />
                )}

                {formData.scamLocationType === "website" && (
                  <input
                    name="url"
                    type="url"
                    value={formData.scamLocation.website.url}
                    onChange={handleScamLocationChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Website URL (e.g., https://example.com)"
                  />
                )}
              </div>

              {/* Point of First Contact */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Point of First Contact
                </label>
                <div className="space-y-2">
                  {/* Predefined Options */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "WhatsApp",
                      "Telegram",
                      "TikTok",
                      "YouTube",
                      "Facebook",
                      "Instagram",
                    ].map((platform) => (
                      <label
                        key={platform}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="firstContact"
                          value={platform}
                          checked={formData.firstContact === platform}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {platform}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Other Option */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="firstContact"
                      value="other"
                      checked={
                        formData.firstContact === "other" ||
                        (formData.firstContact &&
                          ![
                            "WhatsApp",
                            "Telegram",
                            "TikTok",
                            "YouTube",
                            "Facebook",
                            "Instagram",
                          ].includes(formData.firstContact))
                      }
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Other</span>
                  </label>

                  {/* Custom Input Field */}
                  {(formData.firstContact === "other" ||
                    (formData.firstContact &&
                      ![
                        "WhatsApp",
                        "Telegram",
                        "TikTok",
                        "YouTube",
                        "Facebook",
                        "Instagram",
                      ].includes(formData.firstContact))) && (
                    <input
                      name="firstContactOther"
                      type="text"
                      value={formData.firstContactOther || ""}
                      onChange={(e) => {
                        handleChange(e);
                        // Also update the main firstContact field with the custom value
                        handleChange({
                          target: {
                            name: "firstContact",
                            value: e.target.value,
                          },
                        });
                      }}
                      placeholder="Please specify..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ml-6"
                    />
                  )}
                </div>

                {/* Ad-related Questions */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="mb-3">
                    <label className="block text-md font-medium text-gray-500 mb-2">
                      Was this contact through an advertisement?
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="wasThoughAd"
                          value="yes"
                          checked={formData.wasThoughAd === "yes"}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="wasThoughAd"
                          value="no"
                          checked={formData.wasThoughAd === "no"}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Ad URL Input - shown only if "Yes" is selected */}
                  {formData.wasThoughAd === "yes" && (
                    <div>
                      <label className="block text-md font-medium text-gray-500 mb-1">
                        Advertisement URL
                      </label>
                      <input
                        name="adUrl"
                        type="url"
                        value={formData.adUrl || ""}
                        onChange={handleChange}
                        placeholder="https://example.com/ad-link"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Please provide the URL of the advertisement where you
                        first encountered the scammer
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Value of Scam */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Value of Scam
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={formData.scamValue?.amount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        scamValue: {
                          ...prev.scamValue,
                          amount: e.target.value,
                        },
                      }))
                    }
                    required
                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Amount lost"
                  />
                  <select
                    value={formData.scamValue?.currency}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        scamValue: {
                          ...prev.scamValue,
                          currency: e.target.value,
                        },
                      }))
                    }
                    required
                    className="w-1/4 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="NGN">NGN</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  How did the Scam happen?
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide detailed description of what happened..."
                />
              </div>

              {/* Photos of Scammer */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Photos of Scammer (if available)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScammerPhotosChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  multiple
                />
              </div>

              {/* Upload Evidence */}
              <div>
                <label className="block text-md font-medium text-gray-500 mb-1">
                  Upload Evidence (Screenshots, documents, etc.)
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Bank Account Details */}
              <div className="space-y-3">
                <label className="block text-md font-medium text-gray-500 mb-2">
                  Scammer's Bank Account Details (if applicable)
                </label>

                {/* Bank Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Bank Name
                  </label>
                  <input
                    name="scammerBankName"
                    type="text"
                    value={formData.scammerBankName || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Fidelity Bank, GTB Bank, Kuda MFB"
                  />
                </div>

                {/* Account Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Account Number
                  </label>
                  <input
                    name="scammerAccountNumber"
                    type="text"
                    value={formData.scammerAccountNumber || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Account number used in scam"
                  />
                </div>
              </div>

              {/* Image Preview Section */}
              {(imagePreview || scammerPhotosPreview.length > 0) && (
                <div className="mt-4 space-y-4">
                  {imagePreview && (
                    <div className="flex justify-between items-center">
                      <img
                        src={imagePreview}
                        alt="Evidence Preview"
                        className="max-w-[200px] h-auto rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleImageDelete}
                        className="text-xl font-semibold text-red-600 hover:text-red-700 ml-4"
                      >
                        DELETE
                      </button>
                    </div>
                  )}
                  {scammerPhotosPreview.map((photo, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <img
                        src={photo}
                        alt={`Scammer Photo ${index + 1}`}
                        className="max-w-[200px] h-auto rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleScammerPhotoDelete(index)}
                        className="text-xl font-semibold text-red-600 hover:text-red-700 ml-4"
                      >
                        DELETE
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 cursor-pointer bg-[#0F766E] text-white font-medium rounded-md hover:bg-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repost;
