// src/components/LoginForm.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function ForgotPassword() {
    // Define states
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(null);

    // Define functions
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { REACT_APP_EXPRESS_APP_URL: EXPRESS_APP_URL } = process.env;

        try {
            const response = await fetch(`${EXPRESS_APP_URL}/auth/send-reset-password-email/${email}`, {
                credentials: 'include'
            });
            const data = await response.json();

            if (response.status === 200) {
                setEmailSent(true);
                setTimer(30);
                const interval = setInterval(() => {
                    setTimer((prev) => prev - 1);
                }, 1000);
                setTimeout(() => {
                    clearInterval(interval);
                }, 30000);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Login failed.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (emailSent === true) {
            const timer = setTimeout(() => {
                setEmailSent(false);
            }, 30000);
            return () => clearTimeout(timer);
        }
    
    }, [emailSent])

    return (
        <main className="flex flex-wrap">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
                    <Link to="/" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"> Angirasoft </Link>
                </div>
                <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
                    <p className="text-center text-3xl font-bold text-stone-800">Welcome back</p>
                    <p className="mt-2 text-center text-gray-500">Forgot password! No worries, here we are to help...</p>

                    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                        <div className="mb-12 flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <input
                                    type="email"
                                    id="login-email"
                                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 ${emailSent || loading ? 'opacity-50' : 'hover:bg-gray-800'}`}
                            disabled={emailSent || loading}
                        >{loading ? 'Sending...' : 'Submit'}</button>
                        {emailSent && (
                            <div className="text-green-600 text-3xl mt-4">
                                Check your inbox! Password reset email sent. Resend available in {timer}s.
                            </div>
                        )}
                    </form>

                    <div className="pt-12 text-center">
                        <p className="whitespace-nowrap text-gray-600">
                            Don't have an account? &nbsp;
                            <Link to="/signup" className="underline-offset-4 font-semibold text-gray-900 underline">Sign up for free.</Link>
                        </p>
                    </div>
                    <div className="pt-2 text-center">
                        <p className="whitespace-nowrap text-gray-600">
                            Remembered the password! &nbsp;
                            <Link to="/signup" className="underline-offset-4 font-semibold text-gray-900 underline">Sign in</Link>
                        </p>
                    </div>
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