import { useState } from "react";
import { FiUpload, FiAlertTriangle, FiCalendar, FiUser, FiMail, FiPhone, FiGlobe, FiDollarSign } from "react-icons/fi";

export default function ReportScam() {
  const [formData, setFormData] = useState({
    scamType: '',
    scamTitle: '',
    description: '',
    dateOccurred: '',
    amountLost: '',
    scammerDetails: '',
    contactMethod: '',
    yourName: '',
    yourEmail: '',
    yourPhone: '',
    evidence: [],
    termsAgreed: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      evidence: [...prev.evidence, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        scamType: '',
        scamTitle: '',
        description: '',
        dateOccurred: '',
        amountLost: '',
        scammerDetails: '',
        contactMethod: '',
        yourName: '',
        yourEmail: '',
        yourPhone: '',
        evidence: [],
        termsAgreed: false
      });
    }, 2000);
  };

  const scamTypes = [
    "Investment Fraud",
    "Phishing Scam",
    "Tech Support Scam",
    "Romance Scam",
    "Lottery/Sweepstakes Scam",
    "Impersonation Scam",
    "Fake Online Store",
    "Other"
  ];

  const contactMethods = [
    "Email",
    "Phone Call",
    "Text Message",
    "Social Media",
    "Website",
    "In Person",
    "Other"
  ];

  return (
    <div className="min-h-screen transition-all duration-300">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Report a Scam
            </h1>
            <p className="mt-3 text-xl text-gray-600">
              Help protect others by sharing details of fraudulent activity you've encountered
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Report Submitted Successfully</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Thank you for your submission. Our team will review your report and it may help prevent others from falling victim to similar scams.</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Submit Another Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-6">
                {/* Scam Details Section */}
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Scam Details</h2>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="scamType" className="block text-sm font-medium text-gray-700">
                        Type of Scam *
                      </label>
                      <div className="mt-1 relative">
                        <select
                          id="scamType"
                          name="scamType"
                          value={formData.scamType}
                          onChange={handleChange}
                          required
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="">Select a scam type</option>
                          {scamTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <FiAlertTriangle className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="scamTitle" className="block text-sm font-medium text-gray-700">
                        Scam Title/Description *
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="scamTitle"
                          name="scamTitle"
                          value={formData.scamTitle}
                          onChange={handleChange}
                          required
                          className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Detailed Description *
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleChange}
                          required
                          className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Please describe what happened in detail, including any conversations, promises made, and how you discovered it was a scam..."
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="dateOccurred" className="block text-sm font-medium text-gray-700">
                        Date Occurred *
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="date"
                          id="dateOccurred"
                          name="dateOccurred"
                          value={formData.dateOccurred}
                          onChange={handleChange}
                          required
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        />
                        <FiCalendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="amountLost" className="block text-sm font-medium text-gray-700">
                        Amount Lost (if applicable)
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="amountLost"
                          name="amountLost"
                          value={formData.amountLost}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="block w-full pl-7 pr-12 py-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="0.00"
                        />
                        <FiDollarSign className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700">
                        How did the scammer contact you? *
                      </label>
                      <div className="mt-1 relative">
                        <select
                          id="contactMethod"
                          name="contactMethod"
                          value={formData.contactMethod}
                          onChange={handleChange}
                          required
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="">Select contact method</option>
                          {contactMethods.map(method => (
                            <option key={method} value={method}>{method}</option>
                          ))}
                        </select>
                        <FiPhone className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="scammerDetails" className="block text-sm font-medium text-gray-700">
                        Scammer Details (names, phone numbers, emails, websites, social media profiles)
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="scammerDetails"
                          name="scammerDetails"
                          rows={3}
                          value={formData.scammerDetails}
                          onChange={handleChange}
                          className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Provide any identifying information about the scammer..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Upload Section */}
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Evidence</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Evidence (screenshots, emails, documents)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload files</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="sr-only"
                                accept="image/*,.pdf,.doc,.docx"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, PDF, DOC up to 10MB
                          </p>
                          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {formData.evidence.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files</h3>
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {formData.evidence.map((file, index) => (
                            <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div className="w-0 flex-1 flex items-center">
                                {file.type.startsWith('image/') ? (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt="Evidence preview"
                                    className="flex-shrink-0 h-12 w-12 object-cover rounded"
                                  />
                                ) : (
                                  <span className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                                    <span className="text-gray-500">{file.name.split('.').pop()}</span>
                                  </span>
                                )}
                                <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="font-medium text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Your Information Section */}
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Your Information</h2>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="yourName" className="block text-sm font-medium text-gray-700">
                        Your Name (optional)
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="text"
                          id="yourName"
                          name="yourName"
                          value={formData.yourName}
                          onChange={handleChange}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        />
                        <FiUser className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="yourEmail" className="block text-sm font-medium text-gray-700">
                        Email Address (optional)
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="email"
                          id="yourEmail"
                          name="yourEmail"
                          value={formData.yourEmail}
                          onChange={handleChange}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        />
                        <FiMail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="yourPhone" className="block text-sm font-medium text-gray-700">
                        Phone Number (optional)
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="tel"
                          id="yourPhone"
                          name="yourPhone"
                          value={formData.yourPhone}
                          onChange={handleChange}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        />
                        <FiPhone className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="pt-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="termsAgreed"
                        name="termsAgreed"
                        type="checkbox"
                        checked={formData.termsAgreed}
                        onChange={handleChange}
                        required
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="termsAgreed" className="font-medium text-gray-700">
                        I confirm this information is accurate to the best of my knowledge *
                      </label>
                      <p className="text-gray-500">
                        By submitting this report, you agree to our privacy policy and understand that this information may be used to help prevent fraud.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : 'Submit Report'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}