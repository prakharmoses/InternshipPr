import React, { useEffect } from 'react';
import { FaTimes, FaHome, FaQuestion, FaGraduationCap, FaChalkboardTeacher, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Importing Context
import { useSidebar } from '../context/SidebarContext';

// Importing Assets
import profile from '../assets/pic-1.jpg';

export default function Sidebar() {
    const { sidebarActive, setSidebarActive, toggleSidebar } = useSidebar();

    // Defining functions
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 1200) {
                setSidebarActive(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setSidebarActive(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${sidebarActive ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
            {/* <button
                onClick={closeSidebar}
                className="absolute top-4 right-4 text-2xl text-red-600 dark:text-red-400"
            >
                <FaTimes />
            </button> */}
            <div className="p-4">
                <div className="text-center mb-8">
                    <img src={profile} className="h-24 w-24 rounded-full mx-auto" alt="Profile" />
                    <h3 className="text-xl text-gray-900 dark:text-gray-100 mt-2">Shaikh Anas</h3>
                    <p className="text-gray-600 dark:text-gray-400">Student</p>
                    <button className="text-white bg-purple-600 rounded-lg py-2 px-6 text-xl">View Profile</button>
                </div>
                <nav className="flex flex-col">
                    <Link to="/" className="flex items-center p-4 transition-colors duration-300 group text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaHome className="mr-4 text-xl" />
                        <span className='transition-transform duration-300 group-hover:translate-x-4'>Home</span>
                    </Link>
                    <Link to="/about-us" className="flex items-center p-4 transition-colors duration-300 group text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaQuestion className="mr-4 text-xl" />
                        <span className='transition-transform duration-300 group-hover:translate-x-4'>About</span>
                    </Link>
                    <Link to="/courses" className="flex items-center p-4 transition-colors duration-300 group text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaGraduationCap className="mr-4 text-xl" />
                        <span className='transition-transform duration-300 group-hover:translate-x-4'>Courses</span>
                    </Link>
                    <Link to="/teachers" className="flex items-center p-4 transition-colors duration-300 group text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaChalkboardTeacher className="mr-4 text-xl" />
                        <span className='transition-transform duration-300 group-hover:translate-x-4'>Teachers</span>
                    </Link>
                    <Link to="/contact" className="flex items-center p-4 transition-colors duration-300 group text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaHeadset className="mr-4 text-xl" />
                        <span className='transition-transform duration-300 group-hover:translate-x-4'>Contact Us</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};