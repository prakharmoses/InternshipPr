import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const dummyComments = [
    { id: 1, title: 'Great work!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 1 },
    { id: 2, title: 'Keep it up!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 2 },
    { id: 3, title: 'Nice job!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 3 },
    { id: 4, title: 'Awesome!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 4 },
    { id: 5, title: 'Fantastic!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 5 },
    { id: 6, title: 'Good job!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 6 },
    { id: 7, title: 'Well done!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 7 },
    { id: 8, title: 'Excellent!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 8 },
    { id: 9, title: 'Brilliant!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 9 },
    { id: 10, title: 'Superb!', image: 'https://img.icons8.com/color/452/like', profileImg: 'https://img.icons8.com/color/452/like', profileId: 10 },
  ]

const CommentSection = ({ comments }) => {
    const [commentList, setCommentList] = useState(dummyComments);

    return (
        <div className="grid grid-cols-12 gap-2 gap-y-6 max-w-6xl my-16 mx-10">
            {Array.isArray(commentList) && commentList.length > 0 ? commentList.map((video) => (
                <div ket={video.id} className="col-span-12 sm:col-span-6 md:col-span-3">
                    <card className="w-full flex flex-col">
                        <div className="relative">
                            <Link href={`/content/${video.id}`}>
                                <img src="https://picsum.photos/seed/59/300/200" className="w-96 h-auto" />
                            </Link>
                            <p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">&lt; 1:00:00</p>
                        </div>

                        <div className="flex flex-row mt-2 gap-2 items-center">
                            {/* <!-- Profile Picture --> */}
                            <Link href={`/profile/${video.profileId}`}>
                                <img src="https://picsum.photos/seed/1/40/40" className="rounded-full max-h-10 max-w-10" />
                            </Link>

                            <Link href={`/content/${video.id}`} className="flex items-center justify center">
                                <p className="text-gray-900 dark:text-gray-100 text-sm font-semibold">{video.title}</p>
                            </Link>
                        </div>
                    </card>
                </div>
            )) : <div className="col-span-12 text-center text-gray-500 dark:text-gray-400">No comments found.</div>}
        </div>
    )
}

export default CommentSection;