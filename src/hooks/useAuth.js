// src/hooks/useAuth.js
import { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAccount = () => {
    return useContext(AuthContext);
};

function useProvideAuth() {
    const navigate = useNavigate();
    // const [account, setAccount] = useState(JSON.parse(localStorage.getItem('account')) || {
    //     id: '1',
    //     name: 'John Doe',
    //     email: 'johndoe@gmail.com',
    //     jwtToken: 'eyJhbGci',
    //     role: 'Student',
    //     admin: false,
    //     premium: false,
    // });
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem('account')) || {
        id: '',
        name: '',
        email: '',
        jwtToken: '',
        avatar: '',
        cover: '',
        role: 'student',
        admin: false,
        premium: false
    })
    console.log("The account from local storage is: ", JSON.parse(localStorage.getItem('account')))

    const signup = async (email, password, name, sex, confirmPassword) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        name,
                        sex,
                        confirmPassword,
                    })
                }
            )
            const data = await response.json();
            if (response.status === 201) {
                setAccount({
                    id: data.id,
                    name: name,
                    email: email,
                    jwtToken: data.accessToken,
                    sex: sex,
                    avatar: data.avatar,
                    cover: data.cover,
                })
                localStorage.setItem('account', JSON.stringify({
                    id: data.id,
                    name: name,
                    email: email,
                    jwtToken: data.accessToken,
                    avatar: data.avatar,
                    cover: data.cover,
                    role: 'student',
                    admin: false,
                    premium: false
                }));
                return 'success';
            }
            else return data.message;
        } catch (error) {
            console.error('Signup error:', error);
            throw error; // Re-throw to handle in the form
        }
    };

    const login = async (email, password) => {
        try {
            // Implement login logic here (e.g., API call)
            // Example:
            // const response = await api.login({ email, password });
            // setUser(response.data.user);
            // setAccount({ email, id, name, jwtToken, role, admin, premium });
            return account;
        } catch (error) {
            console.error('Login error:', error);
            throw error; // Re-throw to handle in the form
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/auth/logout',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cookies: account.jwtToken,
                    })
                }
            )
            if (response.status === 200) {
                localStorage.removeItem('account');
                setAccount({
                    id: '',
                    name: '',
                    email: '',
                    jwtToken: '',
                    role: false,
                    admin: false,
                    premium: false,
                });
                window.location.reload();
            } else {
                alert('Logout failes!');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return {
        account,
        signup,
        login,
        logout,
    };
}