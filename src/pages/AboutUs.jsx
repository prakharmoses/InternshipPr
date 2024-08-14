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

export default function AboutUs() {
    const { sidebarActive } = useSidebar();

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

    // Defining functions
    const handleRating = () => {
        alert('Thank you for rating us!');
    };

    useEffect(() => {
        const partSize = Math.ceil(reviews.length / 3);

        setPartOne(reviews.slice(0, partSize));
        setPartTwo(reviews.slice(partSize, partSize * 2));
        setPartThree(reviews.slice(partSize * 2));
    }, [reviews]);

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
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut dolorum quasi illo? Distinctio expedita commodi, nemo a quam error repellendus sint, fugiat quis numquam eum eveniet sequi aspernatur quaerat tenetur.
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
                                onClick={handleRating}
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 dark:from-gray-200 dark:to-gray-100 text-white dark:text-black shadow-md shadow-gray-900/10 dark:shadow-gray-100/90 hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-gray-100/80 active:opacity-[0.85]"
                                type="button"
                            >
                                Rate Us
                            </button>
                        </div>
                    </div>
                </div>

                <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300">Brilliant Students</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-stone-800 dark:text-white">+40k</dd>
                    </div>
                    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300">Online courses</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-stone-800 dark:text-white">+10k</dd>
                    </div>
                    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300">Tutors</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-stone-800 dark:text-white">+2k</dd>
                    </div>
                    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-800 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300">Placements</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-stone-800 dark:text-white">100%</dd>
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
                            {partOne.map((review, idx) => (
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
                            {partTwo.map((review, idx) => (
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
                            {partThree.map((review, idx) => (
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