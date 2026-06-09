import React, { useEffect, useState, useCallback } from 'react';
import { FaChevronDown, FaCodepen, FaCss3, FaHtml5, FaJs, FaPlay, FaSave } from 'react-icons/fa';
import SplitPane from 'react-split-pane';
import Editor from '@monaco-editor/react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MdCheck, MdEdit, MdFavorite, MdFavoriteBorder, MdAccountCircle } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { UserProfileDetails } from '../components';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { Alert } from '../components';


const NewProject = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const [cssCode, setCssCode] = useState("");
    const [jsCode, setJsCode] = useState("");
    const [output, setOutput] = useState("");
    const [title, setTitle] = useState("Title");
    const [isTitle, setIsTitle] = useState(false);
    const [alert, setAlert] = useState(false);
    const [isHtmlMenu, setIsHtmlMenu] = useState(false);
    const [isCssMenu, setIsCssMenu] = useState(false);
    const [isJsMenu, setIsJsMenu] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const user = useSelector((state) => state.user.user);

    // Default code templates
    const defaultHTML = ``;

    const defaultCSS = ``;

    const defaultJS = ``;
    

    // Initialize with default code if empty
    useEffect(() => {
        if (!htmlCode && !cssCode && !jsCode) {
            setHtmlCode(defaultHTML);
            setCssCode(defaultCSS);
            setJsCode(defaultJS);
        }
    }, []);

    const updateOutput = useCallback(() => {
        const combinedOutput = `
<html>
<head>
    <style>${cssCode}</style>
</head>
<body>
    ${htmlCode}
    <script>${jsCode}</script>
</body>
</html>`;
        setOutput(combinedOutput);
    }, [htmlCode, cssCode, jsCode]);

    useEffect(() => {
        updateOutput();
    }, [updateOutput]);

    const saveProgram = async () => {
        if (!user) {
            setAlert(true);
            setTimeout(() => setAlert(false), 2000);
            return;
        }

        const id = `${Date.now()}`;
        const _doc = {
            id: id,
            title: title,
            html: htmlCode,
            css: cssCode,
            js: jsCode,
            output: output,
            user: user,
            isFavorite: isFavorite,
            createdAt: new Date().toISOString(),
        };
        
        try {
            await setDoc(doc(db, "Projects", id), _doc);
            setAlert(true);
            setTimeout(() => setAlert(false), 2000);
        } catch (err) {
            console.error("Error saving project:", err);
            setAlert(true);
            setTimeout(() => setAlert(false), 2000);
        }
    };

    const clearHtml = () => {
        setHtmlCode("");
        setIsHtmlMenu(false);
    };

    const clearCss = () => {
        setCssCode("");
        setIsCssMenu(false);
    };

    const clearJs = () => {
        setJsCode("");
        setIsJsMenu(false);
    };

    const slideUpOut = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 },
        transition: { duration: 0.2 }
    };

    // Enhanced editor options with auto-typing features
    const getEditorOptions = (language) => ({
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        formatOnPaste: true,
        formatOnType: true,
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        autoClosingBrackets: language === 'javascript' ? 'always' : 'languageDefined',
        autoClosingQuotes: 'always',
        autoIndent: 'full',
        tabCompletion: 'on',
        // HTML-specific auto-closing
        autoClosingTags: language === 'html' ? 'always' : 'never',
        // CSS-specific
        autoSurround: language === 'css' ? 'brackets' : 'never',
        // Enhanced suggestions
        suggest: {
            showKeywords: true,
            showSnippets: true,
            showMethods: true,
            showFunctions: true,
            showClasses: true,
        },
        // Bracket pair colorization
        bracketPairColorization: {
            enabled: true
        },
        guides: {
            bracketPairs: true
        }
    });

    // Function to handle editor mounting with custom auto-typing configurations
    const handleEditorDidMount = (editor, monaco, language) => {
        // Add custom auto-completion providers
        if (language === 'html') {
            // HTML specific snippets and auto-closing
            monaco.languages.registerCompletionItemProvider('html', {
                provideCompletionItems: (model, position) => {
                    const word = model.getWordUntilPosition(position);
                    const range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                    };

                    return {
                        suggestions: [
                            {
                                label: 'div',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '<div>${1:content}</div>',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'p',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '<p>${1:content}</p>',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'span',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '<span>${1:content}</span>',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'button',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '<button>${1:Click me}</button>',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'input',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '<input type="${1:text}" placeholder="${2:Enter text}">',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'img',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '<img src="${1:image.jpg}" alt="${2:description}">',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'a',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '<a href="${1:#}">${2:Link}</a>',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            }
                        ]
                    };
                }
            });
        }

        if (language === 'css') {
            // CSS specific snippets
            monaco.languages.registerCompletionItemProvider('css', {
                provideCompletionItems: (model, position) => {
                    const word = model.getWordUntilPosition(position);
                    const range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                    };

                    return {
                        suggestions: [
                            {
                                label: 'flex-center',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: 'display: flex;\njustify-content: center;\nalign-items: center;',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'absolute-center',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: 'position: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'box-shadow',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: 'box-shadow: ${1:0} ${2:2}px ${3:4}px rgba(0,0,0,${4:0.1});',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            }
                        ]
                    };
                }
            });
        }

        if (language === 'javascript') {
            // JavaScript specific snippets
            monaco.languages.registerCompletionItemProvider('javascript', {
                provideCompletionItems: (model, position) => {
                    const word = model.getWordUntilPosition(position);
                    const range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                    };

                    return {
                        suggestions: [
                            {
                                label: 'function',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: 'function ${1:functionName}(${2:params}) {\n\t${3:// code}\n}',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'arrow-function',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: 'const ${1:functionName} = (${2:params}) => {\n\t${3:// code}\n}',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'foreach',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '${1:array}.forEach((${2:item}) => {\n\t${3:// code}\n});',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            },
                            {
                                label: 'addEventListener',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '${1:element}.addEventListener(\'${2:click}\', (${3:e}) => {\n\t${4:// code}\n});',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                range: range
                            }
                        ]
                    };
                }
            });
        }

        // Add keyboard shortcuts for common actions
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            saveProgram();
        });

        // Focus the editor
        editor.focus();
    };

    return (
        <div className='w-full h-screen flex flex-col items-start justify-start overflow-hidden bg-gray-900'>
            {/* Alert */}
            <AnimatePresence>
                {alert && (
                    <Alert 
                        status={user ? "Success" : "Error"} 
                        alertMsg={user ? "Project Saved Successfully!" : "Please login to save projects"} 
                    />
                )}
            </AnimatePresence>
            
            {/* Header - Reduced padding and made more compact */}
            <header className='w-full flex items-center justify-between px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 shadow-lg z-50 relative'>
                {/* Left Section - Brand & Project Info */}
                <div className='flex items-center justify-center gap-6'>
                    <Link 
                        to={"/home/projects"} 
                        className='flex items-center gap-3 group hover:opacity-90 transition-all duration-200'
                    >
                        <div className='flex flex-col'>
                            <p className="text-3xl font-extrabold tracking-tight relative group text-green-400">
                                C<span className="inline-block animate-bounce text-green-400">O</span>DESYNC
                                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-green-400 group-hover:w-full transition-all duration-500"></span>
                            </p>
                            <p className='text-gray-400 text-xs font-medium'>Web Editor</p>
                        </div>
                    </Link>

                    {/* Project Info */}
                    <div className='h-12 w-px bg-gray-600'></div>
                    
                    <div className='flex flex-col items-start justify-center'>
                        {/* Project Title */}
                        <div className='flex items-center justify-center gap-2'>
                            <AnimatePresence mode='wait'>
                                {isTitle ? (
                                    <motion.div
                                    key={"titleInput"}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="flex items-center gap-2"
                                    >
                                        <input
                                        type="text"
                                        placeholder="Project title..."
                                        value={title}
                                        className='px-4 py-2 rounded-lg bg-gray-700 text-white text-base border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors w-64'
                                        onChange={(e) => setTitle(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && setIsTitle(false)}
                                        onBlur={() => setIsTitle(false)}
                                        autoFocus
                                        />
                                        <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                                        onClick={() => setIsTitle(false)}
                                        >
                                            <MdCheck className="text-lg" />
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                    key={"titleDisplay"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 group"
                                    >
                                        <h1 className='text-white text-xl font-medium px-3 py-2 rounded-lg group-hover:bg-gray-700 transition-colors cursor-pointer'>
                                            {title}
                                        </h1>
                                        <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        onClick={() => setIsTitle(true)}
                                        >
                                            <MdEdit className="text-lg" />
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>                        
                    </div>
                </div>
                
                {/* Right Section - Actions & User */}
                <div className='flex items-center justify-center gap-4'>
                    {/* Action Buttons */}
                    <div className='flex items-center gap-3'>
                        
                        {/* Save Button */}
                        <motion.button 
                            onClick={saveProgram} 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }} 
                            className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 cursor-pointer text-white font-medium rounded-lg transition-all shadow-lg border border-blue-500'
                            title="Ctrl+S"
                        >
                            <FaSave className='text-sm' />
                            <span>Save</span>
                        </motion.button>
                    </div>
                    
                    {/* Separator */}
                    <div className='h-8 w-px bg-gray-600'></div>
                    
                    {/* User Profile */}
                    {user && (
                        <div className='flex items-center gap-3'>
                            <UserProfileDetails />
                        </div>
                    )}
                </div>
            </header>

            {/* Coding section - Adjusted height calculation to account for smaller header */}
            <div className="w-full flex-1 -mt-16">
                <SplitPane split="horizontal" defaultSize="60%" minSize={300} style={{ position: 'relative' }}>
                    {/* Top section - Code editors */}
                    <SplitPane split="vertical" defaultSize="33%" minSize={300}>
                        {/* HTML Editor */}
                        <div className='w-full h-full flex flex-col items-start justify-start relative bg-gray-900'>
                            <div className='w-full flex items-center justify-between bg-gray-800 border-b border-gray-700'>
                                <div className='px-3 py-2 flex items-center justify-center gap-2'>
                                    <FaHtml5 className='text-lg text-red-500' />
                                    <p className='text-white font-semibold text-sm'>HTML</p>
                                </div>
                                <div className='cursor-pointer flex items-center justify-center gap-1 px-3'>
                                    <motion.div 
                                        onClick={() => setIsHtmlMenu(!isHtmlMenu)} 
                                        whileTap={{ scale: 0.9 }} 
                                        className='p-1 rounded-md flex items-center justify-center bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors'
                                    >
                                        <FaChevronDown className='text-white text-sm' />
                                    </motion.div>
                                </div>
                            </div>
                            <div className='w-full h-full overflow-hidden'>
                                <Editor
                                    height="100%"
                                    language="html"
                                    value={htmlCode}
                                    onChange={setHtmlCode}
                                    theme="vs-dark"
                                    options={getEditorOptions('html')}
                                    onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, 'html')}
                                    loading={<div className="text-white p-4">Loading HTML Editor...</div>}
                                />
                            </div>
                            <AnimatePresence>
                                {isHtmlMenu && (
                                    <motion.div 
                                        {...slideUpOut} 
                                        className='absolute top-10 right-3 bg-gray-800 px-3 py-2 rounded-lg shadow-lg z-10 border border-gray-700 flex flex-col items-start justify-start gap-1 min-w-[160px]'
                                    >
                                        <motion.p 
                                            onClick={clearHtml} 
                                            whileTap={{ scale: 0.95 }} 
                                            className='text-white text-xs hover:bg-gray-700 px-2 py-1.5 w-full rounded-md cursor-pointer transition-colors'
                                        >
                                            Clear HTML
                                        </motion.p>
                                        {/*<motion.p 
                                            onClick={resetToDefault} 
                                            whileTap={{ scale: 0.95 }} 
                                            className='text-white text-xs hover:bg-gray-700 px-2 py-1.5 w-full rounded-md cursor-pointer transition-colors'
                                        >
                                            Reset to Default
                                        </motion.p> */}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <SplitPane split="vertical" defaultSize="50%" minSize={300}>
                            {/* CSS Editor */}
                            <div className='w-full h-full flex flex-col items-start justify-start relative bg-gray-900'>
                                <div className='w-full flex items-center justify-between bg-gray-800 border-b border-gray-700'>
                                    <div className='px-3 py-2 flex items-center justify-center gap-2'>
                                        <FaCss3 className='text-lg text-blue-500' />
                                        <p className='text-white font-semibold text-sm'>CSS</p>
                                    </div>
                                    <div className='cursor-pointer flex items-center justify-center gap-1 px-3'>
                                        <motion.div 
                                            onClick={() => setIsCssMenu(!isCssMenu)} 
                                            whileTap={{ scale: 0.9 }} 
                                            className='p-1 rounded-md flex items-center justify-center bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors'
                                        >
                                            <FaChevronDown className='text-white text-sm' />
                                        </motion.div>
                                    </div>
                                </div>
                                <div className='w-full h-full overflow-hidden'>
                                    <Editor
                                        height="100%"
                                        language="css"
                                        value={cssCode}
                                        onChange={setCssCode}
                                        theme="vs-dark"
                                        options={getEditorOptions('css')}
                                        onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, 'css')}
                                        loading={<div className="text-white p-4">Loading CSS Editor...</div>}
                                    />
                                </div>
                                <AnimatePresence>
                                    {isCssMenu && (
                                        <motion.div 
                                            {...slideUpOut} 
                                            className='absolute top-10 right-3 bg-gray-800 px-3 py-2 rounded-lg shadow-lg z-10 border border-gray-700 flex flex-col items-start justify-start gap-1 min-w-[160px]'
                                        >
                                            <motion.p 
                                                onClick={clearCss} 
                                                whileTap={{ scale: 0.95 }} 
                                                className='text-white text-xs hover:bg-gray-700 px-2 py-1.5 w-full rounded-md cursor-pointer transition-colors'
                                            >
                                                Clear CSS
                                            </motion.p>
                                            {/*<motion.p 
                                                onClick={resetToDefault} 
                                                whileTap={{ scale: 0.95 }} 
                                                className='text-white text-xs hover:bg-gray-700 px-2 py-1.5 w-full rounded-md cursor-pointer transition-colors'
                                            >
                                                Reset to Default
                                            </motion.p>*/}
                                        </motion.div> 
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* JavaScript Editor */}
                            <div className='w-full h-full flex flex-col items-start justify-start relative bg-gray-900'>
                                <div className='w-full flex items-center justify-between bg-gray-800 border-b border-gray-700'>
                                    <div className='px-3 py-2 flex items-center justify-center gap-2'>
                                        <FaJs className='text-lg text-yellow-500' />
                                        <p className='text-white font-semibold text-sm'>JavaScript</p>
                                    </div>
                                    <div className='cursor-pointer flex items-center justify-center gap-1 px-3'>
                                        <motion.div 
                                            onClick={() => setIsJsMenu(!isJsMenu)} 
                                            whileTap={{ scale: 0.9 }} 
                                            className='p-1 rounded-md flex items-center justify-center bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors'
                                        >
                                            <FaChevronDown className='text-white text-sm' />
                                        </motion.div>
                                    </div>
                                </div>
                                <div className='w-full h-full overflow-hidden'>
                                    <Editor
                                        height="100%"
                                        language="javascript"
                                        value={jsCode}
                                        onChange={setJsCode}
                                        theme="vs-dark"
                                        options={getEditorOptions('javascript')}
                                        onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, 'javascript')}
                                        loading={<div className="text-white p-4">Loading JavaScript Editor...</div>}
                                    />
                                </div>
                                <AnimatePresence>
                                    {isJsMenu && (
                                        <motion.div 
                                            {...slideUpOut} 
                                            className='absolute top-10 right-3 bg-gray-800 px-3 py-2 rounded-lg shadow-lg z-10 border border-gray-700 flex flex-col items-start justify-start gap-1 min-w-[160px]'
                                        >
                                            <motion.p 
                                                onClick={clearJs} 
                                                whileTap={{ scale: 0.95 }} 
                                                className='text-white text-xs hover:bg-gray-700 px-2 py-1.5 w-full rounded-md cursor-pointer transition-colors'
                                            >
                                                Clear JavaScript
                                            </motion.p>
                                            {/*<motion.p 
                                                onClick={resetToDefault} 
                                                whileTap={{ scale: 0.95 }} 
                                                className='text-white text-xs hover:bg-gray-700 px-2 py-1.5 w-full rounded-md cursor-pointer transition-colors'
                                            >
                                                Reset to Default
                                            </motion.p>*/}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </SplitPane>
                    </SplitPane>

                    {/* Bottom section - Output preview */}
                    <div className='w-full h-full flex flex-col bg-white'>
                        <div className='w-full flex items-center justify-between bg-gray-800 border-b border-gray-700 py-2 px-3'>
                            <p className='text-white font-semibold text-sm'></p>
                            <div className='flex items-center gap-1'>
                                <p className='text-xl text-green-400 animate-pulse'>•</p><p className='text-green-400 animate-pulse '> Live Preview</p>
                                {/*<motion.button 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={updateOutput}
                                    className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-md transition-colors ml-2'
                                >
                                    Refresh
                                </motion.button>*/}
                            </div>
                        </div>
                        <div className='w-full h-full'>
                            <iframe
                                title='Live Preview'
                                srcDoc={output}
                                style={{ 
                                    border: "none", 
                                    width: "100%", 
                                    height: "100%",
                                    background: "white"
                                }}
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                    </div>
                </SplitPane>
            </div>
        </div>
    );
};

export default NewProject;