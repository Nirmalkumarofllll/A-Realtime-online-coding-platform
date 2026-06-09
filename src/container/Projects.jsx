import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects || []);
  const searchTerm = useSelector((state) => state.searchTerm?.searchTerm || "");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [projects, searchTerm]);

  return (
    <div className='w-full py-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center py-12">
            <p className='text-primaryText text-lg'>No Results found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [iframeHeight, setIframeHeight] = useState('305px'); // Default height
  const userName = project?.user?.displayName || project?.user?.email.split("@")[0];

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      setIframeHeight(event.data + 'px');
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const toggleBookmark = () => {
    setIsBookmark(!isBookmark);
  };

  return (
    <motion.div 
      key={index} 
      className='w-full cursor-pointer h-auto bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4'
    >
      <div className='bg-primary w-full rounded-md' style={{ overflow: 'hidden' }}>
        <iframe
        title='Result'
        srcDoc={project.output}
        style={{
          border: 'none',
          width: '100%',
          height: iframeHeight,
          overflow: 'hidden'
        }}
        scrolling="no"
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

export default Projects;