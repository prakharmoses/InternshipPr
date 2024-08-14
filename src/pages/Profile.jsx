import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";

// Importing Context
import { useSidebar } from '../context/SidebarContext';
import { useAccount } from '../context/AccountContext';

// Importing Components
import Modal from '../components/Modal';

export default function Profile() {
  const { sidebarActive } = useSidebar();
  const { account } = useAccount();
  const { profileId } = useParams();

  // Defining States
  const [tab, setTab] = useState('about');
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    name: 'Emma Smith',
    email: 'emmasmith@gmail.com',
    role: 'Tutor',
    avatar: 'https://pagedone.io/asset/uploads/1705471668.png',
    cover: 'https://pagedone.io/asset/uploads/1705473908.png',
  });

  // Definng functions
  useEffect(() => {
    // Fetch user data from API
    // setUser(response.data);
  }, []);

  return (
    <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[7rem] bg-white dark:bg-black`}>
      <section className="relative pt-40 pb-24">
        <img
          src={user.cover}
          alt="cover-image"
          className="w-full absolute top-0 left-0 z-0 h-72"
        />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative top-9">
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <img src={user.avatar} alt="user-avatar-image"
              className="border-4 border-solid border-white dark:border-black rounded-full" />
          </div>
          <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope font-bold text-4xl text-gray-900 dark:text-gray-100 mb-1 max-sm:text-center">{user.name}</h3>
              <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center"><Link to={`mailto:${user.email}`} className='text-blue-400 dark:text-blue-600'>{user.email}</Link><br />{user.role}</p>
            </div>
            <div className="relative top-[-4rem] right-[5rem] flex max-sm:flex-wrap max-sm:justify-center items-center gap-4 z-20">
              <button onClick={() => setTab('about')} className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 dark:bg-stone-900 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100">About</button>
              <button onClick={() => setTab('likes')} className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 dark:bg-stone-900 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100">Likes</button>
              <button onClick={() => setTab('comment')} className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 dark:bg-stone-900 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100">Comments</button>
              <button onClick={() => setTab('playlist')} className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 dark:bg-stone-900 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100">Saved Playlists</button>
            </div>
            <button
              onClick={() => setEdit(true)}
              className='relative top-[-4rem] right-[1rem] z-20 cursor-pointer border-2 border-solid border-gray-300 dark:border-gray-700 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500'
            >
              <CiEdit className="text-3xl text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {tab === 'about' && (
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mt-16">
            <div className="p-6">
              <h3 className="font-manrope font-bold text-2xl text-gray-900 dark:text-gray-100 mb-3">About</h3>
              <p className="font-normal text-base leading-7 text-gray-500 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            </div>
          </div>
        )}
      </section>
      {edit && (
        <Modal title="Profile" closeModal={() => setEdit(false)}>
          <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2>
          <form>
            <div
              className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
              <div
                className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">

                <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">

                  <input type="file" name="profile" id="upload_profile" hidden required />

                  <label for="upload_profile">
                    <svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none"
                      stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                      </path>
                    </svg>
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <input type="file" name="profile" id="upload_cover" hidden required />

                <div
                  className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                  <label for="upload_cover" className="inline-flex items-center gap-1 cursor-pointer">Cover

                    <svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none" stroke-width="1.5"
                      stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                      </path>
                    </svg>
                  </label>
                </div>

              </div>
            </div>
            <h2 className="text-center mt-1 font-semibold dark:text-gray-300">Upload Profile and Cover Image
            </h2>
            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full  mb-4 mt-6">
                <label for="" className="mb-2 dark:text-gray-300">First Name</label>
                <input type="text"
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="First Name" />
              </div>
              <div className="w-full  mb-4 lg:mt-6">
                <label for="" className=" dark:text-gray-300">Last Name</label>
                <input type="text"
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="Last Name" />
              </div>
            </div>

            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full">
                <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                <select
                  className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                  <option disabled value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="w-full">
                <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                <input type="date"
                  className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" />
              </div>
            </div>
            <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
              <button type="submit" className="w-full p-4">Submit</button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  )
}