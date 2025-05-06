import React, { useEffect, useState } from 'react';

const UserAvatar = () => {
  const [user, setUser] = useState('');

  // Fetch and update user from localStorage
  useEffect(() => {
    updateUser();
    window.addEventListener('userUpdated', updateUser);

    return () => {
      window.removeEventListener('userUpdated', updateUser);
    };
  }, []);

  const updateUser = () => {
    const storedIdentity = localStorage.getItem('userIdentity');
    console.log('Fetched from localStorage:', storedIdentity);
    setUser(storedIdentity || '');
  };

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return '';
    // Check if it's an email or a name and get initials accordingly
    const firstPart = nameOrEmail.split('@')[0];  // For email, get the part before '@'
    return firstPart.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0F766E] shadow-md text-white font-bold text-lg">
      {getInitials(user)}
    </div>
  );
};

export default UserAvatar;

// Call this function on successful login
export const handleLoginSuccess = (userData) => {
  const { email, username } = userData;
  const identity = username || email;
  console.log('Storing identity:', identity);
  localStorage.setItem('userIdentity', identity);

  window.dispatchEvent(new Event('userUpdated'));
};
