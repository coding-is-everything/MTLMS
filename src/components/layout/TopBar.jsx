import React from 'react';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';

const TopBar = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex-1 max-w-2xl">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <div className="ml-4 flex items-center">
                    <button
                        type="button"
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <BellIcon className="h-6 w-6" />
                    </button>
                    <div className="ml-4 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">U</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;