import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Course from './components/Course';
import SingleCourse from './components/SingleCourse';
import AddLectureForm from './components/AddLectureForm';
import BuyButton from './components/BuyButton';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen justify-between">

    
    <Routes>
      
      <Route path="/" element={<RootLayout />}>
        
        <Route index element={<Home />} />
        
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        
       
        <Route 
          path="course" 
          element={user?.role === "Teacher" ? <Course /> : <Navigate to="/" replace />} 
        />
      </Route>
      <Route path='/addlectureform/:courseId' element={user?.role === "Teacher" ? <AddLectureForm /> : <Navigate to="/login" replace />} />
      <Route path='/singlecourse/:id' element={<SingleCourse/>} />
      // App.jsx ya main route file ke andar check karein:
<Route path="/payment/order/:courseId" element={<BuyButton/>} />
<Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
    <Footer/>
    </div>
  );
 
}

export default App;