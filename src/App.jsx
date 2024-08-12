import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Importing Context
import { DarkModeProvider } from './context/DarkModeContext';
import { SidebarProvider } from './context/SidebarContext';

// Importing Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Importing Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Teachers from './pages/Teachers';
import NotFound from './pages/NotFound';
import CourseDetails from './pages/CourseDetails';
import Profile from './pages/Profile';
import VideoPage from './pages/VideoPage';

function App() {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/about-us" element={<Layout />} />
          <Route path="/courses" element={<Layout />} />
          <Route path="/contact" element={<Layout />} />
          <Route path="/teachers" element={<Layout />} />
          <Route path="/course/:courseId" element={<Layout />} />
          <Route path="/profile/:profileId" element={<Layout />} />
          <Route path="/video/:videoLink" element={<Layout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DarkModeProvider>
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();
  
  // Determine if the current path is the NotFound page
  const isNotFound = location.pathname === '/404'; // Adjust this path if needed

  return (
    <>
      {!isNotFound && (
        <SidebarProvider>
          <Navbar />
          <Sidebar />
        </SidebarProvider>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/profile/:profileId" element={<Profile />} />
        <Route path="/video/:videoLink" element={<VideoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isNotFound && <Footer />}
    </>
  );
}

export default App;