import React from 'react';
import '../styles/LoadingUI.css';

// Import context
import { useSidebar } from '../context/SidebarContext';

export default function LoadingUI() {
  const { sidebarActive } = useSidebar();

  return (
    <section className={`flex items-center justify-center self-end`}>
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>
    </section>
  )
}