import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown, FaPowerOff, FaUser } from 'react-icons/fa6';
import { Menus, signOutAction } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { slideUpOut } from '../animations';

const UserProfileDetails = () => {
  const user = useSelector(state => state.user?.user);
  const [isMenu, setIsMenu] = useState(false);
  const username =
  user?.displayName?.replace(/[0-9]/g, "") ||
  user?.email?.split("@")[0]?.replace(/[0-9]/g, "") ||
  "User";


  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleSignOut = () => {
    signOutAction();
    setIsMenu(false);
  };

  return (
    <div className='flex items-center justify-center relative'>
      {/* User Profile with Dropdown Toggle */}
      <motion.div 
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className="flex items-center gap-3 p-2 rounded-xl bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors group"
      >
        {/* User Avatar */}
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {user?.photoURL ? (
            <img 
              src={user?.photoURL} 
              alt={user?.displayName} 
              referrerPolicy='no-referrer'
              className='w-full h-full object-cover rounded-full'
            />
          ) : user?.displayName ? (
            user.displayName.charAt(0).toUpperCase()
          ) : (
            user?.email?.charAt(0).toUpperCase() || "U"
          )}
        </div>
        
        {/* User Info - Hidden on smaller screens */}
        <div className="hidden md:block">
          <p className="text-white text-sm font-medium max-w-[120px] truncate">
            {username} 
          </p>
          <p className="text-gray-400 text-xs max-w-[120px] truncate">
            {user?.email || "Welcome"}
          </p>
        </div>

        {/* Dropdown Chevron */}
        <motion.div
          animate={{ rotate: isMenu ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-gray-400 text-xs group-hover:text-white transition-colors" />
        </motion.div>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenu && (
          <motion.div
            {...slideUpOut}
            className="absolute top-full right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2 z-50"
          >
            {/* User Info in Dropdown */}
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-white text-sm font-medium truncate">
                {username}
              </p>
              <p className="text-gray-400 text-xs truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>

            {/* Menu Items */}
            {Menus && Menus.map(menu => (
              <Link 
                to={menu.uri} 
                key={menu.id} 
                onClick={() => setIsMenu(false)}
                className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-3 text-sm"
              >
                {menu.icon && <menu.icon className="text-lg" />}
                {menu.name}
              </Link>
            ))}

            {/* Logout Button */}
            <motion.button 
              onClick={handleSignOut}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-colors flex items-center gap-3 text-sm border-t border-gray-700 mt-2"
            >
              <FaPowerOff className="text-red-400 text-lg" />
              Log Out
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDetails;