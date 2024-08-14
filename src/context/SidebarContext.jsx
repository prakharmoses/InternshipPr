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

export function useSidebar() {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }

    return context;
}