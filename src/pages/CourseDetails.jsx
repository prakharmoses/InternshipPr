import React, { useState, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

// Importing context
import { useSidebar } from '../context/SidebarContext';

// Import hooks
import { useAccount } from '../hooks/useAuth';

// Import components
import Modal from '../components/Modal';

// Import icons
import { TiPlus } from 'react-icons/ti';
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";

// Importing assets
import pic2 from '../assets/pic-2.jpg';
import thumb1 from '../assets/thumb-1.png';
import thumb2 from '../assets/thumb-2.png';

export default function CourseDetails() {
  const { sidebarActive } = useSidebar();
  const { account, callBackendApi } = useAccount();
  const { courseId } = useParams();

  // Defining Refs
  const textareaRef = useRef(null);

  // Defining State
  const [course, setCourse] = useState({
    tutorImg: pic2,
    tutorName: 'John Deo',
    tutorId: '671a422e0899b8a02e74fff8',
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
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.desctiption);
  const [newContentModalOpen, setNewContentModalOpen] = useState(false);

  // Handling Course Title Change
  const handleCourseTitleChange = () => {
    if (title !== course.title) {
      // try {
      //   const response = callBackendApi('PATCH', `/courses/${course.id}`, { title });
      //   setCourse({ ...course, title });
      // } catch (error) {
      //   console.error('Error updating course title:', error);
      // }
    }
  }

  // Handling Course Description Change
  const handleCourseDescriptionChange = () => {
    if (description !== course.desctiption) {
      // try {
      //   const response = callBackendApi('PATCH', `/courses/${course.id}`, { desctiption: description });
      //   setCourse({ ...course, desctiption: description });
      // } catch (error) {
      //   console.error('Error updating course description:', error);
      // }
    }
  }

  // Define functions using useEffect
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to make it shrink before resizing
      textareaRef.current.style.height = 'auto';
      // Set height to the scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [description]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = fetch(`${process.env.REACT_APP_API_URL}/courses/${course.id}`);
        const data = await response.json();
        if (response.status === 200) {
          setCourse(data);
        } else {
          throw new Error(data.message)
        }
      } catch (err) {
        console.error('Error fetching course details:', err);
      }
    }

    const fetechCourseContent = async () => {
      try {
        const response = fetch(`${process.env.REACT_APP_API_URL}/courses/${course.id}/content`);
        const data = await response.json();
        if (response.status === 200) {
          setCourseContent(data);
        } else {
          throw new Error(data.message)
        }
      } catch (err) {
        console.error('Error fetching course content:', err);
      }
    }

    // fetchCourseDetails();
    // fetechCourseContent();
  }, [])

  return (
    <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[4rem] bg-white dark:bg-black text-gray-900 dark:text-gray-100`}>
      <section className="playlist-details py-8">
        <input
          className="text-2xl md:text-3xl pl-2 my-2 mx-10 max-w-[60rem] w-[fit-content] border-l-4 font-sans font-bold inline-block bg-transparent border-teal-400  dark:text-gray-200 focus:outline-none focus:border-b-2 py-1 focus:border-b-black focus:dark:border-b-white"
          style={{ borderBottomStyle: 'dashed' }}
          value={title}
          size={title.length || 1}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleCourseTitleChange}
          disabled={account.id !== course.tutorId}
        />
        <div className="flex flex-row flex-wrap gap-12 bg-white dark:bg-black p-8 shadow-[0_0_10px_2px_#2dd4bf] dark:shadow-[0_0_20px_5px_#2dd4bf] mx-10 my-8">
          <div className="min-w-[15rem]">
            {account.id !== course.tutorId && (<button
              type="submit"
              className="absolute top-[28vh] right-16 bg-transparent border-2 border-gray-400 dark:border-gray-600 hover:border-gray-500 rounded-lg p-2 flex flex-row items-center cursor-pointer"
              onClick={() => setCourse({ ...course, saved: !course.saved })}
            >
              {!course.saved ? <CiBookmark className="text-2xl mr-2" /> : <IoBookmark className="text-2xl mr-2" />}
              <span className="text-lg">Save Playlist</span>
            </button>)}
            <div className="relative">
              <img
                src={course.thumbImg}
                alt=""
                className="h-[16rem] object-cover rounded-lg"
              />
              <span className="text-lg text-white bg-black/30 rounded-lg absolute top-4 left-4 py-2 px-6">
                {course.contentCount} Items
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
            <div className='flex flex-col gap-2'>
              <textarea
                ref={textareaRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => {
                  // Add function to handle saving the data on blur
                  handleCourseDescriptionChange();
                }}
                disabled={account.id !== course.tutorId}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.blur();
                  }
                }}
                className={`py-2 mb-2 mt-2 overflow-hidden min-h-[3rem] bg-transparent text-lg text-gray-600 dark:text-gray-400 leading-8 ${sidebarActive ? 'w-[41vw]' : 'w-[60vw]'} px-4 -ml-4`}
              />
              {account.id !== course.tutorId ? (
                <Link className="relative" href={`/profile/${course.tutorId}`}>
                  <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded border-2 dark:bg-black border-gray-400 bg-gray-400"></span>
                  <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black dark:bg-white bg-black px-3 py-1 text-base font-bold dark:text-black text-white transition duration-100 hover:dark:bg-yellow-300 hover:bg-gray-900 hover:dark:text-gray-900 hover:text-yellow-300">View Profile</span>
                </Link>
              ) : (
                <Link className="relative w-[fit-content]" to={`/profile/${course.tutorId}`}>
                  <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded border-2 dark:bg-black border-gray-400 bg-gray-400"></span>
                  <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black dark:bg-white bg-black px-3 py-1 text-base font-bold dark:text-black text-white transition duration-100 hover:dark:bg-yellow-300 hover:bg-gray-900 hover:dark:text-gray-900 hover:text-yellow-300">Mark as Completed</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* New Content Modal */}
      {newContentModalOpen && (
        <Modal
          title="New Content"
          closeModal={() => setNewContentModalOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              className="input"
            />
            <input
              type="text"
              placeholder="Video URL"
              className="input"
            />
            <button className="btn">Add Content</button>
          </div>
        </Modal>
      )}

      {/* Playlist Videos Section */}
      <section className="playlist-videos py-8 mx-6">
        <div className="relative flex flex-row items-center justify-between my-8">
          <div className="relative top-0 left-10 max-w-full md:left-15">
            <div className="bg-black dark:bg-white text-7xl font-bold text-white dark:text-black px-8 py-4 rounded-[1rem]">Content</div>
          </div>

          <Link
            to={`/content/${courseId}/new-content`}
            className="flex flex-row items-center gap-4 w-[max-content] rounded-xl px-4 mr-14 py-2 border-dashed border-2 border-gray-300 text-gray-900 bg-gray-50 hover:bg-gray-200 dark:border-gray-600 dark:text-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800 cursor-pointer"
          ><TiPlus /> New Content</Link>
        </div>
        <div className="box-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-start">
          {courseContent.map((part) => (
            <Link
              key={part.id}
              className="box bg-transparent p-4 rounded-lg relative"
              to={`/content/${part.id}`}
            >
              <img
                src={part.contentImg}
                alt=""
                className="w-full h-52 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-black dark:text-white group-hover:text-main-color">
                {part.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
