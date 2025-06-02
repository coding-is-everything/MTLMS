import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { useTenant } from '../../../context/TenantContext';

export function useAuth() {
    const auth = useAuthContext();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { tenant } = useTenant();

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
                tenantId: tenant?.id
            });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/api/auth/register', {
                ...userData,
                tenantId: tenant?.id
            });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
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
        register,
        currentTenant: tenant
    };
}