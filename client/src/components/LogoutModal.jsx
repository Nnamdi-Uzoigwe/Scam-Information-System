import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/');
    
    window.location.reload();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div 
        className="fixed inset-0 bg-[#111] opacity-90 z-50"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
          
          {/* Modal content */}
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Are you sure you want to logout?</h3>
            
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={onClose}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;