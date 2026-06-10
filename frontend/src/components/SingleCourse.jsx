import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleCourse } from '../slice/lectureSlice';
import CourseReviews from '../components/CourseReviews'; 
import CourseChat from '../components/CourseChat'; 
import AiMentor from '../components/AiMentor'; 

function SingleCourse() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  
  const { singleData, error, loading } = useSelector((state) => state.lecture);
  const { user } = useSelector((state) => state.auth); 
  
  const [activeLecture, setActiveLecture] = useState(null);

   const activeCourseTitle = singleData?.[0]?.heading || "Advanced Specialization Course Module";

  useEffect(() => {
    if (id) {
      dispatch(singleCourse(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleData && singleData.length > 0) {
      setActiveLecture(singleData[0]);
    }
  }, [singleData]);

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center space-y-3 bg-gray-50'>
        <div className='w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin'></div>
        <p className='text-gray-500 font-medium animate-pulse'>Compiling streaming workspace data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
        <div className='bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 max-w-md text-center shadow-xs'>
          <p className='font-bold text-lg'>Structural Sync Broken</p>
          <p className='text-sm text-red-500 mt-1'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 pb-16 relative'>
      
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          
          
          <div className='lg:col-span-2 space-y-4'>
            {activeLecture ? (
              <div className='bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm p-4'>
                
                
                <div className='relative bg-black rounded-xl overflow-hidden aspect-video shadow-inner'>
                  {activeLecture.videoUrl ? (
                    <video
                      key={activeLecture._id} 
                      controls
                      controlsList="nodownload" 
                      className='w-full h-full object-contain'
                      src={activeLecture.videoUrl}
                    >
                      Your browser does not support stream tracks.
                    </video>
                  ) : (
                   
                    <div className='w-full h-full flex flex-col items-center justify-center text-center bg-slate-950 p-6 text-gray-400'>
                      <span className='text-4xl mb-3'>🔒</span>
                      <p className='font-bold text-white text-lg'>This Lecture Content Layer is Locked</p>
                      <p className='text-xs text-gray-500 max-w-xs mt-1'>
                        Please enroll or authorize payment clearances via home catalog node parameters to access this asset.
                      </p>
                    </div>
                  )}
                </div>

                
                <div className='mt-5 px-1'>
                  <span className='bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-md text-xs uppercase tracking-wider'>
                    Module Block {activeLecture.lectureNumber}
                  </span>
                  <h1 className='text-2xl font-black text-gray-900 tracking-tight mt-2.5'>
                    {activeLecture.heading}
                  </h1>
                  <p className='text-sm text-gray-500 leading-relaxed mt-2 border-l-2 border-indigo-200 pl-3'>
                    {activeLecture.subHeading}
                  </p>
                </div>

              </div>
            ) : (
              <div className='bg-white border rounded-2xl p-12 text-center text-gray-400 font-medium'>
                No Lecture Track Node active. Select from list tree.
              </div>
            )}
          </div>

          
          <div className='lg:col-span-1 space-y-6'>
            
         
            <div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col max-h-[350px]'>
              <div className='p-4 bg-gray-900 text-white border-b border-gray-800 flex justify-between items-center'>
                <h3 className='font-extrabold text-sm tracking-wider uppercase'>Course Index Track</h3>
                <span className='text-xs bg-gray-800 text-gray-400 font-bold px-2 py-0.5 rounded-sm'>
                  {singleData?.length || 0} Lectures
                </span>
              </div>

             
              <div className='divide-y divide-gray-100 overflow-y-auto custom-scrollbar flex-1'>
                {singleData && singleData.length > 0 ? (
                  singleData.map((lecture, idx) => {
                    const isSelected = activeLecture?._id === lecture._id;
                    const isLocked = !lecture.videoUrl;

                    return (
                      <button
                        key={lecture._id}
                        onClick={() => setActiveLecture(lecture)}
                        className={`w-full text-left p-4 transition-all flex items-start gap-3.5 hover:bg-gray-50/80 cursor-pointer ${isSelected ? "bg-indigo-50/60 border-l-4 border-indigo-600 font-medium" : ""}`}
                      >
                        <div className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                          {lecture.lectureNumber || idx + 1}
                        </div>

                        <div className='flex-1 min-w-0'>
                          <p className={`text-sm font-bold truncate ${isSelected ? "text-indigo-700" : "text-gray-900"}`}>
                            {lecture.heading}
                          </p>
                          <p className='text-xs text-gray-400 truncate mt-0.5'>{lecture.subHeading}</p>
                        </div>

                        <div className='shrink-0 text-xs mt-1'>
                          {isLocked ? (
                            <span className='text-gray-400' title="Locked Block">🔒</span>
                          ) : (
                            <span className='text-emerald-500 font-semibold' title="Accessible Stream">▶</span>
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className='p-8 text-center text-gray-400 italic text-sm'>
                    No playlist item records registered.
                  </div>
                )}
              </div>
            </div>

            
            {user ? (
              <CourseChat courseId={id} currentUser={user} />
            ) : (
              <div className='bg-white border rounded-2xl p-6 text-center text-sm text-gray-500 font-medium shadow-sm'>
                🔒 Please log in to participate in the live technical discussion workspace.
              </div>
            )}

          </div>

        </div>
      </div>

     
      <div className='max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8'>
        <CourseReviews courseId={id} />
      </div>

        <AiMentor courseTitle={activeCourseTitle} />

    </div>
  );
}

export default SingleCourse;