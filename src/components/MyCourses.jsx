import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import icons
import { TiPlus } from "react-icons/ti";
import { FaFilter } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

const filters = [
    {
        id: 'category', name: 'Category', options: [
            { id: 'development', name: 'Development' },
            { id: 'business', name: 'Business' },
            { id: 'management', name: 'Management' },
        ]
    },
    {
        id: 'status', name: 'Status', options: [
            { id: 'ongoing', name: 'Ongoing' },
            { id: 'upcoming', name: 'Upcoming' },
            { id: 'ended', name: 'Ended' },
        ]
    },
]

const MyCourses = () => {
    // Define states
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: 'Introduction to HTML',
            description: 'Learn the basics of HTML and how to create a website from scratch using HTML only without any CSS or JavaScript involved in the process. This course is designed for beginners who are new to web development and want to learn how to create a website using HTML.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNtOzypPNyw780jU3LqCysnHJ8CPgakjir1w&s',
            category: 'Web Development',
            contentCount: 10,
            status: 'In Progress',
            startDate: new Date()
        },
        {
            id: 2,
            title: 'Introduction to CSS',
            description: 'Learn the basics of HTML and how to create a website from scratch using HTML only without any CSS or JavaScript involved in the process. This course is designed for beginners who are new to web development and want to learn how to create a website using HTML.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvv2__tSddXBQp-SYjwpKwotlCkXK-INY_lg&s',
            category: 'Web Development',
            contentCount: 10,
            status: 'In Progress',
            startDate: new Date()
        },
        {
            id: 3,
            title: 'Introduction to JavaScript',
            description: 'Learn the basics of HTML and how to create a website from scratch using HTML only without any CSS or JavaScript involved in the process. This course is designed for beginners who are new to web development and want to learn how to create a website using HTML.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRYoG5o0nQDx8Fz2UV7obIJWhFODDr631DnQ&s',
            category: 'Web Development',
            contentCount: 10,
            status: 'In Progress',
            startDate: new Date()
        }
    ]);
    const [selectedFilters, setSelectedFilters] = useState({
        category: '',
        status: '',
    });
    const [sortType, setSortType] = useState('asc');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [sortedCourses, setSortedCourses] = useState([]);
    const [searchedCourses, setSearchedCourses] = useState('');

    return (
        <main className="mx-auto px-4 sm:px-8 mt-14">
            {/* <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 my-6">My Courses</h2> */}
            <div className="mt-20 mb-10 w-full flex flex-row items-center justify-evenly">
                {filters.map((filter, idx) => (
                    <div key={idx} className="flex flex-col w-[15rem]">
                        <label htmlFor={filter.id} className="text-sm font-medium text-stone-600 dark:text-stone-400">{filter.name}</label>

                        <select id={filter.id} className="cursor-pointer mt-2 block w-full rounded-md border text-black dark:text-white border-gray-100 dark:border-gray-900 bg-gray-100 dark:bg-gray-900 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                            {filter.options.map((option, index) => (
                                <option key={index}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <div className="relative w-44">
                    <svg className="absolute top-1/2 -translate-y-1/2 left-4 z-50" width="20" height="20"
                        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
                            stroke="black" stroke-width="1.6" stroke-linecap="round" />
                    </svg>
                    <select id="Offer"
                        className="h-12 border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-gray-100 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white dark:bg-black transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50 dark:hover:border-gray-500 dark:hover:bg-gray-950 dark:focus-within:bg-gray-950">
                        <option selected>Sort</option>
                        <option value="option 1">Date</option>
                        <option value="option 2">Alphabetically</option>
                        <option value="option 3">Decreasing</option>
                    </select>
                    <FaChevronDown className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-900 dark:text-gray-100" />
                </div>
                <button
                    onClick={() => console.log('New Course')}
                    className="flex flex-row items-center gap-4 w-[max-content] rounded-xl p-4 border-dashed border-2 border-gray-300 text-gray-900 bg-gray-50 hover:bg-gray-200 dark:border-gray-600 dark:text-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800 cursor-pointer"
                ><TiPlus /></button>
            </div>
            <div className="flex flex-col gap-4">
                {courses.length > 0 ? courses.map(course => (
                    <div key={course.id} className="flex flex-row bg-white dark:bg-gray-800 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] dark:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-xl overflow-hidden">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="h-[10.72rem] aspect-[16/9] object-fit object-center"
                        />
                        <div>
                            <div className="p-4">
                                <Link to={`/course/${course.id}`} className="text-xl font-semibold text-gray-800 dark:text-gray-100">{course.title}</Link>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">{course.description.split(' ').slice(0, 30).join(' ')} ...</p>
                                <div className="grid grid-cols-2 mt-2">
                                    <span className="text-gray-600 dark:text-gray-400"><p className='font-bold inline'>Category:</p> {course.category}</span>
                                    <span className="text-gray-600 dark:text-gray-400"><p className='font-bold inline'>Contents:</p> {course.contentCount}</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 dark:text-gray-400"><p className='font-bold inline'>Status:</p> {course.status}</span>
                                    <span className="text-gray-600 dark:text-gray-400"><p className='font-bold inline'>Start Date:</p> {course.startDate.toDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="text-gray-600 dark:text-gray-400 text-center">No courses available</p>
                )}
            </div>
        </main>
    );
}

export default MyCourses;