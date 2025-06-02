import { createContext, useContext, useState, useEffect } from 'react';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real app, you would fetch the tenant data from your API
  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        // Simulate API call
        // const response = await fetch('/api/tenants');
        // const data = await response.json();
        // setTenants(data.tenants);
        
        // For now, use a default tenant
        const defaultTenant = { id: 'default', name: 'Lawyer Portal' };
        setCurrentTenant(defaultTenant);
        setTenants([defaultTenant]);
      } catch (error) {
        console.error('Failed to fetch tenant data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, []);

  const selectTenant = (tenant) => {
    setCurrentTenant(tenant);
    // You might want to save the selected tenant in localStorage
    localStorage.setItem('currentTenant', JSON.stringify(tenant));
  };

  return (
    <TenantContext.Provider
      value={{
        tenant: currentTenant,
        tenants,
        loading,
        selectTenant,
      }}
    >
      {!loading && children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

export default TenantContext;
