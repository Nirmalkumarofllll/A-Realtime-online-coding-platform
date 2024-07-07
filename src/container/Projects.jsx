import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects);  
  return (
    <div className='w-full py-6 flex items-center justify-center gap-6 flex-wrap'>
      {projects && projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const userName = project?.user?.displayName || project?.user?.email.split("@")[0];

  const toggleBookmark = () => {
    setIsBookmark(!isBookmark); // Toggle bookmark state
  };
  
  return (
    <motion.div key={index} className='w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4'>
      <div className='bg-primary w-full h-full rounded-md overflow-hidden' style={{ overflow: "hidden", height: "100%" }}>
        <iframe
          title='Result'
          srcDoc={project.output}
          style={{ border: "none", width: "100%", height: "100%" }}
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
        <div>
          <p className='text-white text-lg capitalize'>{project?.title}</p>
          <p className='text-primaryText text-sm capitalize'>
            {userName}
          </p>
        </div>
        {/* collection */}
        <motion.div whileTap={{ scale: 0.9 }} onClick={toggleBookmark} className='cursor-pointer ml-auto'>
          {isBookmark ? <MdBookmark className='text-3xl text-primaryText' /> : <MdBookmarkBorder className='text-primaryText text-3xl' />}             
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Projects;
