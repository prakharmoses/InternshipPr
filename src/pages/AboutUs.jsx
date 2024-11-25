import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Impporting Assets
import aboutImg from '../assets/about-img.svg';
import pic2 from '../assets/pic-2.jpg';
import pic3 from '../assets/pic-3.jpg';
import pic4 from '../assets/pic-4.jpg';
import pic5 from '../assets/pic-5.jpg';
import pic6 from '../assets/pic-6.jpg';
import pic7 from '../assets/pic-7.jpg';

// Impporting context
import { useSidebar } from '../context/SidebarContext';
import { useAccount } from '../hooks/useAuth';

// Import components
import Modal from '../components/Modal';

export default function AboutUs() {
    const { sidebarActive } = useSidebar();
    const { callBackendApi } = useAccount();

    // Defining states
    const [reviews, setReviews] = useState([
        {
            name: 'Kanye West',
            stars: 5,
            text: 'Find God.',
            image: 'https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg'
        }, {
            name: 'Tim Cook',
            stars: 4.5,
            text: 'Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.',
            image: 'https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg'
        }, {
            name: 'Parag Agrawal',
            stars: 4,
            text: 'Enim neque volutpat ac tincidunt vitae semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam pellentesque nec. Turpis cursus in hac habitasse platea dictumst.',
            image: 'https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg'
        }, {
            name: 'Satya Nadella',
            stars: 4.5,
            text: 'Tortor dignissim convallis aenean et tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.',
            image: 'https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg'
        }, {
            name: 'Dan Schulman',
            stars: 3.5,
            text: 'Quam pellentesque nec nam aliquam sem et tortor consequat id. Enim sit amet venenatis urna cursus.',
            image: 'https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg'
        }, {
            name: 'Kanye West',
            stars: 5,
            text: 'Find God.',
            image: 'https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg'
        }, {
            name: 'Tim Cook',
            stars: 4.5,
            text: 'Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.',
            image: 'https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg'
        }, {
            name: 'Parag Agrawal',
            stars: 4,
            text: 'Enim neque volutpat ac tincidunt vitae semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam pellentesque nec. Turpis cursus in hac habitasse platea dictumst.',
            image: 'https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg'
        }, {
            name: 'Satya Nadella',
            stars: 4.5,
            text: 'Tortor dignissim convallis aenean et tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.',
            image: 'https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg'
        }, {
            name: 'Dan Schulman',
            stars: 3.5,
            text: 'Quam pellentesque nec nam aliquam sem et tortor consequat id. Enim sit amet venenatis urna cursus.',
            image: 'https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg'
        }
    ]);
    const [partOne, setPartOne] = useState([]);
    const [partTwo, setPartTwo] = useState([]);
    const [partThree, setPartThree] = useState([]);
    const [brilliantStudents, setBrilliantStudents] = useState(0);
    const [onlineCourses, setOnlineCourses] = useState(0);
    const [tutors, setTutors] = useState(0);
    const [placements, setPlacements] = useState(0);
    const [ratingModal, setRatingModal] = useState(false);
    const [feedback, setFeedback] = useState({
        comment: '',
        rating: 5
    });

    // Defining functions
    const handleRatingSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                ...feedback,
                companyId: `${process.env.REACT_APP_COMPANY_ID}`
            }
            const response = await callBackendApi('/company/addFeedback', 'POST', dataToSend);
            const data = await response.json();

            if (response.status === 201) {
                fetchReviews();
                setRatingModal(false);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Rating submit error:', error);
        }
    }

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/company/getFeedback/${process.env.REACT_APP_COMPANY_ID}`);
            const data = await response.json();

            if (response.status === 200) {
                const transformedFeedback = data.map(item => ({
                    name: item.userName,
                    image: item.userAvatar,
                    stars: item.rating,
                    text: item.comment,
                }));
                setReviews(transformedFeedback);
            } else if (response.status === 404) {
                setReviews([]);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (reviews.length > 0) {
            const partSize = Math.ceil(reviews.length / 3);
            setPartOne(reviews.slice(0, partSize));
            setPartTwo(reviews.slice(partSize, partSize * 2));
            setPartThree(reviews.slice(partSize * 2));
        }
    }, [reviews]);

    useEffect(() => {
        const fetchBrilliantStudents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/users/totalStudents`);
                const data = await response.json();

                if (response.status !== 200) {
                    throw new Error(data.message);
                }

                if (data.totalStudents < 100) {
                    setBrilliantStudents(`${data.totalStudents}`);
                } else if (data.totalStudents < 250) {
                    setBrilliantStudents(`100+`);
                } else if (data.totalStudents < 500) {
                    setBrilliantStudents(`250+`);
                } else if (data.totalStudents < 1000) {
                    setBrilliantStudents(`500+`);
                } else if (data.totalStudents < 5000) {
                    setBrilliantStudents(`1k+`);
                } else if (data.totalStudents < 10000) {
                    setBrilliantStudents(`5k+`);
                } else if (data.totalStudents < 20000) {
                    setBrilliantStudents(`10k+`);
                } else if (data.totalStudents < 30000) {
                    setBrilliantStudents(`20k+`);
                } else if (data.totalStudents < 40000) {
                    setBrilliantStudents(`30k+`);
                } else if (data.totalStudents < 50000) {
                    setBrilliantStudents(`40k+`);
                } else {
                    setBrilliantStudents(`50k+`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        const fetchOnlineCourses = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/courses/totalCourses`);
                const data = await response.json();

                if (response.status !== 200) {
                    throw new Error(data.message);
                }

                if (data.totalCourses < 100) {
                    setOnlineCourses(`${data.totalCourses}`);
                } else if (data.totalCourses < 250) {
                    setOnlineCourses(`100+`);
                } else if (data.totalCourses < 500) {
                    setOnlineCourses(`250+`);
                } else if (data.totalCourses < 1000) {
                    setOnlineCourses(`500+`);
                } else if (data.totalCourses < 5000) {
                    setOnlineCourses(`1k+`);
                } else if (data.totalCourses < 10000) {
                    setOnlineCourses(`5k+`);
                } else if (data.totalCourses < 20000) {
                    setOnlineCourses(`10k+`);
                } else if (data.totalCourses < 30000) {
                    setOnlineCourses(`20k+`);
                } else if (data.totalCourses < 40000) {
                    setOnlineCourses(`30k+`);
                } else if (data.totalCourses < 50000) {
                    setOnlineCourses(`40k+`);
                } else {
                    setOnlineCourses(`50k+`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        const fetchTutors = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/tutors/totalTutors`);
                const data = await response.json();

                if (response.status !== 200) {
                    throw new Error(data.message);
                }

                if (data.totalTutors < 10) {
                    setTutors(`${data.totalTutors}`);
                } else if (data.totalTutors < 25) {
                    setTutors(`10+`);
                } else if (data.totalTutors < 50) {
                    setTutors(`25+`);
                } else if (data.totalTutors < 100) {
                    setTutors(`50+`);
                } else if (data.totalTutors < 250) {
                    setTutors(`100+`);
                } else if (data.totalTutors < 500) {
                    setTutors(`250+`);
                } else if (data.totalTutors < 1000) {
                    setTutors(`500+`);
                } else if (data.totalTutors < 2000) {
                    setTutors(`1k+`);
                } else {
                    setTutors(`2k+`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchBrilliantStudents();
        fetchOnlineCourses();
        fetchTutors();
        // fetchReviews();
    }, []);

    useEffect(() => {
        const fetchPlacements = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/company/totalPlaced/${process.env.REACT_APP_COMPANY_ID}`);
                const data = await response.json();

                if (response.status !== 200) {
                    throw new Error(data.message);
                }
                let totalPlacedPercentage = 0;
                if (brilliantStudents !== 0) {
                    totalPlacedPercentage = (data.totalPlaced / brilliantStudents) * 100;
                } else {
                    totalPlacedPercentage = 0;
                }
                setPlacements(`${totalPlacedPercentage}%`);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPlacements();
    }, [brilliantStudents]);

    return (
        <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[7rem] bg-slate-100 dark:bg-slate-900`}>
            {/* About Us Section */}
            <section className="about p-4">
                <div className="flex flex-row items-center justify-between flex-wrap sm:w-[30rem] md:w-[50rem] lg:w-[63rem] mx-auto">
                    <div className="flex-1 min-w-[30rem]">
                        <img
                            src={aboutImg}
                            alt="About Us"
                            className="w-[30rem] object-cover h-[25rem]"
                        />
                    </div>
                    <div className="flex-1 min-w-[22rem] p-8">
                        <h3 className="text-3xl text-black dark:text-white">Why choose us?</h3>
                        <p className="text-lg text-light-color my-4 text-gray-700 dark:text-gray-300">
                            Currently we are the best coaching institute and career center in the region. We have a team of highly qualified and experienced teachers who are dedicated to providing quality education to students. We have a well-equipped library, computer lab, and science lab. We also provide career counseling to students to help them choose the right career path.
                        </p>
                        <div className="flex flex-row gap-8">
                            <Link to='/courses'>
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 dark:from-gray-200 dark:to-gray-100 text-white dark:text-black shadow-md shadow-gray-900/10 dark:shadow-gray-100/90 hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-gray-100/80 active:opacity-[0.85]"
                                    type="button">
                                    Discover Courses
                                </button>
                            </Link>
                            <button
                                onClick={() => setRatingModal(true)}
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 dark:from-gray-200 dark:to-gray-100 text-white dark:text-black shadow-md shadow-gray-900/10 dark:shadow-gray-100/90 hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-gray-100/80 active:opacity-[0.85]"
                                type="button"
                            >
                                Rate Us
                            </button>
                        </div>
                    </div>
                </div>

                {ratingModal && (
                    <Modal title="Rate Us" closeModal={() => setRatingModal(false)}>
                        <form
                            onSubmit={handleRatingSubmit}
                            className="mx-auto px-8 py-4 w-[53vw] bg-slate-100 dark:bg-slate-800 rounded-lg shadow-lg"
                        >
                            <div className="relative z-0 w-full mb-8 group">
                                <label for="floating_email" className="text-2xl font-bold text-gray-500 dark:text-gray-400 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">Commments</label>
                                <textarea
                                    value={feedback.comment}
                                    onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                                    className="block py-2.5 px-2 h-[13vh] w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 dark:focus:border-2 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2 peer"
                                    placeholder=" "
                                    required
                                />
                            </div>
                            <div className="relative z-0 w-full mb-8 group">
                                <p className="text-2xl text-gray-500 dark:text-gray-400  font-bold">Rate us</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    {/* Radio buttons for rating selection */}
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <label key={i}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={i + 1}
                                                className="hidden" // Hide the default radio input
                                                onChange={() => setFeedback({ ...feedback, rating: i + 1 })}
                                            />
                                            <svg
                                                className={`w-[3rem] h-[3rem] ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-600'}`} // Change color based on rating
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        </label>
                                    ))}
                                </div>
                                <p className="mt-4 text-2xl text-gray-500 dark:text-gray-400">Selected Rating: {feedback.rating}</p> {/* Display selected rating */}
                            </div>
                            <button type="submit" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-bold rounded-lg text-md w-[30vw] mx-auto px-5 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Submit</button>
                        </form>
                    </Modal>
                )}

                <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300">Brilliant Students</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-stone-800 dark:text-white">{brilliantStudents}</dd>
                    </div>
                    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300">Online courses</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-stone-800 dark:text-white">{onlineCourses}</dd>
                    </div>
                    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300">Tutors</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-stone-800 dark:text-white">{tutors}</dd>
                    </div>
                    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300">Placements</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-stone-800 dark:text-white">{placements}</dd>
                    </div>
                </dl>
            </section>

            {/* Reviews Section */}
            <section id="testimonies" className="py-10 bg-slate-100 dark:bg-slate-900">
                <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
                    <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
                        <div className="mb-12 space-y-5 md:mb-16 md:text-center">
                            <div
                                className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 dark:text-indigo-900 rounded-lg md:text-center text-cn bg-[#202c47] dark:bg-[#a3b1d2] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
                                Words from Others
                            </div>
                            <h1 className="mb-5 text-3xl font-semibold text-black dark:text-white md:text-center md:text-5xl">
                                It's not just us.
                            </h1>
                            <p className="text-xl text-gray-900 dark:text-gray-100 md:text-center md:text-2xl">
                                Here's what others have to say about us.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 p-6">
                        <ul className="space-y-8">
                            {Array.isArray(partOne) && partOne.length > 0 && partOne.map((review, idx) => (
                                <li key={idx} className="text-sm leading-6">
                                    <div className="relative group">
                                        <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200" />
                                        <a href="https://twitter.com/kanyewest" className="cursor-pointer">
                                            <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={review.image}
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                                                        <p className="text-gray-500 text-md flex flex-row">
                                                            {/* Full Stars */}
                                                            {Array(Math.floor(review.stars)).fill(0).map((_, i) => (
                                                                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                            ))}

                                                            {/* Empty Stars */}
                                                            {Array(5 - Math.floor(review.stars)).fill(0).map((_, i) => (
                                                                <svg key={i} className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">{review.text}</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ul className="hidden space-y-8 sm:block">
                            {Array.isArray(partTwo) && partTwo.length > 0 && partTwo.map((review, idx) => (
                                <li key={idx} className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/paraga" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={review.image}
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                                                        <p className="text-gray-500 text-md flex flex-row">
                                                            {/* Full Stars */}
                                                            {Array(Math.floor(review.stars)).fill(0).map((_, i) => (
                                                                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                            ))}

                                                            {/* Empty Stars */}
                                                            {Array(5 - Math.floor(review.stars)).fill(0).map((_, i) => (
                                                                <svg key={i} className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">{review.text}</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ul className="hidden space-y-8 lg:block">
                            {Array.isArray(partThree) && partThree.length > 0 && partThree.map((review, idx) => (
                                <li key={idx} className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/satyanadella" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={review.image}
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                                                        <p className="text-gray-500 text-md flex flex-row">
                                                            {/* Full Stars */}
                                                            {Array(Math.floor(review.stars)).fill(0).map((_, i) => (
                                                                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                            ))}

                                                            {/* Empty Stars */}
                                                            {Array(5 - Math.floor(review.stars)).fill(0).map((_, i) => (
                                                                <svg key={i} className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">{review.text}</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </main >
    );
}