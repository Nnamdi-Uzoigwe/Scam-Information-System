
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import { handleLoginSuccess } from '../components/UserAvatar';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    
    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) { 
      validationErrors.email = 'Email is invalid';
    }
    
    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password should be at least 6 characters';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://scam-information-system.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
      if (!res.ok) {
        setErrors({ api: data.message || 'Login failed' });
        toast.error('Incorrect Name or Password', {
          position: "top-center",
          autoClose: 2000,
        })
        return;
      }
      sessionStorage.setItem('authToken', data.token);
      handleLoginSuccess({
        email: data.user?.email || email,
        username: data.user?.username || email.split('@')[0]
      });

      toast.success('Login successful!', {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
      })
      setErrors({ api: 'An unexpected error occurred' });
    } finally {
      setLoading(false)
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]`}
                  placeholder="Enter Password"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-[#0F766E] hover:text-[#0a5952]">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0F766E] hover:bg-[#0a5952] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F766E] transition-colors"
            >
              {loading ? <span className='flex gap-2'>Logging in<Spinner /></span> : <span>Login</span>}
            </button>
          </div>
        </form>

        <div className="text-center text-sm mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/register" className="font-medium text-[#0F766E] hover:text-[#0a5952]">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

