import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaCode, FaPen,
  FaChartLine, FaMusic, FaCamera,
  FaCog, FaVial, FaHtml5,
  FaCss3, FaJs, FaReact,
  FaPhp, FaBootstrap
} from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';
import { SiScikitlearn } from "react-icons/si";

// Importing context
import { useDarkMode } from '../context/DarkModeContext';
import { useSidebar } from '../context/SidebarContext';

// Importing hooks
import { useAccount } from '../hooks/useAuth.js';

// Importing components
import CourseCard from '../components/CourseCard';

// Importing assets
import pic2 from '../assets/pic-2.jpg';
import pic3 from '../assets/pic-3.jpg';
import pic4 from '../assets/pic-4.jpg';
import pic5 from '../assets/pic-5.jpg';
import pic6 from '../assets/pic-6.jpg';
import pic7 from '../assets/pic-7.jpg';
import thumb1 from '../assets/thumb-1.png';
import thumb2 from '../assets/thumb-2.png';
import thumb3 from '../assets/thumb-3.png';
import thumb4 from '../assets/thumb-4.png';
import thumb5 from '../assets/thumb-5.png';
import thumb6 from '../assets/thumb-6.png';

// Define arrays
const categoryIcons = {
    'Development': <FaCode className='mr-2 text-black dark:text-white' />,
    'Business': <FaChartSimple className='mr-2 text-black dark:text-white' />,
    'Design': <FaPen className='mr-2 text-black dark:text-white' />,
    'Marketing': <FaChartLine className='mr-2 text-black dark:text-white' />,
    'Software': <FaCog className='mr-2 text-black dark:text-white' />,
    'Science': <FaVial className='mr-2 text-black dark:text-white' />,
    'JTML': <FaHtml5 className='mr-2 text-black dark:text-white' />,
    'CSS': <FaCss3 className='mr-2 text-black dark:text-white' />,
    'JavaScript': <FaJs className='mr-2 text-black dark:text-white' />,
    'React': <FaReact className='mr-2 text-black dark:text-white' />,
    'PHP': <FaPhp className='mr-2 text-black dark:text-white' />,
    'Bootstrap': <FaBootstrap className='mr-2 text-black dark:text-white' />,
    'Machine Learning': <SiScikitlearn className='mr-2 text-black dark:text-white' />,
}

export default function Home() {
    const navigate = useNavigate();
    const { isDarkMode, setIsDarkMode, toggleDarkMode } = useDarkMode();
    const { account, callBackendApi } = useAccount();
    const { sidebarActive } = useSidebar();

    // Initialising state
    const [categories, setCategories] = useState([
      'Development', 'Business', 'Design', 'Marketing', 'Software', 'Science', 'JTML', 'CSS', 'JavaScript', 'React', 'PHP',
      'Bootstrap', 'Machine Learning'
    ]);
    const [courses, setCourses] = useState([
      { courseId: 'bdojgdoj', tutorId: 'sgjmigus', tutorImg: pic2, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb1, videoCount: 10, title: 'Complete HTML Tutorial' },
      { courseId: 'bdojgdoj', tutorId: 'sgjmigus', tutorImg: pic3, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb2, videoCount: 10, title: 'Complete CSS Tutorial' },
      { courseId: 'bdojgdoj', tutorId: 'sgjmigus', tutorImg: pic4, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb3, videoCount: 10, title: 'Complete JS Tutorial' },
      { courseId: 'bdojgdoj', tutorId: 'sgjmigus', tutorImg: pic5, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb4, videoCount: 10, title: 'Complete Bootstrap Tutorial' },
      { courseId: 'bdojgdoj', tutorId: 'sgjmigus', tutorImg: pic6, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb5, videoCount: 10, title: 'Complete jQuery Tutorial' },
      { courseId: 'bdojgdoj', tutorId: 'sgjmigus', tutorImg: pic7, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb6, videoCount: 10, title: 'Complete SASS Tutorial' },
    ])
    const [accountInsights, setAccountInsights] = useState({
        likes: 0,
        comments: 0,
        playlist: 0
    })
    const [sentEmail, setSentEmail] = useState(false);

    // Function to handle the become tutor button
    const handleBecomeTutor = async () => {
        if (!localStorage.getItem('account')) {
            return navigate('/login');
        }

        // Add the user in the tutors list
        try {
              const response = callBackendApi(`/tutors/add`, 'POST', null);
              if (response.status === 409 || response.status === 201) {
                navigate(`/profile/${account.id}?tab=myCourses`);
              } else if (response.status === 417) {
                  const data = await response.json();
                  setSentEmail(true);
                  alert(data.message);
              } else {
                  const data = await response.json();
                  throw new Error(data.message);
              }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
      const fetchTopCourses = async () => {
          try {
              const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/courses/topCourses/6`);
              const data = await response.json();

              if (response.status === 200) {
                  setCourses(data.courses);
              } else if (response.status === 404) {
                  setCourses([]);
              } else {
                  console.error(data.message);
                  throw new Error(data.message);
              }
          } catch (error) {
              console.error(error.message);
          }
      }

      const fetchProfileInsights = async () => {
          try {
              const response = await callBackendApi( `/users/getProfile-insights/${account.email}`, 'GET', null);
              const data = await response.json();

              if (response.ok) {
                  setAccountInsights({
                      likes: data.likes,
                      comments: data.comments,
                      playlist: data.saved
                  });
              } else {
                  throw new Error(data.message);
              }
          } catch (error) {
              console.error(error.message);
          }
      }

      const fetchCategories = async () => {
          try {
              const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/company/getCategories/${process.env.REACT_APP_COMPANY_ID}`);
              const data = await response.json();

              if (response.status === 200) {
                  setCategories(data.categories);
              } else {
                  throw new Error(data.message);
              }
          } catch (error) {
              console.error(error.message);
          }
      }

      // Initialise the category icons

      // Initialise the Courses
      fetchTopCourses();

      // Fetch the account insights
      fetchProfileInsights();

      // Fetch the categories
      fetchCategories();
    }, []);

    return (
      <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[7rem] bg-white dark:bg-black`}>
        <section>
          <div className="grid grid-cols-auto-fit gap-6 justify-center">
            <div className="mx-12 my-14">
              <div className="flex flex-wrap -mx-6">
                <Link to={`/profile/${account.id}?tab=likes`} className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-slate-800">
                    <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                      <svg className="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                          fill="currentColor"></path>
                        <path
                          d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                          fill="currentColor"></path>
                        <path
                          d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                          fill="currentColor"></path>
                        <path
                          d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                          fill="currentColor"></path>
                        <path
                          d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                          fill="currentColor"></path>
                        <path
                          d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                          fill="currentColor"></path>
                      </svg>
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">{accountInsights.likes}</h4>
                      <div className="text-gray-500">Likes</div>
                    </div>
                  </div>
                </Link>

                <Link to={`/profile/${account.id}?tab=comment`} className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-slate-800">
                    <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                      <svg className="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                          fill="currentColor"></path>
                        <path
                          d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                          fill="currentColor"></path>
                        <path
                          d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                          fill="currentColor"></path>
                      </svg>
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">{accountInsights.comments}</h4>
                      <div className="text-gray-500">Commnets</div>
                    </div>
                  </div>
                </Link>

                <Link to={`/profile/${account.id}?tab=playlist`} className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-slate-800">
                    <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                      <svg className="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor"
                          stroke="currentColor" strokeWidth="2" stroke-linejoin="round"></path>
                        <path
                          d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                          stroke="currentColor" strokeWidth="2"></path>
                      </svg>
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">{accountInsights.playlist}</h4>
                      <div className="text-gray-500">Saved Playlist</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <section className="bg-gray-50 py-8 w-[67rem] mx-auto antialiased dark:bg-gray-900 md:py-8">
              {Array.isArray(categories) && categories.length > 0 ? <div className="mx-auto max-w-screen-xl px-4">
                <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Popular Topics and Categories</h2>

                  <Link to="/courses" title="" className="flex items-center text-base font-medium text-primary-700 hover:underline dark:text-primary-500">
                    See more
                    <svg className="ms-1 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {categories.map((category, idx) => (
                    <Link key={idx} to={`/courses/${category.name}`} className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      {categoryIcons[category]}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{category}</span>
                    </Link>
                  ))}
                </div>
              </div> : <div className="text-center text-gray-900 dark:text-gray-100">No categories found</div>}
            </section>

            {!account.roles.includes('tutor') && <div className="bg-white dark:bg-black rounded-lg p-6 shadow-[0_0_20px_3px_#d48aff] dark:shadow-[0_0_20px_3px_#a91efa]">
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Become a tutor</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Join us for an exciting journey to educate society. A decent salary is promised.</p>
              <button
                  onClick={handleBecomeTutor}
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded"
              >Get Started</button>
            </div>}
            {sentEmail && <div className="bg-white dark:bg-black text-green-600 dark:text-green-400 rounded-lg p-6 shadow-[0_0_20px_3px_#d48aff] dark:shadow-[0_0_20px_3px_#a91efa]">Email sent successfully!</div>}
          </div>
        </section>

        <section className="py-20">
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-600 dark:text-slate-400">Our Top Courses</h1>
          <div className={`grid grid-cols-1 gap-6 px-4 ${!sidebarActive ? 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'}`}>
            {courses.map((course, idx) => (
              <CourseCard
                key={idx}
                tutorImage={course.tutorImg}
                tutorName={course.tutorName}
                date={course.date}
                thumbImage={course.thumbImg}
                videoCount={course.videoCount}
                title={course.title}
                link={course.link}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to='/courses'
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-black shadow-md shadow-gray-900/10 dark:shadow-gray-100/10 hover:shadow-lg hover:shadow-gray-900/20 hover:dark:shadow-gray-100/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-[70%] mx-auto"
            >
              View All Courses
            </Link>
          </div>
        </section>
      </main>
    );
}