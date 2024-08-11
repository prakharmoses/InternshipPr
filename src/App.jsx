import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing Context
import { DarkModeProvider } from './context/DarkModeContext';
import { SidebarProvider } from './context/SidebarContext';

// Importing Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Importing Pages

function App() {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <SidebarProvider>
          <Navbar />
          <Sidebar />
        </SidebarProvider>
        <Routes>

        </Routes>
        <Footer />
      </DarkModeProvider>
    </BrowserRouter>
  );
}

export default App;
