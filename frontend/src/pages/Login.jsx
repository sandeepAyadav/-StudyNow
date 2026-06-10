import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slice/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleForm = async (e) => {
    e.preventDefault();
    
    try {
    
      const loggedInUser = await dispatch(loginUser({ email, password })).unwrap();
      console.log("logged user", loggedInUser);
      
      if (loggedInUser && loggedInUser.userToken) {
        localStorage.setItem("token", loggedInUser.userToken);
        console.log("Token successfully saved to LocalStorage!");
      }
      
      
      if (loggedInUser && loggedInUser.role === "Teacher") {
        navigate("/course");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login lifecycle failed execution:", err);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in'>
      
      
      <div className='sm:mx-auto w-full max-w-md'>
        <h2 className='text-center text-3xl font-extrabold text-gray-900 tracking-tight'>
          Welcome Back
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Log in to your <span className='font-bold text-indigo-600'>StudyNow</span> workspace
        </p>
      </div>

   
      <div className='mt-8 sm:mx-auto w-full max-w-md'>
        <div className='bg-white py-8 px-4 shadow-xl rounded-2xl border border-gray-100 sm:px-10'>
          
          <form onSubmit={handleForm} className='space-y-6'>
            
           
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Email Address
              </label>
              <div className="relative rounded-md shadow-2xs">
                <input 
                  type='email' 
                  value={email} 
                  placeholder='you@example.com' 
                  onChange={(e) => setEmail(e.target.value)} 
                  className='w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm'
                  required
                />
              </div>
            </div>
            
           
            <div>
              <div className="flex items-center justify-between mb-1.5">
  <label className='block text-sm font-semibold text-gray-700'>
    Password
  </label>
  <Link to="/forgot-password" className="text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer">
    Forgot password?
  </Link>
</div>
              <div className="relative rounded-md shadow-2xs">
                <input 
                  type='password' 
                  value={password} 
                  placeholder='••••••••' 
                  onChange={(e) => setPassword(e.target.value)} 
                  className='w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm'
                  required
                />
              </div>
            </div>
            
           
            <div>
              <button 
                type='submit' 
                disabled={loading} 
                className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed transform active:scale-[0.98]'
              >
                {loading ? (
                  <div className='flex items-center space-x-2'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Verifying Credentials...</span>
                  </div>
                ) : "Sign In"}
              </button>
            </div>
            
           
            {success && (
              <div className='bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-center text-sm font-semibold'>
                🎉 Access Granted! Redirecting to workspace...
              </div>
            )}
            
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-center text-sm font-semibold'>
                ❌ {error}
              </div>
            )}

           
            <div className='text-center pt-2 border-t border-gray-100'>
              <p className='text-xs text-gray-500'>
                New to the platform?{' '}
                <Link to="/register" className='font-bold text-indigo-600 hover:text-indigo-500 transition-colors'>
                  Create an account
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;