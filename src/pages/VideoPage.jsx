import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

// Importing context
import { useSidebar } from '../context/SidebarContext';

// Importing components
import { TypewriterEffectSmooth } from "../components/ui/typewriterEffect";

export default function ContentPage() {
  const { sidebarActive } = useSidebar();
  const { contentId } = useParams();

  // Defining State
  const [content, setContent] = useState({
    title: 'Content 1',
    contentType: 'video',
    contentImg: 'https://source.unsplash.com/720x480/?video',
    date: '2022-10-20',
    contentMaterial: '',
    video: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum minus reiciendis, error sunt veritatis exercitationem deserunt velit doloribus itaque voluptate.',
    likes: 100,
    comments: [
      {
        userId: 1, user: 'John Doe', comment: 'Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.!', date: '2022-10-21', userImg: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', reply: [{
          userId: 2, user: 'Jane Doe', comment: 'Much appreciated! Glad you liked it ☺️', date: '2022-10-22', userImg: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'
        }]
      },
      { userId: 2, user: 'Jane Doe', comment: 'Awesome!', date: '2022-10-22', userImg: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg' },
      { userId: 3, user: 'Joe Doe', comment: 'Nice!', date: '2022-10-23', userImg: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg' },
      { userId: 4, user: 'Jack Doe', comment: 'Good!', date: '2022-10-24', userImg: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg' },
      { userId: 5, user: 'Jill Doe', comment: 'Excellent!', date: '2022-10-25', userImg: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg' },
    ]
  });
  const [likedByUser, setLikedByUser] = useState(false);

  // Defining functions
  const toggleLike = () => {
    setLikedByUser(!likedByUser);
  }

  return (
    <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[4rem] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <div className="flex items-center justify-center">
        <TypewriterEffectSmooth words={[
          {
            text: content.title,
            className: "text-blue-500 dark:text-blue-500 text-4xl md:text-5xl font-bold",
          },
        ]} />
      </div>
      <div className={`${sidebarActive ? 'p-6' : 'p-12'} mb-4`}>
        {content.contentType === 'video' ?
          <video
            className="w-full h-auto max-w-full shadow-[0_0_30px_3px_#64748B] dark:shadow-[0_0_30px_3px_#334155]"
            controls
            poster={content.contentImg}
          >
            <source src="https://flowbite.com/docs/videos/flowbite.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> :
          <iframe
            width="600"
            height="400"
            src="https://www.youtube.com/embed/RB1uDVnhVq0?si=d0DlD-AjqmaPlnEF"
            title="YouTube video player"
            frameborder="40% "
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className='shadow-[0_0_30px_3px_#64748B] dark:shadow-[0_0_30px_3px_#334155]'
            allowfullscreen
          ></iframe>
        }
        <section>
          <div className="flex items-center mt-6 mb-8 border-b justify-between">
            <div className='flex items-center pb-6  gap-10'>
              <p className="date text-xl">
                <i className="fas fa-calendar mr-4 text-main-color"></i>
                <span className="text-light-color">{content.date}</span>
              </p>
              <p className="date text-xl">
                <i className="fas fa-heart mr-4 text-main-color"></i>
                <span className="text-light-color">{content.likes} likes</span>
              </p>
            </div>
            <button
              className="bg-light-bg py-2 mb-6 px-6 rounded flex items-center hover:bg-white hover:dark:bg-black text-light-color hover:text-black hover:dark:text-white"
              onClick={toggleLike}
            >
              {likedByUser ? <IoMdHeart className='text-2xl bg-transparent mr-2' /> : <IoIosHeartEmpty className='text-2xl bg-transparent mr-2' />}
              <span>Like</span>
            </button>
          </div>
          <p className="description text-lg text-light-color mt-8 leading-relaxed">{content.description}</p>
        </section>
      </div>

      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-[70rem] mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({content.comments.length})</h2>
          </div>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" className="sr-only">Your comment</label>
              <textarea id="comment" rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
              <button
              type='submit'
                className="w-40 h-10 rounded-xl bg-black dark:bg-white border border-white dark:border-black border-transparent text-white dark:text-black text-sm"
              >
                Post Commnet
              </button>
            </div>
          </form>

          {content.comments.map((views) => (<>
            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={views.userImg}
                      alt={views.user}
                    />{views.user}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime={views.date}
                    title={views.date}>{views.date}</time></p>
                </div>
                {/* <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button> */}
                {/* <!-- Dropdown menu --> */}
                {/* <div id="dropdownComment1"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                  </ul>
                </div> */}
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{views.comment}</p>
              <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                  <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            {views.reply?.map((oneReply) => (
              <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={oneReply.userImg}
                        alt={oneReply.user}
                      />
                      {oneReply.user}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime={oneReply.date}
                      title={oneReply.date}>{oneReply.date}</time></p>
                  </div>
                  {/* <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button> */}
                  {/* <!-- Dropdown menu --> */}
                  {/* <div id="dropdownComment2"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                  </ul>
                </div> */}
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{oneReply.comment}</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </article>
            ))}
          </>))}
        </div>
      </section>
    </main>
  )
}