import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../slice/authSlice';
import { useNavigate, Link } from 'react-router-dom'; // Navigation ke liye

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("Student"); 

  
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    }
  }, [success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, number, role }));
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      
      <div className='sm:mx-auto w-full max-w-md'>
        <h2 className='text-center text-3xl font-extrabold text-gray-900 tracking-tight'>
          Create your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Join <span className='font-bold text-indigo-600'>StudyNow</span> to accelerate your learning
        </p>
      </div>

      <div className='mt-8 sm:mx-auto w-full max-w-md'>
        <div className='bg-white py-8 px-4 shadow-xl rounded-2xl border border-gray-100 sm:px-10 transform transition-all'>
          
          <form onSubmit={handleSubmit} className='space-y-5'>
            
            {/* 👤 Name Input */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>Full Name</label>
              <input 
                type='text' 
                required
                value={name} 
                placeholder='John Doe' 
                className='w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm shadow-2xs'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* 📧 Email Input */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>Email Address</label>
              <input 
                type='email' 
                required
                value={email} 
                placeholder='you@example.com' 
                className='w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm shadow-2xs'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* 🔒 Password Input */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>Password</label>
              <input 
                type='password' 
                required
                value={password} 
                placeholder='••••••••' 
                className='w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm shadow-2xs'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* 📞 Number Input */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>Phone Number</label>
              <input 
                type='text' 
                required
                value={number} 
                placeholder='9876543210' 
                className='w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm shadow-2xs'
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            {/* 🎭 Role Selection (Modern Styled Radio Cards) */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Join As</label>
              <div className='grid grid-cols-2 gap-4'>
                
                {/* Student Option */}
                <label className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${role === "Student" ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-bold" : "border-gray-200 text-gray-500 bg-white hover:bg-gray-50"}`}>
                  <input 
                    type='radio' 
                    name="role" 
                    value="Student" 
                    className="sr-only" 
                    checked={role === "Student"} 
                    onChange={(e) => setRole(e.target.value)} 
                  />
                  <span>🎓 Student</span>
                </label>

                {/* Teacher Option */}
                <label className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${role === "Teacher" ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-bold" : "border-gray-200 text-gray-500 bg-white hover:bg-gray-50"}`}>
                  <input 
                    type='radio' 
                    name="role" 
                    value="Teacher" 
                    className="sr-only" 
                    checked={role === "Teacher"} 
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span>👨‍🏫 Teacher</span>
                </label>

              </div>
            </div>

            {/* 🚀 Register Button */}
            <div className='pt-2'>
              <button 
                type="submit" 
                disabled={loading}
                className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed transform active:scale-[0.98]'
              >
                {loading ? (
                  <div className='flex items-center space-x-2'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Creating Account...</span>
                  </div>
                ) : "Register"}
              </button>
            </div>

            {/* Status Alerts Notification */}
            {success && (
              <div className='bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-center text-sm font-semibold animate-fade-in'>
                🎉 User Registered Successfully! Redirecting...
              </div>
            )}
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-center text-sm font-semibold animate-shake'>
                ❌ {error}
              </div>
            )}

            {/* Navigation Redirect option link */}
            <div className='text-center pt-2 border-t border-gray-100'>
              <p className='text-xs text-gray-500'>
                Already have an account?{' '}
                <Link to="/login" className='font-bold text-indigo-600 hover:text-indigo-500 transition-colors'>
                  Sign In
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;