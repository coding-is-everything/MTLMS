import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTenant } from '../../../context/TenantContext';

export default function useDashboardMetrics() {
    const { tenant } = useTenant();
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/dashboard/metrics/tenantId=${tenant.id}`);
                setMetrics(response.data);
            } catch (err) {
                setError(err.message || 'Failed to load dashboard metrics.');
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, [tenant.id]);

    return { metrics, loading, error };
}