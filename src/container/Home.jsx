import React, { useState } from 'react';
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { MdBackpack, MdBook, MdHome, MdOutlineEmail, MdWhatsapp } from "react-icons/md";
import { FaGithub,FaCode, FaLinkedinIn, FaRegCopyright, FaSearchengin, FaTelegram } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Logo } from '../assets';
import { Profile, NewProject, Projects, SignUp, Feedback } from '../container';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileDetails } from '../components';
import { SET_SEARCH_TERM } from '../context/actions/searchActions';
import { FaBookReader } from 'react-icons/fa';

const Home = () => {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const user = useSelector(state => state.user?.user);
  const searchTerm = useSelector((state) => state.searchTerm?.searchTerm || "");
  const dispatch = useDispatch();

  const location = useLocation();
  const isSignUpPage = location.pathname.includes("/home/auth");

  const handleSearchChange = (e) => {
    dispatch({ type: SET_SEARCH_TERM, payload: e.target.value });
  };

  const openGmail = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=nirmalkumarofllll@gmail.com');
  };
  const openWhatsApp = () => {
    window.open('https://wa.me/8220694842', '_blank');
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/nirmalkumarp-ofllll/', '_blank');
  };

  const openGitHub = () => {
    window.open('https://github.com/Nirmalkumarofllll', '_blank');
  };

  const openTelegram = () => {
    window.open('https://t.me/Nirmal_offl', '_blank');
  };

  


  return (
    <>
      {!isSignUpPage && (
        <div className={`min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out ${isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"}`}>
          {/* anchor */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSideMenu(!isSideMenu)}
            className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer">
            <HiChevronDoubleLeft className="text-white text-xl" />
          </motion.div>
          
          <div className="overflow-hidden w-full flex flex-col gap-6 pt-2">
            {/* logo */}
            <Link
              to={"/home/projects"} 
              className='flex items-center gap-3 group hover:opacity-90 transition-all duration-200'
            >
              <div className='flex flex-col'>
                <p className="text-3xl z-50 font-extrabold tracking-tight relative group text-green-400">
                  C<span className="inline-block animate-bounce text-green-400">O</span>DESYNC
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-green-400 group-hover:w-full transition-all duration-500"></span>
                </p>
                <p className='text-gray-400 text-xs font-medium'>Web Editor</p>
              </div>
            </Link>
            {/* start coding */}
            <Link to={"/newProject"}>
              <motion.div 
                className="px-6 py-4 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 cursor-pointer group hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCode className="text-white text-lg" />
                <p className="text-white font-semibold text-base">Start Coding</p>
              </motion.div>
            </Link>
            {/* 
            {user && (
              <a href="https://nirmalkumarofllll.github.io/Portfolio/Codepen.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-6">
                <FaBookReader className="text-primaryText text-xl" />
                <p className="text-lg text-primaryText">Learn</p>
              </a>
            )}*/}
          </div>

          {/* Social icons */}
          <div className="mt-auto w-full over overflow-hidden">
            <div className="flex items-center justify-center gap-3 mb-6">
              {[
                { icon: MdOutlineEmail, color: 'rose', action: openGmail },
                { icon: MdWhatsapp, color: 'green', action: openWhatsApp },
                { icon: FaLinkedinIn, color: 'blue', action: openLinkedIn },
                { icon: FaGithub, color: 'gray', action: openGitHub },
                { icon: FaTelegram, color: 'blue', action: openTelegram }
              ].map((social, index) => (
                <motion.div 
                  key={index}
                  whileTap={{ scale: 0.9 }}
                  onClick={social.action}
                  className={`p-3 bg-gray-700 rounded-lg hover:bg-${social.color}-500 transition-colors cursor-pointer`}
                >
                  <social.icon className={`text-${social.color}-400 hover:text-white text-xl transition-colors`} />
                </motion.div>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm border-t border-gray-700 pt-4">
              <FaRegCopyright className='text-gray-500'/>
              <p>{new Date().getFullYear()} Nirmalkumar</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
        {/* top section */}
        {!isSignUpPage && (
          <div className="w-full flex items-center justify-between gap-3">
            {/* search */}
            <div className='bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center gap-3'>
              <FaSearchengin className="text-2xl text-primaryText" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
                placeholder="Search here..."
              />
            </div>
            {/* profile section */}
            {!user && (
              <motion.div whileTap={{ scale: 0.9 }} className='flex items-center justify-center gap-3'>
                <Link to={"/home/auth"} className='bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700'>
                  SignUp
                </Link>
              </motion.div>
            )}
            {user && <UserProfileDetails />}
          </div>
        )}

        {/* bottom section */}
        <div className='w-full'>
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path='/auth' element={<SignUp />} />
            <Route path='/newProject' element={<NewProject />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/feedback' element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
