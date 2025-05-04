// components/UserAvatar.jsx
import React from 'react';

const UserAvatar = () => {
  const user = localStorage.getItem('userIdentity');

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return '';
    return nameOrEmail.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0F766E] shadow-md text-white font-bold text-lg">
      {getInitials(user)}
    </div>
  );
};

// Call this function on successful login
export const handleLoginSuccess = (userData) => {
  const { email, username } = userData;
  const identity = username || email;
  localStorage.setItem('userIdentity', identity);
};

export default UserAvatar;
