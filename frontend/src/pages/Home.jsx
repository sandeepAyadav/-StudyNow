import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCourses } from '../slice/courseSlice';
import { useNavigate } from 'react-router-dom';
import BuyButton from '../components/BuyButton'; 

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const { allCourses = [], loading, error, searchQuery, totalPages, currentPage, totalCourses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth); 

  const [page, setPage] = useState(1); 
  const [headingIndex, setHeadingIndex] = useState(0);
  const [fadeTrigger, setFadeTrigger] = useState(true);

  const headings = [
    "Build In-Demand Skills Through StudyNow",
    "Master Full Stack Development Track",
    "Crack Top Tech Interviews Effortlessly",
    "Learn From Industry Expert Mentors",
    "Accelerate Your Engineering Career",
    "Unlock Lifetime Premium Access"
  ];

  
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeTrigger(false);
      setTimeout(() => {
        setHeadingIndex((prevIndex) => (prevIndex + 1) % headings.length);
        setFadeTrigger(true);
      }, 150);
    }, 1200);
    return () => clearInterval(timer); 
  }, []);

  
  useEffect(() => {
    
    dispatch(fetchAllCourses({ search: searchQuery || "", page: page || 1, limit: 6 }));
  }, [dispatch, searchQuery, page]);

  
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <div className='min-h-screen bg-gray-50 pb-20 animate-fade-in'>
      
     
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6'>
        <div className='relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-800 h-[320px] md:h-[280px] flex items-center shadow-xl'>
          <div className='absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-white opacity-10 rounded-full blur-2xl pointer-events-none'></div>
          <div className='absolute bottom-0 left-1/3 -mb-16 w-60 h-60 bg-blue-400 opacity-20 rounded-full blur-xl pointer-events-none'></div>

          <div className='relative z-10 max-w-2xl ml-8 md:ml-16 px-4 text-white'>
            <span className='bg-indigo-500 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-opacity-50 backdrop-blur-sm animate-pulse'>
              Never Stop Learning
            </span>
            <div className="h-[90px] md:h-[100px] flex items-center mt-3 overflow-hidden">
              <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight transition-all duration-300 transform ${fadeTrigger ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
                {headings[headingIndex]}
              </h1>
            </div>
            <p className='mt-2 text-indigo-100 text-sm md:text-base hidden sm:block'>
              Learn from industry experts, practice on live assignments, and accelerate your tech career today.
            </p>
          </div>
        </div>
      </div>

      {/* 📚 Course Section Area */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12'>
        <div className='flex items-center justify-between border-b border-gray-200 pb-4 mb-8'>
          <div>
            <h2 className='text-2xl font-extrabold text-gray-900 tracking-tight'>Available Courses</h2>
            <p className='text-sm text-gray-500 mt-1'>Expand your horizon with our latest programming programs.</p>
          </div>
          <span className='text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full'>
            Total: {totalCourses}
          </span>
        </div>

        {loading && (
          <div className='text-center py-20 flex flex-col items-center justify-center space-y-3'>
            <div className='w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin'></div>
            <p className='text-gray-500 font-medium animate-pulse'>Syncing platform assets coordinates...</p>
          </div>
        )}

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 max-w-md mx-auto text-center shadow-sm'>
            <p className='font-semibold'>Failed to load catalog</p>
            <p className='text-sm text-red-500 mt-1'>{error}</p>
          </div>
        )}

        {/* 🎴 Responsive Grid System Mapping */}
        {!loading && !error && allCourses.length > 0 ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {allCourses.map((course) => (
                <div key={course._id} className='group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1'>
                  <div className='relative overflow-hidden bg-gray-100 aspect-video'>
                    {course.image?.url ? (
                      <img src={course.image.url} alt={course.title} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-400 font-bold text-lg'>StudyNow Course</div>
                    )}
                    <span className='absolute top-3 right-3 bg-gray-900 bg-opacity-75 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-md'>Full Lifetime Access</span>
                  </div>

                  <div className='p-5 flex-1 flex flex-col justify-between'>
                    <div>
                      <h3 className='text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1'>{course.title}</h3>
                      <p className='text-gray-500 text-sm mt-1.5 line-clamp-2 min-h-[40px] leading-relaxed'>{course.description || "No overview details provided."}</p>
                    </div>

                    <div className='mt-4 pt-3 border-t border-gray-100 flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <span className='text-xs text-gray-400 uppercase tracking-wider font-semibold'>Price</span>
                        <span className='font-black text-emerald-600 text-xl tracking-tight'>₹{course.price}</span>
                      </div>
                      <div className='text-right'>
                        <span className='text-xs text-gray-400 block font-semibold uppercase tracking-wider'>Instructor</span>
                        <span className='text-sm font-medium text-gray-700 truncate max-w-[120px] inline-block'>{course.createdBy?.name || "Expert Trainer"}</span>
                      </div>
                    </div>

                    <div className='mt-5 space-y-2.5'>
                      {user?.role !== "Teacher" && (
                        <div className='w-full'>
                          <BuyButton courseId={course._id} coursePrice={course.price} courseName={course.title} />
                        </div>
                      )}
                      {user?.role === "Teacher" ? (
                        <button onClick={() => navigate(`/addlectureform/${course._id}`)} className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm cursor-pointer'>Add Lecture</button>
                      ) : (
                        <button onClick={() => navigate(`/singlecourse/${course._id}`)} className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-lg text-sm border border-gray-200 cursor-pointer'>View Details</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
            {totalPages > 1 && (
              <div className='mt-16 flex items-center justify-center space-x-2 border-t border-gray-200 pt-6'>
               
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className='px-3.5 py-2 text-sm font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all cursor-pointer'
                >
                  &larr; Prev
                </button>

                {/* Numbers map array array logic loops generation */}
                {Array.from({ length: totalPages }, (_, idx) => {
                  const currentNum = idx + 1;
                  const isCurrent = currentNum === page;
                  return (
                    <button
                      key={currentNum}
                      onClick={() => setPage(currentNum)}
                      className={`w-9 h-9 rounded-xl text-sm font-bold transition-all cursor-pointer ${isCurrent ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                    >
                      {currentNum}
                    </button>
                  );
                })}

                {/* Next Trigger */}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className='px-3.5 py-2 text-sm font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all cursor-pointer'
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </>
        ) : (
          !loading && !error && (
            <div className='text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 max-w-lg mx-auto p-6 mt-4'>
              <p className='text-gray-400 font-medium text-lg'>No Course Available Match</p>
              <p className='text-sm text-gray-400 mt-1'>Please adjust your dashboard search keywords criteria queries.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;