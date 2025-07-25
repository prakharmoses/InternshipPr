import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import context
import { useSidebar } from "../context/SidebarContext";

// Import hooks
import { useAccount } from "../hooks/useAuth";

// Import components
import ElementLoading from "./ElementLoading";

const dummyPlaylist = [
    { id: 1, title: 'JavaScript', image: 'https://img.icons8.com/color/452/javascript.png', profileImg: 'https://img.icons8.com/color/452/like' },
    { id: 2, title: 'React', image: 'https://img.icons8.com/color/452/react-native.png', profileImg: 'https://img.icons8.com/color/452/like' },
    { id: 3, title: 'Node.js', image: 'https://img.icons8.com/color/452/nodejs.png', profileImg: 'https://img.icons8.com/color/452/like' },
    { id: 4, title: 'Express', image: 'https://img.icons8.com/color/452/express.png', profileImg: 'https://img.icons8.com/color/452/like' },
    { id: 5, title: 'MongoDB', image: 'https://img.icons8.com/color/452/mongodb.png', profileImg: 'https://img.icons8.com/color/452/like' },
    { id: 6, title: 'Python', image: 'https://img.icons8.com/color/452/python.png', profileImg: 'https://img.icons8.com/color/452/like' },
    { id: 7, title: 'Django', image: 'https://img.icons8.com/color/452/django.png', profileImg: 'https://img.icons8.com/color/452/like' },
    { id: 8, title: 'Flask', image: 'https://img.icons8.com/color/452/flask.png', profileImg: 'https://img.icons8.com/color/452/like' },
    { id: 9, title: 'PostgreSQL', image: 'https://img.icons8.com/color/452/postgreesql.png', profileImg: 'https://img.icons8.com/color/452/like' },
    { id: 10, title: 'SQLite', image: 'https://img.icons8.com/color/452/sql.png', profileImg: 'https://img.icons8.com/color/452/like' },
]

const PlaylistSection = ({ userId, profileId }) => {
    const { sidebarActive } = useSidebar();
    const { callBackendApi } = useAccount();

    // Define states
    const [playlistList, setPlaylistList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Remove playlist from the list
    const handleRemovePlaylist = async (playlistId) => {
        setPlaylistList(playlistList.filter((playlist) => playlist.id !== playlistId));
        const temp = playlistList.find((playlist) => playlist.id === playlistId);
        try {
            const response = await callBackendApi(`/courses/saveCourse/${playlistId}`, 'PATCH', null);
            const data = await response.json();

            if (response.status !== 200) {
                const tracebackArray = [...playlistList];
                setPlaylistList(tracebackArray.push(temp));
                throw new Error(data.message);
            }
        } catch (err) {
            console.error("Error saving course: ", err);
        }
    }

    // Load the playlist
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await callBackendApi(`/courses/getSavedCourses/${profileId}`, 'GET', null);
                const data = await response.json();

                if (response.status === 200) {
                    setPlaylistList(data);
                } else {
                    setPlaylistList([]);
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error('Error loading playlist:', error);
            }
        }

        fetchPlaylist();
    }, [profileId, callBackendApi]);

    setTimeout(() => {
        setIsLoading(false);
    }, [1000]);

    if (isLoading) {
        return (
            <ElementLoading />
        )
    }

    return (
        <div className={`grid ${sidebarActive ? 'grid-cols-3 gap-2' : 'grid-cols-4 gap-[12rem]'} gap-y-6 max-w-6xl my-16 mx-10`}>
            {Array.isArray(playlistList) && playlistList.length > 0 ? playlistList.map((playlist) => (
                <div key={playlist.id} className="relative max-w-sm w-[20rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {/* Cancel/Delete Icon */}
                    {profileId === userId && <button
                        onClick={() => handleRemovePlaylist(playlist.id)}
                        disabled={profileId !== userId}
                        className="absolute top-2 right-2 p-1 rounded-full opacity-70 bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:dark:bg-red-500 transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>}

                    {/* Playlist Image */}
                    <Link to={`/course/${playlist.id}`}>
                        <img className="rounded-t-lg w-full" src={playlist.image} alt="" />
                    </Link>

                    {/* Playlist Details */}
                    <div className="p-5 flex flex-row gap-4">
                        <Link to={`/profile/${playlist.tutorId}?tab=about`}>
                            <img src={playlist.profileImg} alt="" className="rounded-full max-h-10 max-w-10" />
                        </Link>
                        <Link to={`/course/${playlist.id}`}>
                            <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{playlist.title}</h5>
                        </Link>
                    </div>
                </div>
            )) : <div className="col-span-12 text-center text-gray-500 dark:text-gray-400">No saved playlists found.</div>}
        </div>
    )
}

export default PlaylistSection;