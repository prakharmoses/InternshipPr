import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import Hooks
import { useAccount } from '../hooks/useAuth';

const dummyLikes = [
    { id: 1, title: 'JavaScript', image: 'https://img.icons8.com/color/452/javascript.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 1 },
    { id: 2, title: 'React', image: 'https://img.icons8.com/color/452/react-native.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 2 },
    { id: 3, title: 'Node.js', image: 'https://img.icons8.com/color/452/nodejs.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 3 },
    { id: 4, title: 'Express', image: 'https://img.icons8.com/color/452/express.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 4 },
    { id: 5, title: 'MongoDB', image: 'https://img.icons8.com/color/452/mongodb.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 5 },
    { id: 6, title: 'Python', image: 'https://img.icons8.com/color/452/python.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 6 },
    { id: 7, title: 'Django', image: 'https://img.icons8.com/color/452/django.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 7 },
    { id: 8, title: 'Flask', image: 'https://img.icons8.com/color/452/flask.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 8 },
    { id: 9, title: 'PostgreSQL', image: 'https://img.icons8.com/color/452/postgreesql.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 9 },
    { id: 10, title: 'SQLite', image: 'https://img.icons8.com/color/452/sql.png', profileImg: 'https://img.icons8.com/color/452/like', profileId: 10 },
]

const LikesSection = ({ userId }) => {
    const { callBackendApi } = useAccount();
    
    // Define states
    const [likesList, setLikesList] = useState(dummyLikes);

    // Fetching likes list
    useEffect(() => {
        const fetchLikesList = async () => {
            try {
                const response = await callBackendApi(`/content/getLikedContent/${userId}`);
                const data = await response.json();

                if (response.status === 200) {
                    setLikesList(data);
                } else {
                    setLikesList([]);
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error(`Some error occured:\n${error}`);
            }
        }

        fetchLikesList();
    }, [])
    
    return (
        <div className="grid grid-cols-12 gap-2 gap-y-6 max-w-6xl my-16 mx-10">
            {Array.isArray(likesList) && likesList.length > 0 ? likesList.map((content) => (
                <div ket={content.id} className="col-span-12 sm:col-span-6 md:col-span-3">
                    <card className="w-full flex flex-col">
                        <div className="relative">
                            <Link to={`/content/${content.id}`}>
                                <img src={content.image} className="w-96 h-auto" />
                            </Link>
                            <p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">&lt; 1:00:00</p>
                        </div>

                        <div className="flex flex-row mt-2 gap-2 items-center">
                            <Link to={`/profile/${content.profileId}`}>
                                <img src={content.profileImg} className="rounded-full max-h-10 max-w-10" />
                            </Link>

                            <Link to={`/content/${content.id}`} className="flex items-center justify center">
                                <p className="text-gray-900 dark:text-gray-100 text-sm font-semibold">{content.title}</p>
                            </Link>
                        </div>
                    </card>
                </div>
            )) : <div className="col-span-12 text-center text-gray-500 dark:text-gray-400">No liked contents found.</div>}
        </div>
    )
}

export default LikesSection;