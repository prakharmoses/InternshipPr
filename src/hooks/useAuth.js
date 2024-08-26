// src/hooks/useAuth.js
import { useState, useContext, createContext } from 'react';

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
        id: '1',
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        jwtToken: 'eyJhbGci',
        role: 'Student',
        admin: false,
        premium: false,
    });

    const signup = async (email, password) => {
        try {
            // Implement signup logic here (e.g., API call)
            // Example:
            // const response = await api.signup({ email, password });
            // setUser(response.data.user);
            // setAccount({ email, id, name, jwtToken, role, admin, premium });
            return account;
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
            // Implement logout logic here (e.g., API call)
            setAccount({
                id: '',
                name: '',
                email: '',
                jwtToken: '',
                role: '',
                admin: false,
                premium: false,
            });
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