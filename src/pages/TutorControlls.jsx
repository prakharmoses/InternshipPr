import { useState } from "react";

// Import context
import { useSidebar } from "../context/SidebarContext";

// Import components
import TableList from "../components/tables/TableList";
import LoadingUI from "../components/LoadingUI";

export default function AdminDashboard() {
    const { sidebarActive } = useSidebar();

    // Defining State
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    setTimeout(() => {
        setIsPageLoaded(true);
    }, [1000]);

    if (!isPageLoaded) {
        return (
            <main className={`ml-[18rem] w-[82vw] h-[100vh] pt-[5rem] pb-[7rem] bg-slate-300 dark:bg-black`}>
                <LoadingUI />
            </main>
        )
    }

    return (
        <main className={`${sidebarActive && 'ml-[18rem]'} border-gray-500 border-2 h-full pt-[5rem] pb-[7rem] bg-white dark:bg-black`}>
            <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 px-6">
                <TableList />
            </div>
        </main>
    )
}