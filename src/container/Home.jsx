import React, { useState } from 'react';
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { MdHome, MdOutlineEmail, MdWhatsapp } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaRegCopyright, FaSearchengin, FaTelegram } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Logo } from '../assets';
import { Projects, SignUp } from '../container';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileDetails } from '../components';
import { SET_SEARCH_TERM } from '../context/actions/searchActions';

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
          
          <div className="overflow-hidden w-full flex flex-col gap-4">
            {/* logo */}
            <Link to={"/home"}>
              <img src={Logo} alt="Logo" className="object-contain w-72 h-auto" />
            </Link>
            {/* start coding */}
            <Link to={"/newProject"}>
              <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
                <p className="text-gray-400 group-hover:text-gray-200 capitalize text-sm">Start Coding</p>
              </div>
            </Link>

            {/* home nav */}
            {user && (
              <Link to={"/home/projects"} className="flex items-center justify-center gap-6">
                <MdHome className="text-primaryText text-xl" />
                <p className="text-lg text-primaryText">Home</p>
              </Link>
            )}
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-4 mt-auto overflow-hidden w-full  ">
            <motion.div whileTap={{ scale: 0.9 }} onClick={openGmail}>
              <MdOutlineEmail className='text-rose-500 text-xl cursor-pointer hover:text-rose-400' />
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} onClick={openWhatsApp}>
              <MdWhatsapp className='text-green-400 text-xl cursor-pointer hover:text-green-300' />
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} onClick={openLinkedIn}>
              <FaLinkedinIn className='text-blue-600 text-xl cursor-pointer hover:text-blue-500' />
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} onClick={openGitHub}>
              <FaGithub className='text-gray-400 text-xl cursor-pointer hover:text-gray-100' />
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} onClick={openTelegram}>
              <FaTelegram className='text-blue-500 text-xl cursor-pointer hover:text-blue-400' />
            </motion.div>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center gap-1 overflow-hidden w-full">
            <FaRegCopyright className='text-primaryText'/>
            <p className="text-gray-400 text-sm"> Nirmalkumar</p>
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
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
