import React, { useState, useEffect } from 'react'

// Importing context
import { useSidebar } from '../context/SidebarContext';

// Importing components
import CourseCard from '../components/CourseCard';

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

// Filters
const filters = [
  {
    id: 'instructor', name: 'Instructor', options: [
      { id: 'john-doe', name: 'John Doe' },
      { id: 'jane-doe', name: 'Jane Doe' },
      { id: 'joe-doe', name: 'Joe Doe' },
    ]
  },
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

export default function Courses() {
  const { sidebarActive } = useSidebar();

  // Defining State
  const [courses, setCourses] = useState([
    { tutorImg: pic2, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb1, videoCount: 10, title: 'Complete HTML Tutorial', id: 1 },
    { tutorImg: pic3, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb2, videoCount: 10, title: 'Complete CSS Tutorial', id: 2 },
    { tutorImg: pic4, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb3, videoCount: 10, title: 'Complete JS Tutorial', id: 3 },
    { tutorImg: pic5, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb4, videoCount: 10, title: 'Complete Bootstrap Tutorial', id: 4 },
    { tutorImg: pic6, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb5, videoCount: 10, title: 'Complete jQuery Tutorial', id: 5 },
    { tutorImg: pic7, tutorName: 'John Deo', date: '21-10-2022', thumbImg: thumb6, videoCount: 10, title: 'Complete SASS Tutorial', id: 6 },
  ]);
  const [selectedFilters, setSelectedFilters] = useState({
    instructor: '',
    category: '',
    status: '',
  });
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchedCourses, setSearchedCourses] = useState('');

  // Defining functions
  useEffect(() => {
    // Fetching data from API
  }, []);

  return (
    <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[4rem] bg-white dark:bg-black`}>
      <section className="py-4">
        <div className='flex flex-row w-[67rem] items-center mx-auto justify-between'>
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-600 dark:text-slate-400">Our Courses</h1>
          <div className="m-10 w-screen max-w-screen-md">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {filters.map((filter, idx) => (
                  <div key={idx} className="flex flex-col">
                    <label htmlFor={filter.id} className="text-sm font-medium text-stone-600 dark:text-stone-400">{filter.name}</label>

                    <select id={filter.id} className="cursor-pointer mt-2 block w-full rounded-md border text-black dark:text-white border-gray-100 dark:border-gray-900 bg-gray-100 dark:bg-gray-900 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                      {filter.options.map((option, index) => (
                        <option key={index}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className={`grid grid-cols-1 gap-6 px-4 ${!sidebarActive ? 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'}`}>
          {courses.map((course, idx) => (
            <CourseCard
              key={idx}
              tutorImage={course.tutorImg}
              tutorName={course.tutorName}
              date={course.date}
              thumbImage={course.thumbImg}
              videoCount={course.videoCount}
              title={course.title}
              link={`/course/${course.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
