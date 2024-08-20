import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Importing Context
import { DarkModeProvider } from './context/DarkModeContext';
import { SidebarProvider } from './context/SidebarContext';
import { AccountProvider } from './context/AccountContext';

// Importing Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

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
        <SidebarProvider>
          <AccountProvider>
            <Routes>
              {/* Main layout with Navbar, Sidebar, Footer */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="courses" element={<Courses />} />
                <Route path="contact" element={<Contact />} />
                <Route path="teachers" element={<Teachers />} />
                <Route path="course/:courseId" element={<CourseDetails />} />
                <Route path="profile/:profileId" element={<Profile />} />
                <Route path="content/:contentLink" element={<VideoPage />} />
              </Route>

              {/* NotFound page layout without Navbar, Sidebar, Footer */}
              <Route path="*" element={<NotFoundLayout />}>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AccountProvider>
        </SidebarProvider>
      </DarkModeProvider>
    </BrowserRouter>
  );
}

// Layout with Navbar, Sidebar, Footer
function MainLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <ChatBot />
      <main>
        <Outlet /> {/* Renders the matched child route component */}
      </main>
      <Footer />
    </>
  );
}

// Layout without Navbar, Sidebar, Footer
function NotFoundLayout() {
  return (
    <main>
      <Outlet /> {/* Renders the NotFound component */}
    </main>
  );
}

export default App;