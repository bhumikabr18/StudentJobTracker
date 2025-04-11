import React, { useState } from 'react';
import Webcam from 'react-webcam';

const JobForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    link: '',
    document: null
  });
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      company: '',
      role: '',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      link: '',
      document: null
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const captureDocument = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData(prev => ({ ...prev, document: imageSrc }));
    setShowCamera(false);
  }, [webcamRef]);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-6 backdrop-blur-lg bg-opacity-90">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
            Company
          </label>
          <input
            className="shadow-sm border-2 border-indigo-100 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="Enter company name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            className="shadow-sm border-2 border-indigo-100 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            id="role"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            placeholder="Enter job role"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            className="shadow-sm border-2 border-indigo-100 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appliedDate">
            Date of Application
          </label>
          <input
            className="shadow-sm border-2 border-indigo-100 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            id="appliedDate"
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
            Application Link
          </label>
          <input
            className="shadow-sm border-2 border-indigo-100 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            id="link"
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setShowCamera(!showCamera)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
          >
            {showCamera ? 'Close Camera' : 'Open Camera'}
          </button>
          {formData.document && (
            <span className="text-green-600 font-medium">Document captured!</span>
          )}
        </div>

        {showCamera && (
          <div className="relative">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg shadow-lg w-full max-w-md mx-auto"
            />
            <button
              type="button"
              onClick={captureDocument}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
            >
              Capture Document
            </button>
          </div>
        )}

        <button
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.02]"
          type="submit"
        >
          Add Job Application
        </button>
      </div>
    </form>
  );
};

export default JobForm;