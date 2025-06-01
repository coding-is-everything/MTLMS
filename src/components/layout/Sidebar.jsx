import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    BriefcaseIcon,
    UserGroupIcon,
    CalendarIcon,
    DocumentTextIcon,
    CogIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
    const navItems = [
        { name: 'Cases', icon: BriefcaseIcon, path: '/cases' },
        { name: 'Clients', icon: UserGroupIcon, path: '/clients' },
        { name: 'Calendar', icon: CalendarIcon, path: '/calendar' },
        { name: 'Documents', icon: DocumentTextIcon, path: '/documents' },
        { name: 'Settings', icon: CogIcon, path: '/settings' },
        { name: 'Logout', icon: ArrowLeftOnRectangleIcon, path: '/logout' }
    ];

    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-xl font-bold border-b border-grey-700">
                LawFirmPro
            </div>

            <nav className="flex-1 py-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `flex items-center px-6 py-3 transition-colors ${isActive
                                ? 'bg-primary-500 text-white'
                                : 'text-gray-300 hover:bg-gray-700'
                            }`
                        }
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
            {/* Tenant Selector removed - Component not defined */}
        </div>
    );
};

export default Sidebar;