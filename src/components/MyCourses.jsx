import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

// Import context
import { useSidebar } from '../context/SidebarContext';

// Import hooks
import { useAccount } from "../hooks/useAuth";

// Import components
import Modal from "./Modal";

// Import icons
import { TiPlus } from "react-icons/ti";
import { FaChevronDown, FaFilter } from "react-icons/fa6";

const filters = [
    {
        id: 'category', name: 'Category', options: [
            { id: "", name: "All" },
            { id: 'Development', name: 'Development' },
            { id: 'Business', name: 'Business' },
            { id: 'Management', name: 'Management' },
        ]
    },
    {
        id: 'status', name: 'Status', options: [
            { id: "", name: "All" },
            { id: 'ongoing', name: 'Ongoing' },
            { id: 'upcoming', name: 'Upcoming' },
            { id: 'ended', name: 'Ended' },
        ]
    },
]

const categoryArray = ['Development', 'Business', 'Management'];

const dummyCourses = [
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
];

const MyCourses = () => {
    const { sidebarActive } = useSidebar();
    const { account, callBackendApi } = useAccount();
    const [searchParams] = useSearchParams();

    // Define states
    const [courses, setCourses] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        'category': '',
        'status': '',
    });
    const [sortType, setSortType] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(courses);
    const [sortedCourses, setSortedCourses] = useState(filteredCourses);
    const [searchedCourses, setSearchedCourses] = useState(sortedCourses);
    const [newCourseModalOpen, setNewCourseModalOpen] = useState(false);

    // New course states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    // Define functions
    const handleCreateCourse = async (e) => {
        e.preventDefault();

        try {
            const newCourseData = {
                title,
                description,
                category,
                thumbnail,
                tutor: account.id
            }
            const response = await callBackendApi('/courses/add', 'POST', newCourseData);
            if (response.status === 201) {
                const data = await response.json();
                setCourses([
                    ...courses,
                    {
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        image: data.thumbnail,
                        category: data.category,
                        contentCount: 0,
                        status: data.status,
                        startDate: new Date(data.createdAt),
                    }
                ]);
            } else {
                const data = await response.json();
                throw new Error('Create course error:', data.message);
            }
        } catch (error) {
            console.error('Create course error:', error);
        } finally {
            setTitle('');
            setDescription('');
            setCategory('');
            setThumbnail('');
            setNewCourseModalOpen(false);
        }
    }

    const handleChangeThumbnail = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onloadend = () => {
            setThumbnail(reader.result);
        }

        reader.readAsDataURL(file);
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await callBackendApi(`/tutors/getCourses/${account.id}`, 'GET', null);

                if (response.status === 206) {
                    setCourses([]);
                    setFilteredCourses([]);
                    setSearchedCourses([]);
                } else if (response.status === 200) {
                    const data = await response.json();
                    const formattedCourses = data.map(course => ({
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        image: course.image,
                        category: course.category,
                        contentCount: course.contentCount,
                        status: course.status,
                        startDate: new Date(course.createdAt),
                    }));
                    setCourses(formattedCourses);
                } else {
                    const data = await response.json();
                    throw new Error('Fetch courses error:', data.message);
                }
            } catch (error) {
                console.error('Fetch courses error:', error);
            }
        }

        fetchCourses();
    }, [account.id, callBackendApi]);

    // Handling filter functionality
    useEffect(() => {
        const filtered = courses.filter(course => {
            let isValid = true;

            for (const key in selectedFilters) {
                if (selectedFilters[key] !== '' && course[key] !== selectedFilters[key]) {
                    isValid = false;
                }
            }

            return isValid;
        });

        setFilteredCourses(filtered);
    }, [courses, selectedFilters]);

    // Handling sort functionality
    useEffect(() => {
        if (sortType === 'date') {
            setSortedCourses([...filteredCourses].sort((a, b) => new Date(b.startDate) - new Date(a.startDate)));
        } else if (sortType === 'alpha') {
            setSortedCourses([...filteredCourses].sort((a, b) => a.title.localeCompare(b.title)));
        } else if (sortType === 'dsc') {
            if (Array.isArray(sortedCourses) && sortedCourses.length > 0) {
                setSortedCourses([...sortedCourses].reverse());
            } else {
                setSortedCourses([...filteredCourses].reverse());
            }
        } else {
            setSortedCourses(filteredCourses);
        }
    }, [sortType, filteredCourses]);

    // Handling search functionality
    useEffect(() => {
        const searchQuery = searchParams.get('search');
        if (searchQuery && Array.isArray(sortedCourses) && sortedCourses.length > 0) {
            const searched = sortedCourses.filter((course) =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchedCourses(searched);
        } else {
            setSearchedCourses(sortedCourses);
        }
    }, [searchParams, sortedCourses]);

    return (
        <main className="mx-auto px-4 sm:px-8 mt-14">
            <div className="mt-20 mb-16 w-full flex flex-row items-center justify-around">
                <div className="flex flex-row gap-4">
                    {filters.map((filter, idx) => (
                        <div key={idx} className="flex flex-col w-[12rem]">
                            <label htmlFor={filter.id} className="text-sm font-medium text-stone-600 dark:text-stone-400">{filter.name}</label>

                            <select
                                id={filter.id}
                                className="cursor-pointer mt-2 block w-full rounded-md border text-black dark:text-white border-gray-100 dark:border-gray-900 bg-gray-100 dark:bg-gray-900 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, [filter.id]: e.target.value })}
                            >
                                {filter.options.map((option, index) => (
                                    <option key={index} value={option.id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row gap-4">
                    <div className="relative w-44">
                        <FaFilter className="text-black dark:text-white absolute top-1/2 -translate-y-1/2 right-[9rem] z-[1]" />
                        <select
                            id="Offer"
                            className="h-12 border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-gray-100 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white dark:bg-black transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50 dark:hover:border-gray-500 dark:hover:bg-gray-950 dark:focus-within:bg-gray-950"
                            onChange={(e) => setSortType(e.target.value)}
                        >
                            <option value="" selected disabled className="text-gray-400 dark:text-gray-500">Sort</option>
                            <option value="date">Date</option>
                            <option value="alpha">Alphabet</option>
                            <option value="dsc">ASC | DSC</option>
                        </select>
                        <FaChevronDown className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-900 dark:text-gray-100" />
                    </div>
                    <button
                        onClick={() => setNewCourseModalOpen(true)}
                        className="flex flex-row items-center gap-4 w-[max-content] rounded-xl px-4 py-2 border-dashed border-2 border-gray-300 text-gray-900 bg-gray-50 hover:bg-gray-200 dark:border-gray-600 dark:text-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800 cursor-pointer"
                    ><TiPlus /> New Course</button>
                </div>
            </div>

            {newCourseModalOpen && (
                <Modal title={`New Course: ${title.slice(0, 25)} ${title.length > 25 ? '...' : ''}`} closeModal={() => setNewCourseModalOpen(false)} >
                    <div className="relative shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] px-6 py-4 bg-purple-100 dark:bg-transparent">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-0 dark:opacity-70"
                            style={{ backgroundImage: `url('/beautiful-forest-landscape.jpg')` }}
                        />

                        {/* Form Content */}
                        <form onSubmit={handleCreateCourse} className="relative z-10 px-6 py-4">

                            {thumbnail && <img
                                src={thumbnail}
                                alt="Uploaded Thumbnail Preview"
                                className="mt-2 w-full h-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-md"
                            />}
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                                                Title of Course
                                            </label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                        id="title"
                                                        name="title"
                                                        type="text"
                                                        placeholder="Title of Course"
                                                        required
                                                        autoComplete="on"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        className="block flex-1 border-0 bg-gray-100 dark:bg-gray-900 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-0 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                                                Description
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="about"
                                                    name="about"
                                                    rows={3}
                                                    required
                                                    className="block w-full px-2 rounded-md border-0 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm/6"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                            <p className="mt-3 text-sm/6 text-gray-800 dark:text-gray-200">Write a few sentences about this course, whom is this course for, difficulty level and so on.</p>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                                                Thumbnail
                                            </label>
                                            <div className="flex items-center justify-center w-full">
                                                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px) of 16:9 ratio</p>
                                                    </div>
                                                    <input
                                                        id="dropzone-file"
                                                        type="file"
                                                        className="hidden"
                                                        // value={thumbnail}
                                                        onChange={handleChangeThumbnail}
                                                        accept="image/*"
                                                        required
                                                    />
                                                </label>
                                            </div>
                                            {/* Image preview section */}
                                            {thumbnail && (
                                                <div className="mt-4 flex flex-col items-center">
                                                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Image uploaded successfully! Check above.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100">Category:</legend>
                                            <ul className="grid w-full gap-6 md:grid-cols-2">
                                                {categoryArray.map((category, idx) => (
                                                    <li key={idx}>
                                                        <input
                                                            type="radio"
                                                            id={`category-${idx}`}
                                                            name="category"
                                                            value={category}
                                                            className="hidden peer"
                                                            required
                                                            onChange={(e) => setCategory(e.target.value)}
                                                        />
                                                        <label
                                                            htmlFor={`category-${idx}`}
                                                            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                                        >
                                                            <div className="block">
                                                                <div className="w-full text-lg font-semibold">{category}</div>
                                                            </div>
                                                            <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                            </svg>
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => setNewCourseModalOpen(false)} className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}

            <div className={`${sidebarActive ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-4 px-4'}`}>
                {(Array.isArray(searchedCourses) && searchedCourses.length > 0) ? searchedCourses.map(course => (
                    <div key={course.id} className="flex flex-row bg-white dark:bg-gray-800 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] dark:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-xl overflow-hidden">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="h-[10.72rem] aspect-[16/9] object-fit object-center"
                        />
                        <div>
                            <div className="p-4">
                                <Link to={`/course/${course.id}`} className="text-xl font-semibold text-gray-800 dark:text-gray-100">{course.title}</Link>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">{course.description.split(' ').slice(0, 20).join(' ')} ...</p>
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