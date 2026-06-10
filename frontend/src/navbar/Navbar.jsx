import React, { useState, useEffect } from 'react'; // ✅ useEffect hook successfully imported
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../slice/courseSlice';
import { logoutUser } from '../slice/authSlice'; 
import Cart from '../pages/Cart';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  
  
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    dispatch(logoutUser()); 
    navigate("/login");
  };

  useEffect(() => {
    
    const delayDebounceFn = setTimeout(() => {
      dispatch(setSearchQuery(searchTerm));
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs border-b border-gray-100 flex flex-row justify-between items-center transition-all duration-300'>
      
      {/* 🏢 Logo Segment */}
      <div className='flex items-center'>
        <h2 className='text-xl font-black tracking-tight text-gray-900 hover:opacity-90 transition-opacity'>
          <Link to="/">
            Study<span className='text-indigo-600'>Now</span>
          </Link>
        </h2>
      </div>

      {/* 🔍 Navigation Links & Interactive Search Bar */}
      <div className='hidden md:flex items-center space-x-6 flex-1 max-w-xl mx-8'>
        <button className='text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer'>
          Explore
        </button>
        <button className='text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer'>
          Subscribe
        </button>
        
        {/* ✅ Controlled Wrapper container added back with accurate relative parameters */}
        <div className='relative w-full group'>
          <input
            type='text'
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search for courses..."
            className='w-full bg-gray-50 text-gray-900 placeholder-gray-400 pl-4 pr-10 py-1.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all shadow-2xs group-hover:border-gray-300'
          />
          <div className='absolute right-3.5 top-2.5 text-gray-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>

      </div>

     
      <div className='flex items-center space-x-4'>
        <div className='relative hover:scale-105 transition-transform duration-200'>
          <Cart />
        </div>

        {user ? (
          
          <div className='flex items-center space-x-3.5 pl-2 border-l border-gray-200'>
            <div className='w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-xs uppercase'>
              {user?.name ? user.name.substring(0, 2) : "U"}
            </div>
            <button
              onClick={handleLogout}
              className='px-3.5 py-1.5 border border-red-200 text-red-600 font-bold rounded-xl text-xs hover:bg-red-50 active:scale-[0.98] transition-all cursor-pointer'
            >
              Logout
            </button>
          </div>
        ) : (
          
          <div className='flex items-center space-x-2.5'>
            <button
              onClick={() => navigate("/register")}
              className='px-4 py-1.5 text-gray-700 font-bold rounded-xl text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 active:scale-[0.97] transition-all cursor-pointer'
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className='px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 shadow-sm shadow-indigo-200 active:scale-[0.97] transition-all cursor-pointer'
            >
              Login
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default Navbar;