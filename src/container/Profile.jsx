// container/Profile.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendarAlt, FaCode } from 'react-icons/fa';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

const Profile = () => {
  const user = useSelector(state => state.user?.user);
  const projects = useSelector(state => state.projects?.projects || []);
  
  // Filter projects created by the current user
  const userProjects = projects.filter(project => project.user?.uid === user?.uid);
  const username =
  user?.displayName?.replace(/[0-9]/g, "") ||
  user?.email?.split("@")[0]?.replace(/[0-9]/g, "") ||
  "User";

  return (
    <div className='w-full max-w-7xl mx-auto py-8 px-4'>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary rounded-2xl p-8 mb-8 shadow-lg"
      >
        <div className="flex items-center gap-6">
          {/* User Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"
            )}
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">
              {user?.displayName || "Anonymous User"}
            </h1>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCode className="text-green-400" />
                <span>{userProjects.length} Projects</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-secondary rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <FaCode className="text-green-400" />
          My Projects ({userProjects.length})
        </h2>
        
        {userProjects.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {userProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaCode className="text-gray-500 text-6xl mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No projects created yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Start coding to see your projects here!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Reusing the same ProjectCard component from Projects.jsx
const ProjectCard = ({ project, index }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [iframeHeight, setIframeHeight] = useState('305px'); // Same height as Projects.jsx
  const userName = project?.user?.displayName || project?.user?.email.split("@")[0];

  const toggleBookmark = () => {
    setIsBookmark(!isBookmark);
  };

  return (
    <motion.div 
      key={index} 
      className='w-full cursor-pointer h-auto bg-gray-700 rounded-md p-4 flex flex-col items-center justify-center gap-4'
    >
      <div className='bg-gray-700 w-full rounded-md' style={{ overflow: 'hidden' }}>
        <iframe
          title='Result'
          srcDoc={project.output}
          style={{ border: 'none', width: '100%', height: iframeHeight }}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
      <div className='flex gap-3 w-full'>
        {/* image */}
        <div className='w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-teal-500'>
          {project?.user?.photoURL ? (
            <motion.img 
              whileHover={{ scale: 1.2 }} 
              src={project?.user?.photoURL} 
              alt={project?.user?.displayName} 
              referrerPolicy='no-referrer' 
              className='w-full h-full object-cover' 
            />
          ) : (
            <p className='text-xl text-white font-semibold capitalize'>
              {project?.user?.email[0]}
            </p>
          )}
        </div>
        {/* name */}
        <div className='flex-1 min-w-0'>
          <p className='text-white text-lg capitalize truncate'>{project?.title}</p>
          <p className='text-primaryText text-sm capitalize truncate'>
            {userName}
          </p>
        </div>
        {/* collection */}
        <motion.div whileTap={{ scale: 0.9 }} onClick={toggleBookmark} className='cursor-pointer ml-auto flex-shrink-0'>
          {isBookmark ? <MdBookmark className='text-3xl text-primaryText' /> : <MdBookmarkBorder className='text-primaryText text-3xl' />}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Profile;