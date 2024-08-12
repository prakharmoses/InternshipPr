import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCode, FaChartSimple, FaPen,
  FaChartLine, FaMusic, FaCamera,
  FaCog, FaVial, FaHtml5,
  FaCss3, FaJs, FaReact,
  FaPhp, FaBootstrap
} from 'react-icons/fa';

// Importing context
import { useDarkMode } from '../context/DarkModeContext';

export default function Home() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  return (
    <div>This is a page</div>
  );
}