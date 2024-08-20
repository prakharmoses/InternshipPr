import React, { useState, createContext, useContext } from 'react';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem('account')) || {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'Student',
        admin: false,
        premium: false,
    });

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    );
}

export const useAccount = () => {
    const context = useContext(AccountContext);

    if (!context) {
        throw new Error('useAccount must be used within an AccountProvider');
    }

    return context;
}