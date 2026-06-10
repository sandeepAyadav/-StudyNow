import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetLectureState, addlecture } from '../slice/lectureSlice'; 

function AddLectureForm() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [lectureNumber, setLectureNumber] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoMeta, setVideoMeta] = useState({ name: "", size: "" }); // 🌟 Video file metrics save karne ke liye state

  const { loading, error, success } = useSelector((state) => state.lecture);

  useEffect(() => {
    if (success) {
      alert("Lecture uploaded successfully!");
      setHeading("");
      setSubHeading("");
      setLectureNumber("");
      setIsPreview(false);
      setVideoFile(null);
      setVideoMeta({ name: "", size: "" });
      dispatch(resetLectureState());
      navigate("/"); 
    }
  }, [success, dispatch, navigate]);

  // Handle video file meta calculation
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      // Size ko Bytes se MB mein convert karne ke liye math logic
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setVideoMeta({ name: file.name, size: `${sizeInMB} MB` });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video file!");
      return;
    }

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("subHeading", subHeading);
    formData.append("lectureNumber", lectureNumber);
    formData.append("isPreview", isPreview);
    formData.append("video", videoFile); 
    formData.append("courseId", courseId);
    
    dispatch(addlecture({ courseId, addlectureForm: formData }));
    console.log("Form Data submitted successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100 transform transition-all duration-300">
        
        {/* 🏷️ Card Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight text-center">
            Upload New Lecture
          </h2>
          <p className="text-center text-sm text-gray-500 mt-1">
            Attach fresh video contents directly to this specific training instance node.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm font-semibold mb-5 animate-shake">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 📁 Advanced Drag/Drop Video Zone */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 block">Lecture Asset (Video)</label>
            
            {videoMeta.name && (
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between text-xs animate-fade-in">
                <div className="flex items-center space-x-2.5 truncate max-w-[80%]">
                  <span className="text-xl">🎬</span>
                  <div className="truncate">
                    <p className="font-bold text-gray-800 truncate">{videoMeta.name}</p>
                    <p className="text-gray-400 mt-0.5">{videoMeta.size}</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => { setVideoFile(null); setVideoMeta({ name: "", size: "" }); }}
                  className="text-red-500 font-bold hover:text-red-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}

            {!videoMeta.name && (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <svg className="w-6 h-6 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500 font-medium">
                      <span className="font-semibold text-indigo-600">Select video file</span> or source path
                    </p>
                  </div>
                  <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    onChange={handleVideoChange}
                    required
                  />
                </label>
              </div>
            )}
          </div>

          {/* 📝 Lecture Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Lecture Title</label>
            <input 
              type="text" 
              value={heading} 
              placeholder="e.g., Introduction to UseEffect Lifecycle"
              onChange={(e) => setHeading(e.target.value)} 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs transition"
              required 
            />
          </div>

          {/* 📑 SubHeading */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Lecture Subtitle/Topic</label>
            <input 
              type="text" 
              value={subHeading} 
              placeholder="e.g., Cleanups, dependencies, and memory retention optimization."
              onChange={(e) => setSubHeading(e.target.value)} 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs transition"
              required 
            />
          </div>

          {/* 🔢 Lecture Sequence Number */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Index Sequence Number</label>
            <input 
              type="number"  
              value={lectureNumber} 
              placeholder="e.g., 1"
              onChange={(e) => setLectureNumber(e.target.value)} 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs transition"
              required 
            />
          </div>

          {/* 🔄 iOS Style Premium Toggle Switch for Free Preview */}
          <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="flex flex-col pr-4">
              <span className="text-sm font-bold text-gray-800">Free Preview Access</span>
              <span className="text-xs text-gray-400 mt-0.5">Allow unauthenticated or non-enrolled prospects to stream this content block.</span>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={isPreview} 
                onChange={(e) => setIsPreview(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* 🚀 Submission Action Block */}
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed transform active:scale-[0.99]"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading Chunk Stream Blocks...</span>
                </div>
              ) : "Upload Lecture Assets"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddLectureForm;