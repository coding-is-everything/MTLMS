import React from 'react';

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900">Welcome to LawFirmPro</h1>
                <p className="mt-2 text-gray-600">Your legal practice management dashboard</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">Active Cases</h3>
                    <p className="mt-2 text-3xl font-bold text-primary-600">12</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">Upcoming Hearings</h3>
                    <p className="mt-2 text-3xl font-bold text-primary-600">5</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">New Messages</h3>
                    <p className="mt-2 text-3xl font-bold text-primary-600">3</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                        <p className="text-sm text-gray-600">New case filed: Johnson vs. Smith</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                        <p className="text-sm text-gray-600">Upcoming hearing: State vs. Williams</p>
                        <p className="text-xs text-gray-500 mt-1">Tomorrow, 10:00 AM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;