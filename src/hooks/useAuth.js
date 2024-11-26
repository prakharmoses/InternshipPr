// src/hooks/useAuth.js
import { useState, useContext, createContext, useCallback } from 'react';

// Load environment variables
const { REACT_APP_EXPRESS_APP_URL: EXPRESS_APP_URL } = process.env;

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
        roles: ['student'],
        admin: false,
        premium: false
    })

    const signup = async (email, password, name, sex, confirmPassword, dob) => {
        try {
            const response = await fetch(`${EXPRESS_APP_URL}/auth/register`,
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
                        dob
                    }),
                    credentials: 'include' // Include credentials to receive cookies
                }
            )
            const data = await response.json();
            if (response.status === 201) {
                // Setting the account state
                setAccount({
                    ...account,
                    id: data.id,
                    name: name,
                    email: email,
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
                    roles: ['student'],
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
            const response = await fetch(`${EXPRESS_APP_URL}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                credentials: 'include' // Include credentials to receive cookies
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
                    roles: data.roles,
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
                    roles: data.roles,
                    admin: data.admin,
                    premium: data.premium,
                }));

                // Update the access token in local storage
                localStorage.setItem('accessToken', data.accessToken);
                return 'success';
            } else return data.message;
        } catch (error) {
            console.error('Login error:', error);
            throw error; // Re-throw to handle in the form
        }
    };

    const refresh = async () => {
        try {
            const response = await fetch(`${EXPRESS_APP_URL}/auth/refresh`, {
                method: 'GET',
                credentials: 'include' // This ensures cookies are sent along with the request
            })

            const data = await response.json();
            if (response.status === 200) {
                // Setting the new access token in local storage
                localStorage.setItem('accessToken', data.accessToken);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Refresh token error:', error);
            localStorage.removeItem('account');
            localStorage.removeItem('accessToken');
            setAccount({
                id: '',
                name: '',
                email: '',
                avatar: '',
                cover: '',
                roles: ['student'],
                admin: false,
                premium: false
            });
            window.location.href = '/login';
            throw error; // Re-throw to handle in the form
        }
    };

    const callBackendApi = useCallback(async (url, method, body) => {
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            }

            if (method !== 'GET' && body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(`${EXPRESS_APP_URL}${url}`, options);

            if (response.status === 401 || response.status === 403) {
                await refresh();
                return await callBackendApi(url, method, body);
            } else {
                return response;
            }
        } catch (error) {
            console.error('API call error: ', error);
            throw new Error('API call error, failed to interact with backend.');
        }
    }, []);

    const logout = async () => {
        try {
            const response = await fetch(`${EXPRESS_APP_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include' // This ensures cookies are sent along with the request
            });

            if (response.status === 200) {
                localStorage.removeItem('account');
                setAccount({
                    id: '',
                    name: '',
                    email: '',
                    avatar: '',
                    cover: '',
                    roles: ['student'],
                    admin: false,
                    premium: false
                });
                window.location.href = '/login';
            } else {
                alert('Logout failes! Please try after some time.');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const updateAccessParameters = async ({ accessTokenNew, rolesNew, newEmail }) => {
        try {
            setAccount({
                ...account,
                roles: rolesNew,
                admin: rolesNew.indexOf('admin') !== -1,
                email: newEmail
            });
            localStorage.setItem('account', JSON.stringify({
                id: account.id,
                name: account.name,
                email: newEmail,
                avatar: account.avatar,
                cover: account.cover,
                roles: rolesNew,
                admin: rolesNew.indexOf('admin') !== -1,
                premium: account.premium
            }));
            localStorage.setItem('accessToken', accessTokenNew);
        } catch (error) {
            console.error('Update role error:', error);
        }
    }

    const updateProfileInfo = async ({ name, avatar, cover, email }) => {
        try {
            setAccount({
                ...account,
                name,
                avatar,
                cover,
                email
            });
            localStorage.setItem('account', JSON.stringify({
                id: account.id,
                name: name,
                email: email,
                avatar: avatar,
                cover: cover,
                roles: account.roles,
                admin: account.admin,
                premium: account.premium
            }));
        } catch (error) {
            console.error('Update profile info error:', error);
        }
    }

    return {
        account,
        updateAccessParameters,
        updateProfileInfo,
        signup,
        login,
        refresh,
        callBackendApi,
        logout,
    };
}