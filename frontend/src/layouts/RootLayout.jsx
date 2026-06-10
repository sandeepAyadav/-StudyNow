import React from 'react';
import Navbar from '../navbar/Navbar'; // Path check kar lein
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
     
      <Navbar /> 
      
     
      <main className='flex-grow'>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;