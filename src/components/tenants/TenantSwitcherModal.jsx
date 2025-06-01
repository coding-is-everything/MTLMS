import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { XMarkIcon, CheckIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';

const TenantSwitcherModal = ({ isOpen, onClose }) => {
    const auth = useAuth();
    const [isSwitching, setIsSwitching] = useState(false);
    
    // Safely access properties with optional chaining and provide defaults
    const currentTenant = auth?.currentTenant;
    const tenants = auth?.tenants || [];
    const selectTenant = auth?.selectTenant || (() => {});

    const handleSelectTenant = async (tenantUuid) => {
        if (tenantUuid === currentTenant?.uuid) {
            onClose();
            return;
        }

        try {
            setIsSwitching(true);
            await selectTenant(tenantUuid);
            onClose();
        } catch (error) {
            console.error('Failed to switch tenant:', error);
        } finally {
            setIsSwitching(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-white"
                                    >
                                        Switch Law Firm
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-white"
                                        onClick={onClose}
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm text-gray-300 mb-4">
                                        Select a law firm to switch to
                                    </p>
                                    
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {tenants.length === 0 ? (
                                            <p className="text-sm text-gray-400 text-center py-4">
                                                No law firms available
                                            </p>
                                        ) : (
                                            tenants.map((tenant) => (
                                                <button
                                                    key={tenant.uuid}
                                                    type="button"
                                                    onClick={() => handleSelectTenant(tenant.uuid)}
                                                    disabled={isSwitching}
                                                    className={`w-full flex items-center p-3 rounded-md text-left transition-colors ${
                                                        currentTenant?.uuid === tenant.uuid
                                                            ? 'bg-primary-600 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700'
                                                    }`}
                                                >
                                                    <BuildingOffice2Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">
                                                            {tenant.name}
                                                        </p>
                                                        <p className="text-xs text-gray-300 truncate">
                                                            {tenant.domain || 'No domain specified'}
                                                        </p>
                                                    </div>
                                                    {currentTenant?.uuid === tenant.uuid && (
                                                        <CheckIcon className="h-5 w-5 text-white flex-shrink-0" />
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </div>

                                    {isSwitching && (
                                        <div className="mt-4 text-sm text-gray-400 text-center">
                                            Switching law firm...
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700">
                                    <button
                                        type="button"
                                        className="text-primary-500 hover:text-primary-400 text-sm font-medium"
                                    >
                                        + Request New Firm Access
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TenantSwitcherModal;