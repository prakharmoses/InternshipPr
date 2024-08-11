import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [sidebarActive, setSidebarActive] = useState(true);

    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };

    return (
        <SidebarContext.Provider value={{ sidebarActive, setSidebarActive, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);