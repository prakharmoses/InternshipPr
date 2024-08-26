import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";

// Importing Context
import { useSidebar } from '../context/SidebarContext';

// Importing Hooks
import { useAccount } from '../hooks/useAuth.js';

// Importing Components
import Modal from '../components/Modal';
import CourseCard from '../components/CourseCard';

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
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080',
    cover: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080',
    about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, voluptate. Nihil quas quidem totam sit, in illo commodi odit reprehenderit, amet eveniet ullam optio facilis deserunt doloribus modi omnis provident deleniti iure quasi voluptas facere similique doloremque? Iste aperiam iure animi saepe! Ea, nobis. Rerum fugit quam corporis assumenda veniam! Aspernatur veniam voluptatum dignissimos nesciunt praesentium corporis nostrum quam ex sequi molestias. Consequatur amet quam eaque earum optio sunt suscipit. Corporis quos labore eveniet aliquam quam ad exercitationem voluptas ullam facere consequuntur omnis ipsum beatae odit fuga, iure doloribus magnam, eligendi fugiat, enim vel. Itaque et alias molestias repellat quam. A voluptate magnam neque cum quidem eos, veritatis nihil explicabo. Facere reiciendis iste cupiditate sed qui suscipit facilis nemo dolorem expedita ad, repellat eius officiis praesentium! In assumenda consectetur quasi. Enim quam iste voluptate ex. Ullam ad odit repellat obcaecati fuga eveniet, dolorum aliquam placeat perferendis saepe nobis similique iure tenetur, animi dolores. Ipsum, atque sequi, totam tempore molestias assumenda nam voluptatibus accusantium mollitia cumque ducimus! Quos earum atque, est pariatur soluta, culpa ipsam corrupti, quidem accusantium facere nobis officia inventore. Incidunt, necessitatibus non porro esse ducimus iste molestias aperiam pariatur ab nihil dolorem debitis impedit, dignissimos illum doloribus culpa.',
    likes: [
      { id: 1, title: 'JavaScript', image: 'https://img.icons8.com/color/452/javascript.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 1 },
      { id: 2, title: 'React', image: 'https://img.icons8.com/color/452/react-native.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 2 },
      { id: 3, title: 'Node.js', image: 'https://img.icons8.com/color/452/nodejs.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 3 },
      { id: 4, title: 'Express', image: 'https://img.icons8.com/color/452/express.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 4 },
      { id: 5, title: 'MongoDB', image: 'https://img.icons8.com/color/452/mongodb.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 5 },
      { id: 6, title: 'Python', image: 'https://img.icons8.com/color/452/python.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 6 },
      { id: 7, title: 'Django', image: 'https://img.icons8.com/color/452/django.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 7 },
      { id: 8, title: 'Flask', image: 'https://img.icons8.com/color/452/flask.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 8 },
      { id: 9, title: 'PostgreSQL', image: 'https://img.icons8.com/color/452/postgreesql.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 9 },
      { id: 10, title: 'SQLite', image: 'https://img.icons8.com/color/452/sql.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 10 },
    ],
    comments: [
      { id: 1, title: 'Great work!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 1 },
      { id: 2, title: 'Keep it up!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 2 },
      { id: 3, title: 'Nice job!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 3 },
      { id: 4, title: 'Awesome!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 4 },
      { id: 5, title: 'Fantastic!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 5 },
      { id: 6, title: 'Good job!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 6 },
      { id: 7, title: 'Well done!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 7 },
      { id: 8, title: 'Excellent!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 8 },
      { id: 9, title: 'Brilliant!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 9 },
      { id: 10, title: 'Superb!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 10 },
    ],
    playlists: [
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
    ],
  });

  const avatarStyle = {
    backgroundImage: `url(${user.avatar})`,
  };

  const coverStyle = {
    backgroundImage: `url(${user.cover})`,
  };

  const handleRemovePlaylist = (id) => {
    const updatedPlaylists = [...user.playlists];
    updatedPlaylists.splice(id, 1);
    // Update your user state here accordingly
    setUser({
      ...user,
      playlists: updatedPlaylists
    });
  }

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
              <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center"><Link to={`mailto:${user.email}`} className='text-blue-400 dark:text-blue-600'>{user.email}</Link><br />{user.role}</p>
            </div>
            <div className="relative top-[-4rem] right-[5rem] flex max-sm:flex-wrap max-sm:justify-center items-center gap-4 z-20">
              <button onClick={() => setTab('about')} className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 dark:bg-stone-900 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100">About</button>
              {profileId === account.id && <button onClick={() => setTab('likes')} className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 dark:bg-stone-900 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100">Likes</button>}
              {profileId === account.id && <button onClick={() => setTab('comment')} className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 dark:bg-stone-900 dark:text-gray-300 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900 dark:hover:bg-stone-800 dark:hover:text-gray-100">Comments</button>}
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
              <p className="font-normal text-base leading-7 text-gray-500 dark:text-gray-300">{user.about}</p>
            </div>
          </div>
        )}
        {profileId === account.id && tab === 'likes' && (
          <div className="grid grid-cols-12 gap-2 gap-y-6 max-w-6xl my-16 mx-10">
            {user.likes.map((video) => (
              <div ket={video.id} className="col-span-12 sm:col-span-6 md:col-span-3">
                <card className="w-full flex flex-col">
                  <div className="relative">
                    <Link href={`/content/${video.id}`}>
                      <img src="https://picsum.photos/seed/59/300/200" className="w-96 h-auto" />
                    </Link>
                    <p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">&lt; 1:00:00</p>
                  </div>

                  <div className="flex flex-row mt-2 gap-2 items-center">
                    <Link href={`/profile/${video.profileId}`}>
                      <img src="https://picsum.photos/seed/1/40/40" className="rounded-full max-h-10 max-w-10" />
                    </Link>

                    <Link href={`/content/${video.id}`} className="flex items-center justify center">
                      <p className="text-gray-900 dark:text-gray-100 text-sm font-semibold">{video.title}</p>
                    </Link>
                  </div>
                </card>
              </div>
            ))}
          </div>
        )}
        {profileId === account.id && tab === 'comment' && (
          <div className="grid grid-cols-12 gap-2 gap-y-6 max-w-6xl my-16 mx-10">
            {user.comments.map((video) => (
              <div ket={video.id} className="col-span-12 sm:col-span-6 md:col-span-3">
                <card className="w-full flex flex-col">
                  <div className="relative">
                    <Link href={`/content/${video.id}`}>
                      <img src="https://picsum.photos/seed/59/300/200" className="w-96 h-auto" />
                    </Link>
                    <p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">&lt; 1:00:00</p>
                  </div>

                  <div className="flex flex-row mt-2 gap-2 items-center">
                    {/* <!-- Profile Picture --> */}
                    <Link href={`/profile/${video.profileId}`}>
                      <img src="https://picsum.photos/seed/1/40/40" className="rounded-full max-h-10 max-w-10" />
                    </Link>

                    <Link href={`/content/${video.id}`} className="flex items-center justify center">
                      <p className="text-gray-900 dark:text-gray-100 text-sm font-semibold">{video.title}</p>
                    </Link>
                  </div>
                </card>
              </div>
            ))}
          </div>
        )}
        {profileId === account.id && tab === 'playlist' && (
          <div className={`grid ${sidebarActive ? 'grid-cols-3 gap-2' : 'grid-cols-4 gap-[12rem]'} gap-y-6 max-w-6xl my-16 mx-10`}>
            {user.playlists.map((playlist) => (
              <div key={playlist.id} className="relative max-w-sm w-[20rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {/* Cancel/Delete Icon */}
                <button
                  onClick={() => handleRemovePlaylist(playlist.id)}
                  className="absolute top-2 right-2 p-1 rounded-full opacity-70 bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:dark:bg-red-500 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Playlist Image */}
                <Link href="#">
                  <img className="rounded-t-lg w-full" src="https://picsum.photos/seed/59/300/200" alt="" />
                </Link>

                {/* Playlist Details */}
                <div className="p-5 flex flex-row gap-4">
                  <Link>
                    <img src="https://picsum.photos/seed/1/40/40" alt="" className="rounded-full max-h-10 max-w-10" />
                  </Link>
                  <Link href="#">
                    <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {edit && (
        <Modal title="Profile" closeModal={() => setEdit(false)}>
          <h2 className="text-grey text-sm mb-4 text-gray-600 dark:text-gray-400">Create Profile</h2>
          <form>
            <div
              className={`w-full rounded-sm bg-cover bg-center bg-no-repeat items-center`}
              style={coverStyle}
            >
              <div
                className={`mx-auto flex justify-center w-[141px] h-[141px] bg-blue-700/80 dark:bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat`}
                style={avatarStyle}
              >

                <div className="bg-black dark:bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">

                  <input type="file" name="profile" id="upload_profile" hidden required />

                  <label for="upload_profile">
                    <svg data-slot="icon" className="w-6 h-5 text-blue-300 dark:text-blue-700 cursor-pointer" fill="none"
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
                  className="bg-black dark:bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                  <label for="upload_cover" className="inline-flex items-center gap-1 cursor-pointer text-white dark:text-black">Cover

                    <svg data-slot="icon" className="w-6 h-5 text-blue-300 dark:text-blue-700" fill="none" stroke-width="1.5"
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
                <label for="" className="mb-2 text-gray-700 dark:text-gray-300">First Name</label>
                <input type="text"
                  className="mt-2 p-4 w-full border-2 rounded-lg text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800"
                  placeholder="First Name" />
              </div>
              <div className="w-full  mb-4 lg:mt-6">
                <label for="" className="text-gray-700 dark:text-gray-300">Email</label>
                <input type="email"
                  className="mt-2 p-4 w-full border-2 rounded-lg text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-8000"
                  placeholder="Email" />
              </div>
            </div>

            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full">
                <h3 className="text-gray-700 dark:text-gray-300 mb-2">Sex</h3>
                <select
                  className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800">
                  <option disabled value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="w-full">
                <h3 className="text-gray-700 dark:text-gray-300 mb-2">Date Of Birth</h3>
                <input type="date"
                  className="text-grey p-4 w-full border-2 rounded-lg text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
            <div className="w-full  mb-4 lg:mt-6">
              <label for="" className="text-gray-700 dark:text-gray-300">About Me</label>
              <textarea type="email"
                className="mt-2 p-4 w-full border-2 rounded-lg text-gray-800 dark:text-gray-200 border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-8000"
                placeholder="Email">{user.about}</textarea>
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