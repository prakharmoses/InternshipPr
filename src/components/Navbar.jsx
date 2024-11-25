import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaUser, FaSun, FaMoon } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';

// Importing Context
import { useDarkMode } from '../context/DarkModeContext';
import { useSidebar } from '../context/SidebarContext';

// Importing Hooks
import { useAccount } from '../hooks/useAuth';

// Importing Assets
import profile from '../assets/pic-1.jpg';

export default function Navbar() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { sidebarActive, toggleSidebar } = useSidebar();
    const { account, logout } = useAccount();

    // Defining states
    const [profileActive, setProfileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

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

    const handleSearch = (e) => {
        e.preventDefault();
        const searchInput = searchRef.current.querySelector('input[name="search_box"]');
        let searchQuery = '';

        if (searchInput) {
            searchQuery = searchInput.value.trim();
        }
        searchParams.set('search', searchQuery);
        setSearchParams(searchParams);
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 h-20 border-b dark:bg-gray-900 dark:border-gray-700 bg-white border-gray-200 transition-transform duration-300 ease-in-out ${sidebarActive ? 'ml-72' : 'ml-0'}`}>
            <section className="flex items-center justify-between p-6 h-20 max-w-screen-xl mx-auto text-black dark:text-white">
                <Link to="/" className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Angirasoft</Link>

                <form
                    className="flex items-center gap-4 w-1/2 rounded-lg p-4 h-12 dark:bg-gray-700 bg-gray-100"
                    ref={searchRef}
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        name="search_box"
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
                    {account.id ? (<>
                        <img src={account.avatar} className="h-40 w-40 rounded-full mx-auto mb-4" alt="" />
                        <h3 className="text-2xl text-black dark:text-white truncate">{account.name}</h3>
                        <p className="text-xl text-gray-600">{account.role}</p>
                        <div className="flex flex-col gap-4 mt-4">
                            <Link to={`/profile/${account.id}`} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2">View Profile</Link>
                            <button onClick={() => logout()} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2">Logout</button>
                        </div>
                    </>) : (<>
                        <img src={profile} className="h-40 w-40 rounded-full object-contain mb-4" alt="" />
                        <h3 className="text-2xl text-black dark:text-white truncate">Guest</h3>
                        <p className="text-xl text-gray-600">guest</p>
                        <div className="flex gap-4 mt-4">
                            <Link to="/login" className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Login</Link>
                            <Link to="/signup" className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Sign Up</Link>
                        </div>
                    </>)}
                </div>
            </section>
        </header>
    );
};