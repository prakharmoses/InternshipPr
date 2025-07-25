import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';

// Importing context
import { useSidebar } from '../context/SidebarContext';

// Importing components
import { TypewriterEffectSmooth } from "../components/ui/typewriterEffect";
import LoadingUI from '../components/LoadingUI';

// Import Hooks
import { useAccount } from '../hooks/useAuth';

// Import icons
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { MdSend } from "react-icons/md";

// Import assets
import thumb2 from '../assets/thumb-2.png';

const dummyContent = {
  title: 'Content 1',
  contentType: 'video',
  contentImg: 'https://source.unsplash.com/720x480/?video',
  createdAt: new Date('2022-10-20'),
  content: 'https://flowbite.com/docs/videos/flowbite.mp4',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum minus reiciendis, error sunt veritatis exercitationem deserunt velit doloribus itaque voluptate.',
  likes: 100,
  course: 1,
  comments: [
    {
      _id: 1, userId: 1, user: 'John Doe', comment: 'Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.!', createdAt: '2022-10-21', userImg: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', reply: [{
        userId: 2, user: 'Jane Doe', comment: 'Much appreciated! Glad you liked it ☺️', createdAt: '2022-10-22', userImg: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'
      }]
    },
    { _id: 2, userId: 2, user: 'Jane Doe', comment: 'Awesome!', createdAt: '2022-10-22', userImg: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg' },
    { _id: 3, userId: 3, user: 'Joe Doe', comment: 'Nice!', createdAt: '2022-10-23', userImg: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg' },
    { _id: 4, userId: 4, user: 'Jack Doe', comment: 'Good!', createdAt: '2022-10-24', userImg: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg' },
    { _id: 5, userId: 5, user: 'Jill Doe', comment: 'Excellent!', createdAt: '2022-10-25', userImg: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg' },
  ]
}

const dummyOtherContent = [
  { title: 'Content 1', contentImg: thumb2, id: 1, likes: 100, createdAt: new Date('2022-10-20') },
  { title: 'Content 2', contentImg: thumb2, id: 2, likes: 200, createdAt: new Date('2022-10-21') },
  { title: 'Content 3', contentImg: thumb2, id: 3, likes: 300, createdAt: new Date('2022-10-22') },
  { title: 'Content 4', contentImg: thumb2, id: 4, likes: 400, createdAt: new Date('2022-10-23') },
  { title: 'Content 5', contentImg: thumb2, id: 5, likes: 500, createdAt: new Date('2022-10-24') },
  { title: 'Content 6', contentImg: thumb2, id: 6, likes: 600, createdAt: new Date('2022-10-25') },
  { title: 'Content 7', contentImg: thumb2, id: 7, likes: 700, createdAt: new Date('2022-10-26') },
  { title: 'Content 8', contentImg: thumb2, id: 8, likes: 800, createdAt: new Date('2022-10-27') },
  { title: 'Content 9', contentImg: thumb2, id: 9, likes: 900, createdAt: new Date('2022-10-28') },
  { title: 'Content 10', contentImg: thumb2, id: 10, likes: 1000, createdAt: new Date('2022-10-29') }
]

export default function ContentPage() {
  const { sidebarActive } = useSidebar();
  const { contentId } = useParams();
  const { account, callBackendApi } = useAccount();

  // Define ref
  const textareaRef = useRef(null);

  // Defining State
  const [content, setContent] = useState(dummyContent);
  const [otherContent, setOtherContent] = useState(dummyOtherContent);
  const [likedByUser, setLikedByUser] = useState(false);
  const [isYTvideo, setIsYTvideo] = useState(false);
  const [description, setDescription] = useState(content.description);
  const [comment, setComment] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState('');
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Defining functions
  const toggleLike = async () => {
    setLikedByUser(!likedByUser);

    try {
      const response = await callBackendApi(`/content/toggleLikeContent/${contentId}`, 'PATCH', null);
      const data = await response.json();

      if (response.status === 200) {
        setContent({ ...content, likes: data.likes });
      } else {
        alert(`Error liking content: ${data.message}`);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error liking content:', error);
    }
  }

  // Handling content description change
  const handleContentDescriptionChange = async () => {
    if (description !== content.description) {
      try {
        const updateBody = {
          contentId: contentId,
          description: description
        }
        const response = await callBackendApi(`/content/update`, 'PATCH', updateBody);

        if (response.status === 200) {
          setContent({ ...content, description: description });
        } else {
          const data = await response.json();
          setDescription(content.description);
          alert(`Error updating course description: ${data.message}`);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Error updating course description: ', error);
      }
    }
  }

  // Handling post comment
  const handlePostComment = async (e) => {
    e.preventDefault();

    try {
      const commentBody = {
        contentId: contentId,
        comment: comment
      }
      const response = await callBackendApi(`/content/addComment`, 'PATCH', commentBody);
      const data = await response.json();

      if (response.status === 201) {
        setContent({
          ...content, comments:
            data.comments.map(comment => ({ ...comment, createdAt: new Date(comment.createdAt) })),
        });
        setComment('');
      } else {
        alert(`Error posting comment: ${data.message}`);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }

  // Handling post comment reply
  const handlePostCommentReply = async (commentId) => {
    try {
      const commentBody = {
        contentId: contentId,
        commentId: commentId,
        comment: reply
      }
      const response = await callBackendApi(`/content/addCommentReply`, 'PATCH', commentBody);
      const data = await response.json();

      if (response.status === 201) {
        setContent({
          ...content, comments:
            data.comments.map(comment => ({ ...comment, createdAt: new Date(comment.createdAt) })),
        });
        setReply('');
        setIsReplying(false);
      } else {
        alert(`Error posting comment reply: ${data.message}`);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error posting comment reply:', error);
    }
  }

  // Fetching content data
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await callBackendApi(`/content/getContent/${contentId}`, 'GET', null);
        const data = await response.json();

        if (response.status === 200) {
          setDescription(data.description);
          const updatedContent = {
            ...data,
            comments: Array.isArray(data.comments)
              ? data.comments
                .map(comment => ({ ...comment, createdAt: new Date(comment.createdAt) }))
                .reverse()
              : [],
            createdAt: new Date(data.createdAt),
          };
          setContent(updatedContent);
        } else {
          alert(`Failed to fetch content data. Error: ${data.message}`);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch content data:', error);
      }
    }

    const fetchIsContentLiked = async () => {
      try {
        const response = await callBackendApi(`/content/isLiked/${contentId}`, 'GET', null);
        const data = await response.json();

        if (response.status === 200) {
          setLikedByUser(data);
        } else {
          alert(`Failed to fetch like status. Error: ${data.message}`);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch like status:', error);
      }
    }

    fetchContent();
    fetchIsContentLiked();
  }, [contentId]);

  // Fetching other content data
  useEffect(() => {
    const fetchOtherContent = async () => {
      try {
        const response = await callBackendApi(`/content/getOtherContentOfCourse/${content.course}`, 'GET', null);
        const data = await response.json();

        if (response.status === 200) {
          setOtherContent(data.map(content => ({ ...content, createdAt: new Date(content.createdAt) })));
        } else {
          alert(`Failed to fetch other content data. Error: ${data.message}`);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch other content data:', error);
      }
    }

    fetchOtherContent();
  }, [content.course]);

  // Checking if content is a YouTube video
  useEffect(() => {
    setIsYTvideo(content.content.startsWith('https://www.youtube.com/') || content.content.startsWith('https://youtu.be/'));
  }, [content]);

  // Define functions using useEffect
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to make it shrink before resizing
      textareaRef.current.style.height = 'fit-content';
      // Set height to the scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [description]);

  setTimeout(() => {
    setIsPageLoaded(true);
  }, [1500]);

  if (!isPageLoaded) {
    return (
      <main className={`ml-[18rem] w-[82vw] h-[100vh] pt-[5rem] pb-[7rem] bg-slate-300 dark:bg-black`}>
        <LoadingUI />
      </main>
    )
  }

  return (
    <main className={`${sidebarActive && 'ml-[18rem]'} border-gray-500 border-2 h-full pt-[5rem] pb-[7rem] bg-white dark:bg-black`}>
      <div className="flex items-center justify-center">
        <TypewriterEffectSmooth words={[
          {
            text: content.title,
            className: "text-blue-500 dark:text-blue-500 text-4xl md:text-5xl font-bold",
          },
        ]} />
      </div>
      <div className={`${sidebarActive ? 'p-6' : 'p-12'} mb-4 -mt-4`}>
        <div className='flex flex-col xl:flex-row gap-y-8 items-center justify-between'>
          {content.contentType === 'video' && !isYTvideo ?
            <video
              className="w-[50rem] h-[28.125rem] max-w-full shadow-[0_0_30px_3px_#64748B] dark:shadow-[0_0_30px_3px_#334155]"
              controls
              poster={content.contentImg}
            >
              <source src={content.content} type="video/mp4" />
              Your browser does not support the video tag.
            </video> :
            <iframe
              src={content.content}
              title="YouTube video player"
              frameborder="40% "
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
              className={`${sidebarActive ? 'w-[50rem] h-[28.125rem]' : 'w-[60rem] h-[33.75rem]'} shadow-[0_0_30px_3px_#64748B] dark:shadow-[0_0_30px_3px_#334155]`}
              allowfullscreen="true"
            ></iframe>
          }
          <div className={`${sidebarActive ? 'w-[25rem] h-[28.125rem]' : 'w-[60rem] h-[33.75rem]'} md:w-[28%] bg-slate-100 dark:bg-gray-900 border dark:border-2 rounded-lg border-gray-300 dark:border-gray-700 p-4`}>
            <Link to={`/course/${content.course}`} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">This Course</Link>
            <ul className={`${sidebarActive ? 'h-[23.8rem]' : 'h-[29.425rem]'} space-y-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent`}>
              {Array.isArray(otherContent) && otherContent.length > 0 && otherContent.map((othContent, index) => (
                <Link
                  to={`/content/${othContent.id}`}
                  key={index}
                  className={`flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 ${othContent.id === contentId && 'bg-gray-200 dark:bg-gray-800'} rounded-md p-2 transition-all`}
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-14 bg-gray-300 dark:bg-gray-700 rounded-md">
                    <img
                      src={othContent.contentImg}
                      alt="Thumbnail"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  {/* Video Info */}
                  <div className="flex flex-col justify-between">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {othContent.title}
                    </h3>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{othContent.createdAt.toDateString()}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">{othContent.likes} likes</span>
                  </div>
                </Link>
              ))}
            </ul>
          </div>

        </div>

        <section>
          <div className="flex items-center mt-6 border-b justify-between">
            <div className='flex items-center pb-6  gap-10'>
              <p className="date text-xl">
                <i className="fas fa-calendar mr-4 text-main-color"></i>
                <span className="text-light-color">{content.createdAt instanceof Date ? content.createdAt.toDateString() : content.createdAt.toString()}</span>
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
          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleContentDescriptionChange}
            disabled={account.id !== content.tutor}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.target.blur();
              }
            }}
            className={`py-2 mt-4 overflow-hidden min-h-[4rem] h-[fit-content] bg-transparent w-full text-lg px-2 text-gray-600 dark:text-gray-400 leading-8`}
          />
        </section>
      </div>

      <section className="bg-white dark:bg-gray-900 py-8 antialiased">
        <div className="max-w-[70rem] mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({content.comments.length})</h2>
          </div>
          <form className="mb-6" onSubmit={handlePostComment}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" className="sr-only">Your comment</label>
              <textarea id="comment" rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
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

          {Array.isArray(content.comments) && content.comments.length > 0 && content.comments.map((views, _) => (<>
            <article key={_} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Link
                    to={`/profile/${views.userId}`}
                    className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
                  >
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={views.userAvatar}
                      alt={views.userName}
                    />
                    {views.userName}
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      pubdate
                      datetime={views.createdAt instanceof Date ? views.createdAt.toDateString() : views.createdAt}
                      title={views.createdAt instanceof Date ? views.createdAt.toDateString() : views.createdAt}
                    >{views.createdAt instanceof Date ? views.createdAt.toDateString() : views.createdAt}</time>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{views.comment}</p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            {isReplying && (
              <form className="flex flex-row mb-6 ml-16 py-2 px-4 w-[50%] bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700" onSubmit={() => handlePostCommentReply(views._id)}>
                <label for="comment" className="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  rows="2"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                ></textarea>
                <MdSend
                  className="text-xl bg-transparent cursor-pointer ml-2 self-end"
                  onClick={() => handlePostCommentReply(views._id)}
                />
              </form>
            )}
            {Array.isArray(views.reply) && views.reply.length > 0 && views.reply?.map((oneReply, idx) => (
              <article key={idx} className="px-4 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <Link
                    className="flex items-center"
                    to={`/profile/${oneReply.userId}`}
                  >
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={oneReply.userAvatar}
                        alt={oneReply.userName}
                      />
                      {oneReply.userName}</p>
                  </Link>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{oneReply.comment}</p>
              </article>
            ))}
          </>))}
        </div>
      </section>
    </main>
  )
}