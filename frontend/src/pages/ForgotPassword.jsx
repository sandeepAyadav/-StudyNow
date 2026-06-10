import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction, clearAuthState } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthState()); 
  }, [dispatch]);

  useEffect(() => {
    if (success) {
     
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    }
  }, [success, navigate, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction({ email }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">Recover Account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Enter email node to request a 6-digit verification code</p>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Email Address</label>
              <input 
                type="email" required value={email} placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:bg-gray-400">
              {loading ? "Transmitting OTP Code..." : "Send Verification OTP"}
            </button>

            {error && <div className="bg-red-50 text-red-700 p-2.5 rounded-xl text-center text-xs font-semibold">❌ {error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;