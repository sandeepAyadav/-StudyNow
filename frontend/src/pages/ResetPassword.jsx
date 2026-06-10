import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordAction, clearAuthState } from '../slice/authSlice';

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryEmail = new URLSearchParams(location.search).get("email") || "";

  const [email, setEmail] = useState(queryEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      alert("Password configuration synchronized successfully!");
      dispatch(clearAuthState());
      navigate("/login");
    }
  }, [success, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAction({ email, otp, newPassword }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">Setup New Password</h2>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Target Account Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-xl border text-sm" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">6-Digit Secret OTP</label>
              <input type="text" maxLength="6" required placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-2 border rounded-xl text-center tracking-widest text-lg font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Create New Password</label>
              <input type="password" required placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-2 border rounded-xl text-sm" />
            </div>

            <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition disabled:bg-gray-400">
              {loading ? "Re-encrypting Password..." : "Update Credentials Token"}
            </button>

            {error && <div className="bg-red-50 text-red-700 p-2 rounded-xl text-center text-xs font-semibold">❌ {error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;