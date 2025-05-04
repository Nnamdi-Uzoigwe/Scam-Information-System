import { supabase } from '../../lib/supabaseClient';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScamReportPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    scammerName: '',
    scamType: '',
    description: '',
    scammerEmail: '',
    scammerAccountNumber: '',
    evidence: '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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
          throw new Error('Failed to upload evidence image.');
        }

        const { data: publicData } = supabase
          .storage
          .from('evidences')
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
  
      const response = await fetch('https://scam-information-system.onrender.com/api/scam-reports', {
        method: 'POST',
        headers: {
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
        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
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
    <div className="max-w-2xl mx-auto p-6 my-10 bg-white rounded-lg shadow-md">
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

      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder='Write a detailed description of how you were defrauded...'
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
      </form>
    </div>
  );
};

export default ScamReportPage;