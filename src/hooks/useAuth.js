// src/hooks/useAuth.js
import { useState, useContext, createContext } from 'react';
// import { useNavigate } from 'react-router-dom';

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
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem('account')) || {
        id: '',
        name: '',
        email: '',
        avatar: '',
        cover: '',
        role: ['student'],
        admin: false,
        premium: false
    })

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
                // Setting the account state
                setAccount({
                    id: data.id,
                    name: name,
                    email: email,
                    sex: sex,
                    avatar: data.avatar,
                    cover: data.cover,
                })

                // Set the account in local storage
                localStorage.setItem('account', JSON.stringify({
                    id: data.id,
                    name: name,
                    email: email,
                    avatar: data.avatar,
                    cover: data.cover,
                    role: ['student'],
                    admin: false,
                    premium: false
                }));

                // Set the access token in local storage
                localStorage.setItem('accessToken', data.accessToken);
                return 'success';
            } else return data.message;
        } catch (error) {
            console.error('Signup error:', error);
            throw error; // Re-throw to handle in the form
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://127.0.0.1/5000/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const data = await response.json();

            if (response.status === 200) {
                // Setting the account state
                setAccount({
                    id: data.id,
                    name: data.name,
                    email: email,
                    avatar: data.avatar,
                    cover: data.cover,
                    role: data.role,
                    admin: data.admin,
                    premium: data.premium,
                });

                // Set the account in local storage
                localStorage.setItem('account', JSON.stringify({
                    id: data.id,
                    name: data.name,
                    email: email,
                    avatar: data.avatar,
                    cover: data.cover,
                    role: data.role,
                    admin: data.admin,
                    premium: data.premium,
                }));

                // Update the access token in local storage
                localStorage.setItem('accessToken', data.accessToken);
            } else return data.message;
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
                        cookies: JSON.parse(localStorage.getItem('accessToken')),
                    })
                }
            )
            
            if (response.status === 200) {
                localStorage.removeItem('account');
                setAccount({
                    id: '',
                    name: '',
                    email: '',
                    avatar: '',
                    cover: '',
                    role: ['student'],
                    admin: false,
                    premium: false
                });
                window.location.reload();
            } else {
                alert('Logout failes! Please try after some time.');
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