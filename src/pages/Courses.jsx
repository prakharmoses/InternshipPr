import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

// Importing context
import { useSidebar } from '../context/SidebarContext';

// Import hooks
import { useAccount } from '../hooks/useAuth';

// Importing components
import CourseCard from '../components/CourseCard';

// Import icons
import { FaFilter, FaChevronDown } from 'react-icons/fa';

// Importing assets
import pic2 from '../assets/pic-2.jpg';
import pic3 from '../assets/pic-3.jpg';
import pic4 from '../assets/pic-4.jpg';
import pic5 from '../assets/pic-5.jpg';
import pic6 from '../assets/pic-6.jpg';
import pic7 from '../assets/pic-7.jpg';
import thumb1 from '../assets/thumb-1.png';
import thumb2 from '../assets/thumb-2.png';
import thumb3 from '../assets/thumb-3.png';
import thumb4 from '../assets/thumb-4.png';
import thumb5 from '../assets/thumb-5.png';
import thumb6 from '../assets/thumb-6.png';

const maxNumCourses = 50;

const dummyCourses = [
  { tutorImg: pic2, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb1, contentCount: 10, title: 'Complete HTML Tutorial', id: 1, category: 'development', status: 'ongoing' },
  { tutorImg: pic3, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb2, contentCount: 10, title: 'Complete CSS Tutorial', id: 2, category: 'development', status: 'upcoming' },
  { tutorImg: pic4, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb3, contentCount: 10, title: 'Complete JS Tutorial', id: 3, category: 'development', status: 'ended' },
  { tutorImg: pic5, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb4, contentCount: 10, title: 'Complete Bootstrap Tutorial', id: 4, category: 'business', status: 'ongoing' },
  { tutorImg: pic6, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb5, contentCount: 10, title: 'Complete jQuery Tutorial', id: 5, category: 'management', status: 'upcoming' },
  { tutorImg: pic7, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb6, contentCount: 10, title: 'Complete SASS Tutorial', id: 6, category: 'business', status: 'ended' },
]

const dummyFilter = [
  {
    id: 'tutorName', name: 'Instructor', options: []
  },
  {
    id: 'category', name: 'Category', options: []
  },
  {
    id: 'status', name: 'Status', options: [
      { id: '', name: 'All' },
      { id: 'ongoing', name: 'Ongoing' },
      { id: 'upcoming', name: 'Upcoming' },
      { id: 'ended', name: 'Ended' },
    ]
  },
]

export default function Courses() {
  const { sidebarActive } = useSidebar();
  const { callBackendApi } = useAccount();
  const [searchParams] = useSearchParams();

  // Defining State
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState(dummyFilter);
  const [selectedFilters, setSelectedFilters] = useState({
    instructor: '',
    category: '',
    status: '',
  });
  const [sortType, setSortType] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [sortedCourses, setSortedCourses] = useState(filteredCourses);
  const [searchedCourses, setSearchedCourses] = useState(sortedCourses);
  const [displayViewMore, setDisplayViewMore] = useState(true);

  // Category filter logic on rendering
  const categoryQuery = searchParams.get('category');

  // Defining functions
  const fetchCourses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/courses/getCourses/${courses.length + maxNumCourses}`);
      const data = await response.json();

      if (response.status === 200) {
        if (data.length === courses.length) {
          setDisplayViewMore(false);
        }
        setCourses(data);
      } else if (response.status === 404) {
        setCourses([]);
      } else {
        console.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/company/getCategories/${process.env.REACT_APP_COMPANY_ID}`);
      const data = await response.json();

      if (response.status === 200) {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            filter.id === 'category'
              ? {
                ...filter,
                options: [
                  { id: '', name: 'All' },
                  ...data.map((category) => ({ id: category, name: category }))
                ]
              }
              : filter
          )
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const fetchTutors = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_EXPRESS_APP_URL}/tutors/tutorNames`);
      const data = await response.json();

      if (response.status === 200) {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            filter.id === 'tutorName'
              ? {
                ...filter,
                options: [
                  { id: '', name: 'All' },
                  ...data.map((tutor) => ({ id: tutor.name, name: tutor.name }))
                ]
              }
              : filter
          )
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchTutors();
    fetchCourses();
  }, []);

  // Handling category filter logic upon render
  useEffect(() => {
    if (categoryQuery) {
      setSelectedFilters({ ...selectedFilters, category: categoryQuery });
    }
  }, [categoryQuery]);

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
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchedCourses(searched);
    } else {
      setSearchedCourses(sortedCourses);
    }
  }, [searchParams, sortedCourses]);

  return (
    <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[4rem] bg-white dark:bg-black`}>
      <section className="py-4">
        <div className='flex flex-col w-[67rem] items-center mx-auto justify-between'>
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-600 dark:text-slate-400">Our Courses</h1>
          <div className="flex flex-row gap-10 mb-10 items-center w-[60vw]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-[70vw]">
              {filters.map((filter, idx) => (
                <div key={idx} className="flex flex-col">
                  <label htmlFor={filter.id} className="text-sm font-medium text-stone-600 dark:text-stone-400">{filter.name}</label>

                  <select
                    id={filter.id}
                    onChange={(e) => setSelectedFilters({ ...selectedFilters, [filter.id]: e.target.value })}
                    className="cursor-pointer mt-2 block w-full rounded-md border text-black dark:text-white border-gray-100 dark:border-gray-900 bg-gray-100 dark:bg-gray-900 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    {filter.options.length > 0 && filter.options.map((option, index) => (
                      <option key={index} value={option.id} selected={option.id === selectedFilters[filter.id]}>{option.name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="relative w-67.5">
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
          </div>
        </div>

        {Array.isArray(searchedCourses) && searchedCourses.length > 0 ? (
          <div className='flex flex-col items-center'>
            <div className={`grid grid-cols-1 gap-6 px-4 ${!sidebarActive ? 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'}`}>
              {searchedCourses.map((course, idx) => (
                <CourseCard
                  key={idx}
                  tutorImage={course.tutorImg}
                  tutorName={course.tutorName}
                  date={course.date}
                  thumbImage={course.thumbImg}
                  contentCount={course.contentCount}
                  title={course.title}
                  link={`/course/${course.id}`}
                />
              ))}
            </div>
            {courses.length >= maxNumCourses && displayViewMore && <button
              onClick={fetchCourses}
              className="dark:bg-indigo-400 dark:text-white dark:hover:text-indigo-400 dark:hover:bg-transparent text-indigo-700 border border-indigo-600 hover:bg-indigo-700 hover:text-white py-2 px-[10rem] rounded"
            >
              View More
            </button>}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-2xl font-semibold text-center text-gray-500 dark:text-gray-400">No courses found</p>
          </div>
        )}
      </section>
    </main>
  )
}
