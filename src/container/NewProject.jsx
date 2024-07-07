import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaCodepen, FaCss3, FaHtml5, FaJs } from 'react-icons/fa';
import { FcSettings } from 'react-icons/fc';
import SplitPane from 'react-split-pane';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MdCheck, MdEdit, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { UserProfileDetails } from '../components';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { Alert } from '../components';
import { SiAwselasticloadbalancing } from 'react-icons/si';

const NewProject = () => {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [output, setOutput] = useState("");
    const [title, setTitle] = useState("Untitled");
    const [isTitle, setIsTitle] = useState(false);
    const [alert, setAlert] = useState(false);
    const [isHtmlMenu, setIsHtmlMenu] = useState(false);
    const [isCssMenu, setIsCssMenu] = useState(false);
    const [isJsMenu, setIsJsMenu] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        updateOutput();
    }, [html, css, js]);

    const updateOutput = () => {
        const combinedOutput = `
          <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                 ${html}
                 <script>${js}</script>
            </body>
           </html>
        `;
        setOutput(combinedOutput);
    };

    const saveProgram = async () => {
        const id = `${Date.now()}`;
        const _doc = {
            id: id,
            title: title,
            html: html,
            css: css,
            js: js,
            output: output,
            user: user,
        };
        await setDoc(doc(db, "Projects", id), _doc)
            .then((res) => {
                setAlert(true);
            })
            .catch((err) => console.log(err));
        setTimeout(() => {
            setAlert(false);
        }, 2000);
    };

    const clearHtml = () => {
        setHtml("");
        setIsHtmlMenu(false);
    };

    const clearCss = () => {
        setCss("");
        setIsCssMenu(false);
    };

    const clearJs = () => {
        setJs("");
        setIsJsMenu(false);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); 
    };

    const slideUpOut = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 },
        transition: { duration: 0.2 }
    };

    return (
        <>
            <div className='w-full h-screen flex flex-col items-start justify-start overflow-hidden'>
                {/*alert*/}
                <AnimatePresence>
                    {alert && <Alert status={"Success"} alertMsg={"Project Saved"} />}
                </AnimatePresence>
                {/*header*/}
                <header className='w-full flex items-center justify-between px-12 py-4'>
                    <div className='flex items-center justify-center gap-6'>
                        <Link to={"/home/projects"} className='flex items-center gap-2'>
                            <p className='text-primaryText text-3xl italic'>C</p>
                            <FaCodepen className='text-primaryText text-3xl italic' />
                            <p className='text-primaryText text-3xl italic'>DEPEN</p>
                        </Link>

                        <div className='flex flex-col items-start justify-start'>
                            {/*title and user info*/}
                            <div className='flex items-center justify-center gap-3'>
                                <AnimatePresence>
                                    {isTitle ? (
                                        <>
                                            <motion.input
                                                key={"TitleInput"}
                                                type="text"
                                                placeholder="Your Title"
                                                className='px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none'
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <motion.p key={"titleLabel"} className='px-3 py-2 text-white text-lg'>
                                                {title}
                                            </motion.p>
                                        </>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {isTitle ? (
                                        <>
                                            <motion.div key={"MdCheck"} whileTap={{ scale: 0.9 }} className='cursor-pointer' onClick={() => setIsTitle(false)}>
                                                <MdCheck className='text-2xl text-emerald-500' />
                                            </motion.div>
                                        </>
                                    ) : (
                                        <>
                                            <motion.div key={"MdEdit"} whileTap={{ scale: 0.9 }} className='cursor-pointer' onClick={() => setIsTitle(true)}>
                                                <MdEdit className='text-2xl text-primaryText' />
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                            {/*user info*/}
                            <div className='flex items-center justify-center px-3 mt-0 gap-0'>
                                <p className='text-primaryText text-sm'>
                                    {user?.displayName ? user.displayName : user?.email.split("@")[0]}
                                </p>
                                <motion.div whileTap={{ scale: 0.9 }} onClick={toggleFavorite} className='text-[10px] rounded-sm px-2 py-1 text-primary cursor-pointer font-semibold flex items-center gap-1'>
                                    {isFavorite ? <MdFavorite className='text-red-500 text-base' /> : <MdFavoriteBorder className='text-white text-base' />}             
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    {/*user section*/}
                    {user && (
                        <div className='flex items-center justify-center gap-4'>
                            <motion.button onClick={saveProgram} whileTap={{ scale: 0.9 }} className='px-4 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md'>Save</motion.button>
                            <UserProfileDetails />
                        </div>
                    )}
                </header>

                {/*coding*/}
                <div>
                    {/*horizontal*/}
                    <SplitPane split='horizontal' minSize={400} maxSize={-300} defaultSize={"55%"}>
                        {/*top coding*/}
                        <SplitPane split='vertical' minSize={500} maxSize={-900}>
                            {/*html*/}
                            <div className='w-full h-full flex flex-col items-start justify-start'>
                                <div className='w-full flex items-center justify-between'>
                                    <div className='bg-secondary px-4 py-2 border-t-4 flex relative items-center justify-center gap-3 border-t-gray-500'>
                                        <FaHtml5 className='text-xl text-red-500' />
                                        <p className='text-primaryText font-semibold'>HTML</p>
                                    </div>

                                    {/*icons*/}
                                    <div className='cursor-pointer flex items-center justify-center gap-4 px-4'>
                                        <motion.div whileTap={{ scale: 0.9 }} className='flex items-center justify-center cursor-pointer' onClick={() => setIsHtmlMenu(!isHtmlMenu)}>
                                            <FcSettings className='text-xl text-primaryText' />
                                        </motion.div>
                                        <motion.div onClick={() => setIsHtmlMenu(!isHtmlMenu)} whileTap={{ scale: 0.9 }} className='p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer'>
                                            <FaChevronDown className='text-primaryText' />
                                        </motion.div>
                                    </div>
                                </div>
                                <div className='w-full px-2 overflow-auto' style={{ height: '600px' }}>
                                    <CodeMirror value={html} height='100%' extensions={[javascript({ jsx: true })]} theme={"dark"} onChange={(value, ViewUpdate) => {
                                        setHtml(value);
                                    }} />
                                </div>
                                <AnimatePresence>
                                    {isHtmlMenu && (
                                        <motion.div {...slideUpOut} className='bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]'>
                                            <motion.p onClick={clearHtml} whileTap={{ scale: 0.9 }} className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-full cursor-pointer'>
                                                Clear
                                            </motion.p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <SplitPane split='vertical' minSize={500} maxSize={-500}>
                                {/*css*/}
                                <div className='w-full h-full flex flex-col items-start justify-start'>
                                    <div className='w-full flex items-center justify-between'>
                                        <div className='bg-secondary px-4 py-2 border-t-4 flex relative items-center justify-center gap-3 border-t-gray-500'>
                                            <FaCss3 className='text-xl text-sky-500' />
                                            <p className='text-primaryText font-semibold'>CSS</p>
                                        </div>

                                        {/*icons*/}
                                        <div className='cursor-pointer flex items-center justify-center gap-4 px-4'>
                                            <motion.div whileTap={{ scale: 0.9 }} className='flex items-center justify-center cursor-pointer' onClick={() => setIsCssMenu(!isCssMenu)}>
                                                <FcSettings className='text-xl text-primaryText' />
                                            </motion.div>
                                            <motion.div onClick={() => setIsCssMenu(!isCssMenu)} whileTap={{ scale: 0.9 }} className='p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer'>
                                                <FaChevronDown className='text-primaryText' />
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className='w-full px-2 overflow-auto' style={{ height: '600px' }}>
                                        <CodeMirror value={css} height='100%' extensions={[javascript({ jsx: true })]} theme={"dark"} onChange={(value, ViewUpdate) => {
                                            setCss(value);
                                        }} />
                                    </div>
                                    <AnimatePresence>
                                        {isCssMenu && (
                                            <motion.div {...slideUpOut} className='bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]'>
                                                <motion.p onClick={clearCss} whileTap={{ scale: 0.9 }} className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-full cursor-pointer'>
                                                    Clear
                                                </motion.p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/*js*/}
                                <div className='w-full h-full flex flex-col items-start justify-start'>
                                    <div className='w-full flex items-center justify-between'>
                                        <div className='bg-secondary px-4 py-2 border-t-4 flex relative items-center justify-center gap-3 border-t-gray-500'>
                                            <FaJs className='text-xl text-yellow-500' />
                                            <p className='text-primaryText font-semibold'>JavaScript</p>
                                        </div>

                                        {/*icons*/}
                                        <div className='cursor-pointer flex items-center justify-center gap-4 px-4'>
                                            <motion.div whileTap={{ scale: 0.9 }} className='flex items-center justify-center cursor-pointer' onClick={() => setIsJsMenu(!isJsMenu)}>
                                                <FcSettings className='text-xl text-primaryText' />
                                            </motion.div>
                                            <motion.div onClick={() => setIsJsMenu(!isJsMenu)} whileTap={{ scale: 0.9 }} className='p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer'>
                                                <FaChevronDown className='text-primaryText' />
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className='w-full px-2 overflow-auto' style={{ height: '600px' }}>
                                        <CodeMirror value={js} height='100%' extensions={[javascript({ jsx: true })]} theme={"dark"} onChange={(value, ViewUpdate) => {
                                            setJs(value);
                                        }} />
                                    </div>
                                    <AnimatePresence>
                                        {isJsMenu && (
                                            <motion.div {...slideUpOut} className='bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]'>
                                                <motion.p onClick={clearJs} whileTap={{ scale: 0.9 }} className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-full cursor-pointer'>
                                                    Clear
                                                </motion.p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </SplitPane>
                        </SplitPane>

                        {/*bottom result*/}
                        <div className='bg-gray-400' style={{ overflow: "hidden", height: "100%" }}>
                            <iframe
                                title='Result'
                                srcDoc={output}
                                style={{ border: "none", width: "100%", height: "100%" }}
                            />
                        </div>
                    </SplitPane>
                </div>
            </div>
        </>
    );
};

export default NewProject;
