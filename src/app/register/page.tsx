'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff ,User } from 'lucide-react';


export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('/api/register', form);
      setMessage(res.data.message || 'Registration successful!');
      setForm({ name: '', email: '', password: '' });
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border shadow-lg rounded-xl p-8">
        <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 border text-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10" />
                    </div>
                  </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h1>
        {message && (
          <p className="text-center text-sm mb-4 text-green-500">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Full Name</label>
           <div className='relative'>
               <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-700 transition-colors" />
                </div>
             <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
              placeholder='Enter Full Name'
            />
           </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
           <div className='relative'>
              <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-700 transition-colors" />
                </div>
             <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
              placeholder='Enter Your Email Id'
            />
           </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <div className='relative'>
             <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-700" />
                </div>
              <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border pl-10 pr-10 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
              placeholder='Enter the Password'
            />
             <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-green-500"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
           <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}
