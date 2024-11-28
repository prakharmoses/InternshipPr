import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";

// Importing Context
import { useSidebar } from '../context/SidebarContext';

// Import Hooks
import { useAccount } from '../hooks/useAuth';

// Importing Components
import LoadingUI from '../components/LoadingUI';

// Importing assets
import pic2 from '../assets/pic-2.jpg';
import pic3 from '../assets/pic-3.jpg';
import pic4 from '../assets/pic-4.jpg';
import pic5 from '../assets/pic-5.jpg';
import pic6 from '../assets/pic-6.jpg';
import pic7 from '../assets/pic-7.jpg';
import pic8 from '../assets/pic-8.jpg';

const dummyTutors = [
  { id: 1, img: pic2, name: 'john deo', role: 'developer', courses: 4, content: 18, likes: 1208 },
  { id: 2, img: pic3, name: 'john deo', role: 'developer', courses: 4, content: 18, likes: 1208 },
  { id: 3, img: pic4, name: 'john deo', role: 'developer', courses: 4, content: 18, likes: 1208 },
  { id: 4, img: pic5, name: 'john deo', role: 'developer', courses: 4, content: 18, likes: 1208 },
  { id: 5, img: pic6, name: 'john deo', role: 'developer', courses: 4, content: 18, likes: 1208 },
  { id: 6, img: pic7, name: 'john deo', role: 'developer', courses: 4, content: 18, likes: 1208 },
  { id: 7, img: pic8, name: 'john deo', role: 'developer', courses: 4, content: 18, likes: 1208 },
]

export default function Teachers() {
    const { sidebarActive } = useSidebar();
    const { account, updateAccessParameters, callBackendApi } = useAccount();
    const navigate = useNavigate();

    // Defining State
    const [teachersData, setTeachersData] = useState(dummyTutors);
    const [isTutorInvite, setIsTutorInvite] = useState(true);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    // Defining functions
    useEffect(() => setIsTutorInvite(true), []);

    // Function to handle the become tutor button
    const handleBecomeTutor = async () => {
        if (!localStorage.getItem('account')) {
            return navigate('/login');
        }

        // Add the user in the tutors list
        try {
              const response = await callBackendApi(`/tutors/add`, 'POST', null);
              if (response.status === 409 || response.status === 201) {
                  if (response.status === 201) {
                      const data = await response.json();
                      updateAccessParameters({ accessTokenNew: data.accessToken, rolesNew: data.roles, newEmail: account.email });
                  }
                  navigate(`/profile/${account.id}?tab=mycourses`);
              } else if (response.status === 417) {
                  const data = await response.json();
                  console.log("The data recieved in creating tutor is: ", data);
                  alert(data.message);
              } else {
                  const data = await response.json();
                  throw new Error(data.message);
              }
        } catch (error) {
            console.error(error.message);
        }
    }

    // Fetching tutors
    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/tutors`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();

                if (response.status === 200) {
                    console.log("The data recieved in fetching tutors is: ", data);
                    setTeachersData(data);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error('Fetching tutors error:', error);
            }
        }

        fetchTutors();
    }, []);

    setTimeout(() => {
      setIsPageLoaded(true);
  }, [1000]);

  if (!isPageLoaded) {
      return (
          <main className={`ml-[18rem] w-[82vw] h-[100vh] pt-[5rem] pb-[7rem] bg-slate-300 dark:bg-black`}>
              <LoadingUI />
          </main>
      )
  }

  return (
      <main className={`${sidebarActive && 'ml-[18rem]'} border-gray-500 border-2 h-full pt-[5rem] pb-[7rem] bg-white dark:bg-black`}>
        <section className="p-4">
          <h1 className="text-4xl font-bold mb-8 text-slate-700 dark:text-slate-300 border-b-[0.5px] p-4">Expert Teachers</h1>

          <div className="">
            {isTutorInvite && <section className="bg-cover rounded-3xl bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
              {/* Close Button */}
              <button
                onClick={() => setIsTutorInvite(false)}
                className="relative top-6 left-[67.7rem] rounded-lg p-2 shadow-[0_0_5px_1px_#94a3b8] text-gray-400 bg-transparent hover:text-gray-200"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
              <div className="px-4 mx-auto max-w-screen-xl text-center py-16 lg:py-20">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Become a Tutor</h1>
                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">We are a community to educate people. Education is not only the knowledge written on papers but also on the neurons in mind!</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                  <button
                    onClick={handleBecomeTutor}
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                  >
                    Get started
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>}

            <div className={`grid sm:grid-cols-1 md:grid-cols-2 ${sidebarActive ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-4 xl:grid-cols-5'} gap-6 p-10`}>
              {Array.isArray(teachersData) && teachersData.length > 0 && teachersData.map((teacher, idx) => (
                <div key={idx} className="max-w-xs">
                  <div className="bg-gray-50 dark:bg-gray-900 shadow-xl rounded-lg py-3">
                    <div className="photo-wrapper p-2">
                      <img
                        className="w-32 h-32 rounded-full mx-auto"
                        src={teacher.img}
                        alt="John Doe"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-center text-xl text-gray-900 dark:text-gray-100 font-medium leading-8">{teacher.name}</h3>
                      <div className="text-center text-gray-400 dark:text-gray-600 text-xs font-semibold">
                        <p>{teacher.role}</p>
                      </div>
                      <table className="text-xs my-3">
                        <tbody>
                          <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Courses</td>
                            <td className="px-2 py-2 text-black dark:text-white">{teacher.courses} courses</td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Content</td>
                            <td className="px-2 py-2 text-black dark:text-white">{teacher.content} content</td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Likes</td>
                            <td className="px-2 py-2 text-black dark:text-white">{teacher.likes} likes</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="text-center my-3">
                        <Link className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" to={`/profile/${teacher.id}`}>View Profile</Link>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
}
