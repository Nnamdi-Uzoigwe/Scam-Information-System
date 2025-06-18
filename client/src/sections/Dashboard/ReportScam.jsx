import { supabase } from '../../lib/supabaseClient';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { FaBars } from "react-icons/fa"; 
import { toast } from 'react-toastify';

const ScamReportPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   scammerName: '',
  //   scamType: '',
  //   description: '',
  //   scammerEmail: '',
  //   scammerAccountNumber: '',
  //   evidence: '',
  // });
  const [formData, setFormData] = useState({
    scammerName: '',
    telephoneNumber1: '',
    telephoneNumber2: '',
    emailAddress: '',
    physicalAddress: '',
    scamType: '',
    scamLocation: '',
    firstContact: '',
    scamValue: {
        amount: '',
        currency: 'USD'
    },
    description: '',
    scammerAccountNumber: '',
    evidence: null,
    scammerPhotos: []
});

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [scammerPhotosPreview, setScammerPhotosPreview] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
  setIsSidebarOpen(prev => !prev); // Using functional update for safety
};

const handleScammerPhotosChange = (e) => {
  const files = Array.from(e.target.files);
  const previews = files.map(file => URL.createObjectURL(file));
  setScammerPhotosPreview(prev => [...prev, ...previews]);

  const handleScammerPhotoDelete = (index) => {
  setScammerPhotosPreview(prev => prev.filter((_, i) => i !== index));
  
  // If you stored the files:
  setFormData(prev => ({
    ...prev,
    scammerPhotos: prev.scammerPhotos.filter((_, i) => i !== index)
  }));
};
  
  // If you need to store the actual files for submission:
  setFormData(prev => ({
    ...prev,
    scammerPhotos: [...prev.scammerPhotos, ...files]
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
  
    try {
      let evidenceUrl = '';
  
      if (formData.evidence) {
        const file = formData.evidence;
        const fileName = `${Date.now()}_${file.name}`;
  
        const { data, error } = await supabase.storage
          .from('fraud-report-site') 
          .upload(fileName, file);
  
        if (error) {
          console.error('Error uploading image:', error.message);
          toast.error('Failed to upload evidence image.', {
            position: "top-center",
            autoClose: 2000,
          })
          throw new Error('Failed to upload evidence image.')
        }

        const { data: publicData } = supabase
          .storage
          .from('fraud-report-site')
          .getPublicUrl(fileName);
  
        evidenceUrl = publicData.publicUrl;
      }
  
      const newReport = {
        scammerName: formData.scammerName,
        scamType: formData.scamType,
        description: formData.description,
        scammerEmail: formData.scammerEmail,
        scammerAccountNumber: formData.scammerAccountNumber,
        evidence: evidenceUrl, 
      };
  
      const token = sessionStorage.getItem("authToken")
      const response = await fetch('https://scam-information-system.onrender.com/api/scam-reports', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReport),
      });
  
      if (response.ok) {
        setMessage('Scam reported successfully!');
        setFormData({
          scammerName: '',
          scamType: '',
          description: '',
          scammerEmail: '',
          scammerAccountNumber: '',
          evidence: '',
        });
        toast.success("Scam report submitted sucessfully!", {
          position: "top-center",
          autoClose: 2000,
        })
        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to submit report. Please try again.');
        toast.error('Failed to submit report. Please try again.', {
          position: "top-center",
          autoClose: 2000,
        })
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
      });
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageDelete = () => {
    setImagePreview(null);
    setFormData({ ...formData, evidence: '' }); 
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
            
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-64 fixed lg:relative z-50`}>
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
                <h1 className="text-2xl font-bold text-center text-[#0F766E] mb-2">Report a Scam</h1>
                  <div className='flex justify-center'>
                  <p className="mb-8 text-sm w-[80%] text-center text-gray-500">
                    Please provide details of the fraud case you are a victim of in the form below if any.
                    Note that until verified, this is an allegation.
                  </p>
                  </div>
                    
                    {message && (
                      <div className={`p-4 mb-6 rounded-lg ${
                        message.includes('success') 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                      }`}>
                        {message}
                      </div>
                    )}

                    {/* <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="scammerName" className="block text-md font-medium text-gray-500 mb-1">
                          Scammer's Name
                        </label>
                        <input
                          id="scammerName"
                          name="scammerName"
                          type="text"
                          value={formData.scammerName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder='Name of Scammer'
                          />
                      </div>

                      <div>
                        <label htmlFor="scamType" className="block text-md font-medium text-gray-500 mb-1">
                          Type of Scam
                        </label>
                        <select
                          id="scamType"
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

                      <div>
                        <label htmlFor="scammerEmail" className="block text-md font-medium text-gray-500 mb-1">
                          Scammer's Email/Contact Info
                        </label>
                        <input
                          id="scammerEmail"
                          name="scammerEmail"
                          type="text"
                          value={formData.scammerEmail}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder='Scammer Email or Contact'
                          />
                      </div>

                      <div>
                        <label htmlFor="scammerAccountNumber" className="block text-md font-medium text-gray-500 mb-1">
                          Scammer's Bank Account Details
                        </label>
                        <input
                          id="scammerAccountNumber"
                          name="scammerAccountNumber"
                          type="text"
                          value={formData.scammerAccountNumber}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder='Enter Scammer Account Info...'
                          />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-md font-medium text-gray-500 mb-1">
                          Description of the Scam
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder='Write...'
                          />
                      </div>

                    
                      <div>
                          <label htmlFor="evidence" className="block text-md font-medium text-gray-500 mb-1">
                            Upload Evidence (Image file)
                          </label>
                          <input
                            type="file"
                            id="evidence"
                            name="evidence"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                      </div>

                      {imagePreview && (
                        <div className="mt-4 flex justify-between items-center">
                        <img
                          src={imagePreview}
                          alt="Image Preview"
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

                      <div className="flex justify-start">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2 cursor-pointer bg-[#0F766E] text-white font-medium rounded-md hover:bg-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2 disabled:opacity-50"
                          >
                          {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                      </div>
                    </form> */}

                    <form onSubmit={handleSubmit} className="space-y-6">
  {/* Existing Fields */}
  <div>
    <label htmlFor="scammerName" className="block text-md font-medium text-gray-500 mb-1">
      Scammer's Name
    </label>
    <input
      id="scammerName"
      name="scammerName"
      type="text"
      value={formData.scammerName}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder='Name of Scammer'
    />
  </div>

  {/* New Field: Telephone numbers */}
  <div>
    <label htmlFor="telephoneNumbers" className="block text-md font-medium text-gray-500 mb-1">
      Telephone Numbers (1 or 2)
    </label>
    <input
      id="telephoneNumber1"
      name="telephoneNumber1"
      type="tel"
      value={formData.telephoneNumber1}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
      placeholder='Primary phone number'
    />
    <input
      id="telephoneNumber2"
      name="telephoneNumber2"
      type="tel"
      value={formData.telephoneNumber2}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder='Secondary phone number (optional)'
    />
  </div>

  {/* New Field: Email Address */}
  <div>
    <label htmlFor="emailAddress" className="block text-md font-medium text-gray-500 mb-1">
      Email Address
    </label>
    <input
      id="emailAddress"
      name="emailAddress"
      type="email"
      value={formData.emailAddress}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder='Scammer email address'
    />
  </div>

  {/* New Field: Physical Address */}
  <div>
    <label htmlFor="physicalAddress" className="block text-md font-medium text-gray-500 mb-1">
      Physical Address (if known)
    </label>
    <input
      id="physicalAddress"
      name="physicalAddress"
      type="text"
      value={formData.physicalAddress}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder='Physical address of scammer or business'
    />
  </div>

  {/* Existing Field: Scam Type */}
  <div>
    <label htmlFor="scamType" className="block text-md font-medium text-gray-500 mb-1">
      Type of Scam
    </label>
    <select
      id="scamType"
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

  {/* New Field: Location of Scam */}
  <div>
    <label htmlFor="scamLocation" className="block text-md font-medium text-gray-500 mb-1">
      Location of Scam
    </label>
    <input
      id="scamLocation"
      name="scamLocation"
      type="text"
      value={formData.scamLocation}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder='Website/platform if online, address if offline'
    />
  </div>

  {/* New Field: Point of First Contact */}
  <div>
    <label htmlFor="firstContact" className="block text-md font-medium text-gray-500 mb-1">
      Point of First Contact
    </label>
    <input
      id="firstContact"
      name="firstContact"
      type="text"
      value={formData.firstContact}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder='How did the scammer first contact you?'
    />
  </div>

  {/* New Field: Value of Scam */}
  <div>
    <label htmlFor="scamValue" className="block text-md font-medium text-gray-500 mb-1">
      Value of Scam
    </label>
    <div className="flex">
      <input
        id="scamValue"
        name="scamValue"
        type="number"
        value={formData.scamValue}
        onChange={handleChange}
        required
        className="w-3/4 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
        placeholder='Amount lost'
      />
      <select
        id="scamCurrency"
        name="scamCurrency"
        value={formData.scamCurrency}
        onChange={handleChange}
        required
        className="w-1/4 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="USD">USD</option>
        <option value="NGN">Naira</option>
      </select>
    </div>
  </div>

  {/* Existing Field: Description */}
  <div>
    <label htmlFor="description" className="block text-md font-medium text-gray-500 mb-1">
      Description of the Scam
    </label>
    <textarea
      id="description"
      name="description"
      rows={4}
      value={formData.description}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder='Provide detailed description of what happened...'
    />
  </div>

  {/* New Field: Photos of Scammer */}
  <div>
    <label htmlFor="scammerPhotos" className="block text-md font-medium text-gray-500 mb-1">
      Photos of Scammer (if available)
    </label>
    <input
      type="file"
      id="scammerPhotos"
      name="scammerPhotos"
      accept="image/*"
      onChange={handleFileChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      multiple
    />
  </div>

  {/* Existing Field: Upload Evidence */}
  <div>
    <label htmlFor="evidence" className="block text-md font-medium text-gray-500 mb-1">
      Upload Evidence (Screenshots, documents, etc.)
    </label>
    <input
      type="file"
      id="evidence"
      name="evidence"
      accept="image/*,.pdf,.doc,.docx"
      onChange={handleFileChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      multiple
    />
  </div>

  {/* Existing Field: Bank Account Details */}
  <div>
    <label htmlFor="scammerAccountNumber" className="block text-md font-medium text-gray-500 mb-1">
      Scammer's Bank Account Details (if applicable)
    </label>
    <input
      id="scammerAccountNumber"
      name="scammerAccountNumber"
      type="text"
      value={formData.scammerAccountNumber}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder='Bank name, account number, etc.'
    />
  </div>

  {/* Image Preview Section */}
  {(imagePreview || scammerPhotosPreview) && (
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
      {scammerPhotosPreview && scammerPhotosPreview.map((photo, index) => (
        <div key={index} className="flex justify-between items-center">
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
      {isSubmitting ? 'Submitting...' : 'Submit Report'}
    </button>
  </div>
</form>
                </div>
              </div>

            </div>
    </div>


  
  );
};

export default ScamReportPage;