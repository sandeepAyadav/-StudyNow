import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
         
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-black text-white tracking-tight">
              Study<span className="text-indigo-500">Now</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering final-year students and tech professionals with cutting-edge software development skills and algorithmic excellence.
            </p>
            
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-indigo-500 transition-colors duration-200">
                <i className="fab fa-github text-lg"></i>
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors duration-200">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors duration-200">
                <i className="fab fa-twitter text-lg"></i>
              </a>
            </div>
          </div>

         
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Full Stack MERN</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Data Structures & Algos</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Generative AI Tracks</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Interview Prep</Link>
              </li>
            </ul>
          </div>

         
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Help Center</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Discussion Forums</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Become an Instructor</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Testimonials</Link>
              </li>
            </ul>
          </div>

         
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Cookie Preferences</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Refund Policy</Link>
              </li>
            </ul>
          </div>

        </div>

        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {currentYear} StudyNow. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Designed for high-performance scale & secure payment validation via <span className="text-gray-400 font-medium">Razorpay</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;