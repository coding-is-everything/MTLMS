import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import TenantSwitcherModal from './TenantSwitcherModal';
import { BuildingOffice2Icon, ChevronDownIcon } from '@heroicons/react/24/outline';

const TenantSelector = () => {
    const { currentTenant, tenants } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!currentTenant || tenants.length <= 1) return null;

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
                data-testid="tenant-selector"
            >
                <div className="flex items-center">
                    <BuildingOffice2Icon className="h-5 w-5 mr-2 text-gray-300" />
                    <div className="text-left">
                        <p className="text-sm font-medium text-white truncate max-w-[160px]">
                            {currentTenant.name}
                        </p>
                        <p className="text-xs text-gray-400">Current Firm</p>
                    </div>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </div>

            <TenantSwitcherModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default TenantSelector;