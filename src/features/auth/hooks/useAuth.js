import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '../../../context/AuthContext';
import axios from 'axios';

export function useAuth() {
    const auth = useAuthContext();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
                tenantId: auth.currentTenant?.id
            });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return { 
        user: user || auth.currentUser, 
        login, 
        logout,
        currentTenant: auth.currentTenant
    };
}