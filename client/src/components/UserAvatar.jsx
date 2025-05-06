import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const getInitials = (userData) => {
  if (!userData) return '';
  const name = userData.username || userData.email || '';
  const firstPart = name.split('@')[0];
  
  return firstPart
    .split(/[.\-_]/) 
    .filter(Boolean)
    .map(part => part[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');
};

export const handleLoginSuccess = (userData) => {
  const initials = getInitials(userData);
  sessionStorage.setItem('userInitials', initials);
  sessionStorage.setItem('userEmail', userData.email || '');
};

const UserAvatar = ({setShowLogoutModal}) => {
  const navigate = useNavigate();
  const [initials, setInitials] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedInitials = sessionStorage.getItem('userInitials');
    const storedEmail = sessionStorage.getItem('userEmail');
    
    if (storedInitials) setInitials(storedInitials);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  if (!initials) return null;

  return (
    <div className="flex items-center gap-3">
      <div 
        onClick={() => setShowLogoutModal(true)}
        className="cursor-pointer h-10 w-10 rounded-full text-xl bg-[#063F3A] text-white flex items-center justify-center font-medium"
        title={email}
      >
        {initials}
      </div>
      
    </div>
  );
};

export default UserAvatar;