import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../slice/courseSlice'; 
import { useNavigate } from 'react-router-dom';

function Course() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, success } = useSelector((state) => state.course);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(""); 

  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); 
    }
  };

  const handleCourse = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(); 
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);
    
    try {
      const response = await dispatch(createCourse(formData)).unwrap();
      if (response && response.newCreate) {
        navigate("/addlectureform");
      } else {
        console.log("Creation pipeline anomaly detached.");
      }
    } catch (err) {
      console.error("Course insertion structural failure:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100 transform transition-all duration-300">
        
        
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight text-center">
            Create Premium Course
          </h2>
          <p className="text-center text-sm text-gray-500 mt-1">
            Publish high-quality educational modules to the StudyNow workspace catalog.
          </p>
        </div>
        
        <form onSubmit={handleCourse} className="space-y-5">
          
        
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 block">Course Thumbnail</label>
            
          
            {preview && (
              <div className="w-full h-44 rounded-xl overflow-hidden border border-gray-200 mb-3 bg-gray-50 relative group">
                <img src={preview} alt="Preview layout" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => { setFile(null); setPreview(""); }}
                  className="absolute top-2 right-2 bg-red-600/90 text-white p-1.5 rounded-lg text-xs font-bold shadow-sm backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Remove Image
                </button>
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                  <svg className="w-6 h-6 mb-2 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-xs text-gray-500 font-medium">
                    <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                  </p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                  required={!preview}
                />
              </label>
            </div>
          </div>

          {/* 📝 Title Input Area */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Course Title</label>
            <input 
              type="text" 
              value={title} 
              placeholder="e.g., Advanced Mastering MERN Stack" 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs transition"
              required
            />
          </div>

       
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Description Overview</label>
            <textarea 
              rows="3"
              value={description} 
              placeholder="Provide a comprehensive syllabus synopsis blueprint track..." 
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs transition resize-none leading-relaxed"
              required
            />
          </div>

         
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Tuition Valuation Price (INR)</label>
            <div className="relative rounded-xl shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm font-medium">₹</span>
              </div>
              <input 
                type="number" 
                value={price} 
                placeholder="2999" 
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
          </div>

          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed transform active:scale-[0.99]"
            >
              {loading ? (
                <div className='flex items-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Compiling Module Payload...</span>
                </div>
              ) : "Deploy Course Asset"}
            </button>
          </div>

          
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-2.5 rounded-xl text-center text-sm font-semibold animate-fade-in">
              🎉 Course Node Structured Successfully!
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-xl text-center text-sm font-semibold animate-shake">
              ❌ {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Course;