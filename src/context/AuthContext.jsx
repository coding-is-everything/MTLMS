// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the auth context
export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize axios defaults
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Load user and tenant data on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // In a real app, you would verify the user's session here
        // For now, we'll just load any saved tenant
        const savedTenant = localStorage.getItem('currentTenant');
        if (savedTenant) {
          setCurrentTenant(JSON.parse(savedTenant));
        }
        
        // Fetch user's tenants (in a real app, this would come from an API)
        // setTenants(userTenants);
        
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  const selectTenant = async (tenantUuid) => {
    try {
      // Verify the user has access to this tenant
      const tenant = tenants.find(t => t.uuid === tenantUuid);
      if (!tenant) throw new Error('Invalid tenant selection');
      
      // Update current tenant in state and localStorage
      setCurrentTenant(tenant);
      localStorage.setItem('currentTenant', JSON.stringify(tenant));
      
      // Update axios headers
      api.defaults.headers['X-Tenant-ID'] = tenant.uuid;
      
      // Refresh tenant-specific data
      await refreshTenantData();
      
    } catch (error) {
      console.error('Tenant switch failed:', error);
      throw error;
    }
  };
  
  const refreshTenantData = async () => {
    // In a real app, this would refresh tenant-specific data
    console.log('Refreshing tenant data...');
  };
  
  const value = {
    currentUser,
    currentTenant,
    tenants,
    loading,
    selectTenant,
    api,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;