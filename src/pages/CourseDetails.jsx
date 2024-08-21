import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";

// Importing context
import { useSidebar } from '../context/SidebarContext';

// Importing assets
import pic2 from '../assets/pic-2.jpg';
import thumb1 from '../assets/thumb-1.png';
import thumb2 from '../assets/thumb-2.png';

export default function CourseDetails() {
  const { sidebarActive } = useSidebar();

  // Defining State
  const [course, setCourse] = useState({
    tutorImg: pic2,
    tutorName: 'John Deo',
    tutorId: 1,
    date: '21-10-2022',
    thumbImg: thumb1,
    contentCount: 10,
    title: 'Complete HTML Tutorial',
    desctiption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum minus reiciendis, error sunt veritatis exercitationem deserunt velit doloribus itaque voluptate.',
    content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    saved: false,
  });
  const [courseContent, setCourseContent] = useState([
    { title: 'Content 1', contentImg: thumb2, id: 1 },
    { title: 'Content 2', contentImg: thumb1, id: 2 },
    { title: 'Content 3', contentImg: thumb2, id: 3 },
    { title: 'Content 4', contentImg: thumb1, id: 4 },
    { title: 'Content 5', contentImg: thumb2, id: 5 },
    { title: 'Content 6', contentImg: thumb1, id: 6 },
    { title: 'Content 7', contentImg: thumb2, id: 7 },
    { title: 'Content 8', contentImg: thumb1, id: 8 },
    { title: 'Content 9', contentImg: thumb2, id: 9 },
    { title: 'Content 10', contentImg: thumb1, id: 10 },
  ])

  return (
    <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[4rem] bg-white dark:bg-black text-gray-900 dark:text-gray-100`}>
      <section className="playlist-details py-8">
        <h1 className="text-2xl md:text-3xl pl-2 my-2 mx-10 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
          {course.title}
        </h1>
        <div className="flex flex-row flex-wrap gap-12 bg-white dark:bg-black p-8 shadow-[0_0_10px_2px_#2dd4bf] dark:shadow-[0_0_20px_5px_#2dd4bf] mx-10 my-8">
          <div className="min-w-[15rem]">
            <button
              type="submit"
              className="absolute top-[28vh] right-16 bg-transparent border-2 border-gray-400 dark:border-gray-600 hover:border-gray-500 rounded-lg p-2 flex flex-row items-center cursor-pointer"
              onClick={() => setCourse({ ...course, saved: !course.saved })}
            >
              {!course.saved ? <CiBookmark className="text-2xl mr-2" /> : <IoBookmark className="text-2xl mr-2" />}
              <span className="text-lg">Save Playlist</span>
            </button>
            <div className="relative">
              <img
                src={course.thumbImg}
                alt=""
                className="h-[16rem] object-cover rounded-lg"
              />
              <span className="text-lg text-white bg-black/30 rounded-lg absolute top-4 left-4 py-2 px-6">
                {course.contentCount} Videos
              </span>
            </div>
          </div>

          <div className="flex flex-col min-w-[15rem] p-4 pt-0 lg:flex-1 lg:w-[37rem]">
            <div className="flex flex-row items-center gap-8">
              <img
                src={course.tutorImg}
                alt=""
                className="h-24 w-24 rounded-full object-cover"
              />
              <div className='flex flex-col'>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-1">{course.tutorName}</h3>
                <span className="text-lg text-gray-600 dark:text-gray-400">{course.date}</span>
              </div>
            </div>
            <div>
              <p className="py-4 text-lg text-gray-600 dark:text-gray-400 leading-8 w-full">{course.desctiption}</p>
              <Link className="relative" href={`/profile/${course.tutorId}`}>
                <span className="absolute top-0 left-0 mt-1 ml-1 h-[1.75rem] w-[10rem] rounded border-2 dark:bg-black border-gray-400 bg-gray-400"></span>
                <span className="fold-bold relative inline-block h-[2.2rem] w-[10rem] rounded border-2 border-black dark:bg-white bg-black px-3 py-1 text-base font-bold dark:text-black text-white transition duration-100 hover:dark:bg-yellow-300 hover:bg-gray-900 hover:dark:text-gray-900 hover:text-yellow-300">View Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Playlist Videos Section */}
      <section className="playlist-videos py-8 mx-6">
        <h1 className="heading text-3xl font-bold mb-6">course content</h1>
        <div className="box-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-start">
          {[
            "part 01",
            "part 02",
            "part 03",
            "part 04",
            "part 05",
            "part 06",
          ].map((part, index) => (
            <a
              key={index}
              className="box bg-white p-8 rounded-lg relative"
              href="watch-video.html"
            >
              <i className="fas fa-play absolute top-8 left-8 right-8 h-80 bg-black/30 flex items-center justify-center text-5xl text-white rounded-lg hidden group-hover:flex"></i>
              <img
                src={`images/post-1-${index + 1}.png`}
                alt=""
                className="w-full h-80 object-cover rounded-lg"
              />
              <h3 className="mt-6 text-lg text-black group-hover:text-main-color">
                complete HTML tutorial ({part})
              </h3>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
