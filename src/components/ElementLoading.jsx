export default function ElementLoading() {
    return (
        /* From Uiverse.io by yohohopizza */
        <div className="flex items-center justify-center w-full">
            <div class="flex flex-row gap-2">
                <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                <div
                    class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"
                ></div>
                <div
                    class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"
                ></div>
            </div>
        </div>
    )
}