import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaUser, FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Importing Context
import { useDarkMode } from '../context/DarkModeContext';
import { useSidebar } from '../context/SidebarContext';

// Importing Assets
import profile from '../assets/pic-1.jpg';

export default function Navbar() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { sidebarActive, toggleSidebar } = useSidebar();

    // Defining states
    const [profileActive, setProfileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    // Defining refs
    const profileRef = useRef(null);
    const searchRef = useRef(null);

    // Defining functions
    useEffect(() => {
        const handleScroll = () => {
            setProfileActive(false);
            setSearchActive(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleProfile = () => setProfileActive(!profileActive);
    // const toggleSearch = () => setSearchActive(!searchActive);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 h-20 border-b dark:bg-gray-900 dark:border-gray-700 bg-white border-gray-200 transition-transform duration-300 ease-in-out ${sidebarActive ? 'ml-72' : 'ml-0'}`}>
            <section className="flex items-center justify-between p-6 h-20 max-w-screen-xl mx-auto text-black dark:text-white">
                <Link to="/" className="text-3xl font-semibold">Angirasoft</Link>

                <form
                    className="flex items-center gap-4 w-1/2 rounded-lg p-4 h-12 dark:bg-gray-700 bg-gray-100"
                    ref={searchRef}
                >
                    <input
                        type="text"
                        name="search_box"
                        required
                        placeholder="Search courses..."
                        maxLength="100"
                        className="w-full text-lg bg-transparent focus:outline-none active:clip-path-full-square focus:clip-path-full-square dark:text-white text-black"
                    />
                    <button
                        type="submit"
                        className="text-2xl dark:text-yellow-300 hover:dark:text-yellow-400 text-black hover:text-purple-600"
                    >
                        <FaSearch />
                    </button>
                </form>

                <div className="flex items-center gap-2">
                    <div
                        id="menu-btn"
                        className={`text-2xl rounded-full h-12 w-12 flex items-center justify-center cursor-pointer ${sidebarActive ? 'bg-gray-800 text-white dark:bg-gray-100 dark:text-black' : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'} hover:bg-gray-800 hover:text-white`}
                        onClick={toggleSidebar}
                    >
                        <FaBars />
                    </div>
                    {/* <div id="search-btn" className="text-2xl text-black bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white">
                        <FaSearch />
                    </div> */}
                    <div
                        id="user-btn"
                        onClick={toggleProfile}
                        className={`text-2xl rounded-full h-12 w-12 flex items-center justify-center cursor-pointer ${profileActive ? 'bg-gray-800 text-white dark:bg-gray-100 dark:text-black' : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'} hover:bg-gray-800 hover:text-white`}
                    >
                        <FaUser />
                    </div>
                    <div
                        // id="toggle-btn"
                        onClick={toggleDarkMode}
                        className='text-2xl rounded-full h-12 w-12 flex items-center justify-center cursor-pointer dark:bg-gray-800 dark:text-white bg-gray-100 text-black hover:bg-gray-800 hover:text-white'
                    >
                        {isDarkMode === true ? <FaMoon /> : <FaSun />}
                    </div>
                </div>

                <div
                    className={`absolute top-full right-8 rounded-lg p-4 text-center flex flex-col items-center overflow-hidden transform transition-transform duration-200 ease-linear w-80 ${profileActive ? 'scale-100' : 'scale-0'} dark:bg-gray-900 bg-neutral-100 text-black dark:text-white`}
                    ref={profileRef}
                >
                    <img src={profile} className="h-40 w-40 rounded-full object-contain mb-4" alt="" />
                    <h3 className="text-2xl text-black truncate">shaikh anas</h3>
                    <p className="text-xl text-gray-600">studen</p>
                    <Link to="profile.html" className="block bg-purple-600 text-white text-lg py-2 px-6 rounded mt-4">view profile</Link>
                    <div className="flex gap-4 mt-4">
                        <Link to="login.html" className="block bg-orange-400 text-white text-lg py-2 px-6 rounded">login</Link>
                        <Link to="register.html" className="block bg-orange-400 text-white text-lg py-2 px-6 rounded">register</Link>
                    </div>
                </div>
            </section>
        </header>
    );
};