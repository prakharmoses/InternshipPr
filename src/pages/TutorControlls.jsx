import { useState } from "react";

// Import context
import { useSidebar } from "../context/SidebarContext";

// Import components
import TableList from "../components/tables/TableList";

export default function AdminDashboard() {
    const { sidebarActive } = useSidebar();

    return (
        <main className={`${sidebarActive && 'ml-[18rem]'} border-red-500 border-2 h-full pt-[5rem] pb-[7rem] bg-slate-50 dark:bg-slate-950`}>
            <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 px-6">
                <TableList />
            </div>
        </main>
    )
}