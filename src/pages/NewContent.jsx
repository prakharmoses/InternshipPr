import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import components
import Modal from '../components/Modal';

// Import Context
import { useSidebar } from '../context/SidebarContext';

// Import Hooks
import { useAccount } from '../hooks/useAuth';

export default function NewContent() {
    const { sidebarActive } = useSidebar();
    const { courseId } = useParams();
    const { account, callBackendApi } = useAccount();
    const navigate = useNavigate();

    // Define states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contentImg, setContentImg] = useState('');
    const [contentType, setContentType] = useState('');
    const [content, setContent] = useState('');
    const [uploadType, setUploadType] = useState('link');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const randomNumber = Math.floor(Math.random() * 5) + 1;

    // To valide file content
    const isFileTypeAllowed = (file) => {
        if (contentType === "video") {
            return file.type.startsWith("video/");
        }
        return (
            file.type === "application/pdf" ||
            file.type === "application/msword" ||
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.type === "text/plain"
        );
    };

    // Function to handle file upload
    const handleFileUpload = (file) => {
        if (file) {
            if (isFileTypeAllowed(file)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setContent(reader.result);
                };
                reader.readAsDataURL(file);
                setContent(file);
            } else {
                alert("File type not allowed. Please select a valid file.");
            }
        }
        setIsModalOpen(false);
    }

    // Function to handle image upload
    const handleImageUpload = (file) => {
        if (file) {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setContentImg(reader.result);
                };
                reader.readAsDataURL(file);
                setContentImg(file);
            } else {
                alert("File type not allowed. Please select a valid file.");
            }
        }
    }

    // Function to create new content
    const handleCreateNewContent = async (e) => {
        e.preventDefault();
        
        const newContent = {
            title,
            description,
            contentType,
            contentImg,
            content,
            course: courseId,
            tutor: account.id
        }
        try {
            const response = await callBackendApi(`/content/add`, 'POST', newContent);
            const data = await response.json();

            if (response.status === 201) {
                navigate(`/content/${data}`);
            } else {
                alert(`Content not created. Error: ${data.message}`);
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Create content error:', error);
        } finally {
            setTitle('');
            setDescription('');
            setContentImg('');
            setContentType('');
            setContent('');
        }
    }

    useEffect(() => {
        console.log("Course Id = ", courseId);
    }, []);

    return (
        <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full py-[11rem] px-[8rem] relative`}>
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60 dark:opacity-0"
                style={{ backgroundImage: `url('/bgImage.jpg')` }}
            />
            <div
                className="absolute inset-0 bg-cover bg-center opacity-0 dark:opacity-70"
                style={{ backgroundImage: `url('/beautiful-forest-landscape.jpg')` }}
            />
            <div className='bg-slate-100 dark:bg-slate-900 px-8 py-6 relative z-[10]'>
                <h2 className="text-2xl text-black dark:text-white font-medium mb-4">New Content: {title}</h2>
                <form
                    onSubmit={handleCreateNewContent}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                    <div>
                        <div className="mb-4">
                            <label for="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Title</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Title of the content'
                                className="border border-gray-400 p-2 text-gray-800 dark:text-gray-200 dark:bg-black w-full rounded-lg focus:outline-none focus:border-blue-400"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label for="contentType" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Content Type</label>
                            <select
                                id="contentType"
                                name="contentType"
                                value={contentType}
                                onChange={(e) => setContentType(e.target.value)}
                                className="border border-gray-400 text-gray-800 dark:text-gray-200 dark:bg-black p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                                required
                            >
                                <option value="" disabled className="text-gray-400">Select content type</option>
                                <option value="video">Video</option>
                                <option value="document">Document</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label for="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Description</label>
                            <textarea
                                id="message"
                                name="message"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-gray-400 text-gray-800 dark:text-gray-200 dark:bg-black p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" rows="5"
                            ></textarea>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {contentImg === '' ? (
                            <div className="flex items-center justify-center w-full">
                                <label
                                    for="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                            const droppedFile = e.dataTransfer.files[0];
                                            handleImageUpload(droppedFile);
                                            e.dataTransfer.clearData();
                                        }
                                    }}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload thumbnail image</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e.target.files[0])}
                                    />
                                </label>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full">
                                <img
                                    src={contentImg}
                                    alt="content"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>
                        )}
                        {content === '' ? (contentType !== '' &&
                            <div className="flex items-center justify-center w-full">
                                <section
                                    className="px-8 py-2 cursor-pointer border border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <div className="absolute -bottom-2 -right-2 bg-yellow-300 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload {contentType === 'video' ? 'video' : 'document'}</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{contentType === 'video' ? 'MP4' : 'PDF, DOC, DOCX, TXT'}</p>
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full">
                                {(contentType === 'video' && uploadType === 'local') ? (
                                    <video
                                        src={content}
                                        className="w-full h-64 rounded-lg"
                                        controls
                                    ></video>
                                ) : (
                                    <iframe
                                        src={content}
                                        className="w-full h-64 rounded-lg"
                                        title="content"
                                        allowFullScreen
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    ></iframe>
                                )}
                            </div>
                        )}
                    </div>
                    <button className="p-[3px] relative w-full mb-3" type='submit'>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                            Proceed
                        </div>
                    </button>
                </form>
            </div>

            {isModalOpen && (
                <Modal title={`Upload ${contentType}`} closeModal={() => setIsModalOpen(false)}>
                    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-gray-800 px-6 pb-10 rounded-lg">
                        <div className="flex justify-around my-6">
                            <button
                                className={`px-4 py-2 rounded-md ${uploadType === 'local' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                                    }`}
                                onClick={() => setUploadType('local')}
                            >
                                Upload from Local PC
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md ${uploadType === 'link' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                                    }`}
                                onClick={() => setUploadType('link')}
                            >
                                Upload from Online Link
                            </button>
                        </div>

                        {uploadType === 'local' && (
                            <div>
                                <label
                                    for="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                            const droppedFile = e.dataTransfer.files[0];
                                            // if (isFileTypeAllowed(droppedFile)) {
                                            handleFileUpload(droppedFile);
                                            // } else {
                                            //     alert("File type not allowed. Please select a valid file.");
                                            // }
                                            e.dataTransfer.clearData();
                                        }
                                    }}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload {contentType === 'video' ? 'video' : 'document'}</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{contentType === 'video' ? 'MP4' : 'PDF, DOC, DOCX, TXT'}</p>
                                    </div>
                                    <button
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        accept={contentType === 'video' ? 'video/*' : '.pdf, .doc, .docx, .txt'}
                                        onChange={(e) => handleFileUpload(e.target.files[0])}
                                    />
                                </label>
                            </div>
                        )}

                        {uploadType === 'link' && (<>
                            <div>
                                <label className="block text-black dark:text-white mb-2">
                                    Enter Link:
                                </label>
                                <input
                                    type="text"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter online file link"
                                    className="border rounded-md p-2 w-full text-black dark:text-white bg-slate-100 dark:bg-slate-900"
                                />
                            </div>

                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md mt-4"
                                onClick={() => setIsModalOpen(false)}
                                disabled={!uploadType || !content}
                            >
                                Upload
                            </button>
                        </>)}
                    </div>
                </Modal>
            )}
        </main>
    )
}