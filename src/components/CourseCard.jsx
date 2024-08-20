import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ tutorImage, tutorName, date, thumbImage, videoCount, title, link }) => (
    <div className="bg-white dark:bg-black rounded-lg p-8">
        <div className="flex items-center gap-6 mb-10">
            <img src={tutorImage} alt="" className="h-16 w-16 rounded-full object-cover" />
            <div>
                <h3 className="text-2xl text-black dark:text-white mb-1">{tutorName}</h3>
                <span className="text-lg text-gray-600 dark:text-gray-400">{date}</span>
            </div>
        </div>
        <div className="relative">
            <img src={thumbImage} alt="" className="w-full h-50 object-cover rounded-lg" />
            {videoCount !== '' && <span className="absolute top-4 left-4 bg-black bg-opacity-30 text-white px-6 py-2 rounded-lg text-xl">
                {videoCount} videos
            </span>}
        </div>
        <h3 className="text-3xl text-black dark:text-white pt-4 pb-2">{title}</h3>
        <Link to={link} className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                View Playlist
            </span>
        </Link>
    </div>
);

export default CourseCard;