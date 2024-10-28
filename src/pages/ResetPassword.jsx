// src/components/LoginForm.jsx
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const { passwordToken } = useParams();
    const navigate = useNavigate();

    // Define states
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState(false);

    // Define functions
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { REACT_APP_EXPRESS_APP_URL: EXPRESS_APP_URL } = process.env;

        try {
            const response = await fetch(`${EXPRESS_APP_URL}/auth/resetPassword/${passwordToken}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password,
                    confirmPassword,
                }),
                credentials: 'include'
            });
            const data = await response.json();

            if (response.status === 200) {
                setPasswordStatus(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Password reset failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-wrap">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
                    <Link to="/" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"> Angirasoft </Link>
                </div>
                <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
                    <p className="text-center text-3xl font-bold text-stone-800">Welcome back</p>
                    <p className="mt-2 text-center text-gray-500">Reset the new password down below, and be on track...</p>

                    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleResetPassword}>
                        <div className="flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-12 flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 ${loading ? 'opacity-50' : 'hover:bg-gray-800'}`}
                            disabled={loading}
                        >{loading ? 'Email sent...' : 'Submit'}</button>
                        {passwordStatus && (
                            <div className="text-green-600 font-bold text-xl mt-4">
                                Password reset successful! Redirecting to login page...
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
                <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
                    <p className="mb-8 text-3xl font-semibold leading-10">Education is not the filling of a pail, but the lighting of a fire. Thus a great coach can change a game. “A good coach can change a life.”</p>
                    <p className="mb-4 text-3xl font-semibold">Adbhut Dwivedi</p>
                    <p className="">Founder, Angirasoft</p>
                    <p className="mb-7 text-sm opacity-70">Coaching Institution</p>
                </div>
                <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt='' />
            </div>
        </main>
    );
}