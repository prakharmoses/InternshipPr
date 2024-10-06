// src/components/SignupForm.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importing hooks
import { useAccount } from '../hooks/useAuth';

export default function SignupForm() {
    const navigate = useNavigate();
    const { signup } = useAccount();

    // Defining States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        if (sex === '') return alert('Please select the sex first!');
        
        try {
            const res = await signup(email, password, name, sex, confirmPassword);
            if (res === 'success') navigate('/');
            else alert(res);
        } catch (error) {
            console.error(error);
            alert('Signup failed.');
        }
    };

    return (
        <main className="flex flex-wrap">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
                    <Link to="/" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"> Angirasoft </Link>
                </div>
                <div className="lg:w-[28rem] mx-auto my-auto mt-[10vh] flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
                    <p className="text-center text-3xl font-bold text-stone-800">Welcome</p>
                    <p className="mt-2 text-center text-gray-500">Please enter your details.</p>

                    <button
                        onClick={() => alert('Google login coming soon!')}
                        className="-2 mt-8 flex items-center justify-center text-black rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"
                    >
                        <img className="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt />
                        Sign up with Google
                    </button>

                    <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                        <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
                    </div>

                    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSignup}>
                        <div className="flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <input
                                    type="texr"
                                    id="user-name"
                                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <input
                                    type="email"
                                    id="user-email"
                                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <select
                                    id="user-sex"
                                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                >
                                    <option value="" disabled>Select Sex</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <input
                                    type="password"
                                    id="user-password"
                                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-12 flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <input
                                    type="password"
                                    id="user-password-confirm"
                                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
                        >Sign Up</button>
                    </form>

                    <div className="py-12 pb-0 text-center">
                        <p className="whitespace-nowrap text-gray-600">
                            Already have an account? &nbsp;
                            <Link to="/login" className="underline-offset-4 font-semibold text-gray-900 underline">Sign in</Link>
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
                <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            </div>
        </main>
    );
}