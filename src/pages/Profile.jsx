import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";

// Importing Icons
import { SiWebauthn } from "react-icons/si";

// Importing Context
import { useSidebar } from '../context/SidebarContext';

// Importing Hooks
import { useAccount } from '../hooks/useAuth.js';

// Importing Components
import Modal from '../components/Modal';
import CourseCard from '../components/CourseCard';
import MyCourses from '../components/MyCourses';
import PlaylistSection from '../components/PlaylistSection';
import LikesSection from '../components/LikesSection';
import CommentSection from '../components/CommentSection';

const dummyUser = {
  name: "account.name",
  email: "account.email",
  role: ["student"],
  sex: 'M',
  avatar: "account.avatar",
  cover: "account.cover",
  about: 'I am an Angirasoft member. I am exploring the world of technology and learning new things every day.',
}

export default function Profile() {
  const { sidebarActive } = useSidebar();
  const { account, callBackendApi, updateProfileInfo } = useAccount();
  const { profileId } = useParams();
  const location = useLocation();

  // Defining States
  const [tab, setTab] = useState('about');
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(dummyUser);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [sentEmail, setSentEmail] = useState(false);
  const [newDetail, setNewDetail] = useState({
    name: user.name,
    email: user.email,
    dob: new Date().toISOString().split('T')[0],
    phoneNo: '',
    about: user.about,
    avatar: user.avatar,
    cover: user.cover,
  })

  const avatarStyle = {
    backgroundImage: `url(${newDetail.avatar})`,
  };

  const coverStyle = {
    backgroundImage: `url(${newDetail.cover})`,
  };

  // Define functions
  const handleVerifyEmail = async () => {
    try {
      const response = await callBackendApi(`/auth/send-verification-email/${account.email}`, 'GET', null);
      const data = await response.json();
      if (response.status === 200) {
        setSentEmail(true);
        alert(data.message);
      } else {
        alert(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Email verification error:', error);
    }
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewDetail({ ...newDetail, avatar: reader.result });
    }
    reader.readAsDataURL(file);
  }

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewDetail({ ...newDetail, cover: reader.result });
    }
    reader.readAsDataURL(file);
  }

  const handlePhoneNoChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d{0,10}$/.test(value)) {
      setNewDetail({ ...newDetail, phoneNo: value });
    }
  }

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const nonEmptyFields = Object.keys(newDetail)
        .filter(key => newDetail[key] !== '') // Filter out empty fields
        .reduce((filteredObj, key) => {
          filteredObj[key] = newDetail[key]; // Copy the non-empty fields
          return filteredObj;
        }, {});

      const response = await callBackendApi(`/users/updateProfile`, 'PATCH', nonEmptyFields);
      const data = await response.json();

      if (response.status === 200) {
        if (newDetail.email !== account.email) {
          setIsEmailVerified(false);
        }
        setUser({
          ...user,
          name: newDetail.name,
          email: newDetail.email,
          about: newDetail.about,
          avatar: newDetail.avatar,
          cover: newDetail.cover,
        })
        updateProfileInfo({
          name: newDetail.name,
          email: newDetail.email,
          avatar: newDetail.avatar,
          cover: newDetail.cover,
        });
        setEdit(false);
      } else {
        alert(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Edit profile error:', error);
    }
  }

  // Definng functions
  useEffect(() => {
    // Check if email is verified
    const checkEmailVerification = async () => {
      try {
        const response = await callBackendApi(`/users/get-email-verification-status/${account.email}`, 'GET', null);
        const data = await response.json();

        if (response.status === 200) {
          setIsEmailVerified(data.isEmailVerified);
        } else {
          alert(data.message);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Email verification error:', error);
      }
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await callBackendApi(`/users/oneUser/${profileId}`, 'GET', null);
        const data = await response.json();
        console.log("The data recieved is: ", data);

        if (response.status === 200) {
          setUser(() => ({
            name: data.name,
            email: data.email,
            role: data.roles.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(', '),
            sex: data.sex,
            avatar: data.avatar,
            cover: data.cover,
            about: data.about,
          }));
          setNewDetail(() => ({
            name: data.name,
            email: data.email,
            phoneNo: data.phoneNo,
            dob: new Date(data.dob).toISOString().split('T')[0],
            about: data.about,
            avatar: data.avatar,
            cover: data.cover,
          }))
        } else {
          alert(data.message);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Fetch user data error:', error);
      }
    }

    checkEmailVerification();
    fetchUserData();
    setTab('about');
  }, [window.location.pathname]);

  // For tab configurtion handling
  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
          setTab(tabParam);
      }
  }, [location.search]);

  return (
    <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[7rem] bg-white dark:bg-black`}>
      <section className="relative pt-40 pb-24">
        <img
          src={user.cover}
          alt="cover-image"
          className="w-full absolute top-0 left-0 z-0 h-72 object-cover"
        />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative top-9">
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <img src={user.avatar} alt="user-avatar-image"
              className="border-4 border-solid border-white dark:border-black rounded-full object-cover w-[8.813rem] h-[8.813rem]" />
          </div>
          <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope font-bold text-4xl text-gray-900 dark:text-gray-100 mb-1 max-sm:text-center">{user.name}</h3>
              <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center"><Link to={`mailto:${user.email}`} className='text-blue-400 dark:text-blue-600'>{user.email}</Link><br />{user.role}<br />Sex: {user.sex === 'M' ? 'Male' : user.sex === 'F' ? 'Female' : 'Other'}</p>
              {!isEmailVerified && <div className="absolute right-[3rem] bottom-0 p-2 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800 shadow-[0_0_15px_1px_rgb(133,77,14)] dark:shadow-[0_0_15px_1px_rgb(253,224,71)]" role="alert">
                <button type="button" onClick={handleVerifyEmail} className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800">
                  <SiWebauthn className="w-4 h-4 me-2" aria-hidden="true" />
                  {sentEmail ? 'Verification Email sent' : 'Verify Email Address'}
                </button>
              </div>}
            </div>
            <div className="relative top-[-4rem] right-[5rem] flex max-sm:flex-wrap max-sm:justify-center items-center gap-4 z-20">
              <button onClick={() => setTab('about')} className={`rounded-full py-3 px-6 ${tab !== 'about' ? 'bg-stone-100 dark:bg-stone-900' : 'bg-stone-300 dark:bg-stone-700'} text-gray-700 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100`}>About</button>
              {profileId === account.id && <button onClick={() => setTab('likes')} className={`rounded-full py-3 px-6 ${tab !== 'likes' ? 'bg-stone-100 dark:bg-stone-900' : 'bg-stone-300 dark:bg-stone-700'} text-gray-700 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100`}>Likes</button>}
              {profileId === account.id && <button onClick={() => setTab('comment')} className={`rounded-full py-3 px-6 ${tab !== 'comment' ? 'bg-stone-100 dark:bg-stone-900' : 'bg-stone-300 dark:bg-stone-700'} text-gray-700 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100`}>Comments</button>}
              <button onClick={() => setTab('playlist')} className={`rounded-full py-3 px-6 ${tab !== 'playlist' ? 'bg-stone-100 dark:bg-stone-900' : 'bg-stone-300 dark:bg-stone-700'} text-gray-700 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100`}>Saved Playlists</button>
              {profileId === account.id && account.roles.includes('tutor') && <button onClick={() => setTab('mycourses')} className={`rounded-full py-3 px-6 ${tab !== 'mycourses' ? 'bg-stone-100 dark:bg-stone-900' : 'bg-stone-300 dark:bg-stone-700'} text-gray-700 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100`}>My Courses</button>}
            </div>
            {profileId === account.id && <button
              onClick={() => setEdit(true)}
              disabled={profileId !== account.id}
              className='relative top-[-4rem] right-[1rem] z-20 cursor-pointer border-2 border-solid border-gray-300 dark:border-gray-700 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 shadow-[0_0_15px_1px_rgb(0,0,0)] dark:shadow-[0_0_15px_1px_rgb(255,255,255)]'
            >
              <CiEdit className="text-3xl text-gray-500 dark:text-gray-400" />
            </button>}
          </div>
        </div>

        {tab === 'about' && (
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mt-16">
            <div className="p-6">
              <h3 className="font-manrope font-bold text-2xl text-gray-900 dark:text-gray-100 mb-3">About</h3>
              <p className="font-normal text-base leading-7 text-gray-500 dark:text-gray-300">{user.about}</p>
            </div>
          </div>
        )}
        {profileId === account.id && tab === 'likes' && <LikesSection userId={account.id} />}
        {profileId === account.id && tab === 'comment' && <CommentSection userId={account.id} />}
        {tab === 'playlist' && <PlaylistSection userId={account.id} profileId={profileId} />}
        {profileId === account.id && tab === 'mycourses' && account.roles.includes('tutor') && <MyCourses />}
      </section>

      {edit && (
        <Modal title="Profile" closeModal={() => setEdit(false)}>
          <h2 className="text-grey text-sm mb-4 text-gray-600 dark:text-gray-400">Create Profile</h2>
          <form onSubmit={handleEditProfile}>
            <div
              className={`w-full rounded-sm bg-cover bg-center bg-no-repeat items-center`}
              style={coverStyle}
            >
              <div
                className={`mx-auto flex justify-center w-[141px] h-[141px] bg-blue-700/80 dark:bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat`}
                style={avatarStyle}
              >

                <div className="bg-black dark:bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">

                  <input
                    type="file"
                    name="avatar"
                    id="upload_profile"
                    accept='image/*'
                    onChange={handleAvatarUpload}
                    hidden
                  />

                  <label for="upload_profile">
                    <svg data-slot="icon" className="w-6 h-5 text-blue-300 dark:text-blue-700 cursor-pointer" fill="none"
                      strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24"
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
                <input
                  type="file"
                  name="cover"
                  id="upload_cover"
                  accept='image/*'
                  onChange={handleCoverUpload}
                  hidden
                />

                <div
                  className="bg-black dark:bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                  <label for="upload_cover" className="inline-flex items-center gap-1 cursor-pointer text-white dark:text-black">Cover

                    <svg data-slot="icon" className="w-6 h-5 text-blue-300 dark:text-blue-700" fill="none" strokeWidth="1.5"
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
            <h2 className="text-center mt-1 font-semibold text-gray-700 dark:text-gray-300">Upload Profile and Cover Image
            </h2>
            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full  mb-4 mt-6">
                <label for="" className="mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  className="mt-2 p-4 w-full border-2 rounded-lg text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800"
                  placeholder="Full Name"
                  value={newDetail.name}
                  onChange={(e) => setNewDetail({ ...newDetail, name: e.target.value })}
                />
              </div>
              <div className="w-full  mb-4 lg:mt-6">
                <label for="" className="text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  className="mt-2 p-4 w-full border-2 rounded-lg text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800"
                  placeholder="Email"
                  value={newDetail.email}
                  onChange={(e) => setNewDetail({ ...newDetail, email: e.target.value })}
                />
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full">
                <h3 className="text-gray-700 dark:text-gray-300 mb-2">Phone Number</h3>
                <input
                  type="number"
                  className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800"
                  placeholder='Enter the Mobile Number'
                  value={newDetail.phoneNo}
                  onChange={handlePhoneNoChange}
                  maxLength={10}
                />
              </div>
              <div className="w-full">
                <h3 className="text-gray-700 dark:text-gray-300 mb-2">Date Of Birth</h3>
                <input
                  type="date"
                  className="text-grey p-4 w-full border-2 rounded-lg text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800"
                  value={newDetail.dob}
                  onChange={(e) => setNewDetail({ ...newDetail, dob: (e.target.value) })}
                />
              </div>
            </div>
            <div className="w-full  mb-4 lg:mt-6">
              <label for="" className="text-gray-700 dark:text-gray-300">About Me</label>
              <textarea
                className="mt-2 p-4 w-full border-2 rounded-lg text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800"
                placeholder="About Me"
                onChange={(e) => setNewDetail({ ...newDetail, about: e.target.value })}
              >{user.about}</textarea>
            </div>
            <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
              <button type="submit" className="w-full p-4">Submit</button>
            </div>
          </form>
        </Modal>
      )}
    </main >
  )
}