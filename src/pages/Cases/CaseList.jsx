import React from 'react';
import { Link } from 'react-router-dom';

const CaseList = () => {
    const cases = [
        { id: 'CASE-001', title: 'Johnson vs. Smith', status: 'Active', lastUpdated: '2023-06-01', client: 'John Johnson' },
        { id: 'CASE-002', title: 'State vs. Williams', status: 'Hearing', lastUpdated: '2023-05-30', client: 'State' },
        { id: 'CASE-003', title: 'Doe v. Roe', status: 'Discovery', lastUpdated: '2023-05-28', client: 'Jane Doe' },
    ];

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Cases</h1>
                <Link
                    to="/cases/new"
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    New Case
                </Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Case ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Updated
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cases.map((caseItem) => (
                            <tr key={caseItem.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {caseItem.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {caseItem.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {caseItem.client}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${caseItem.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                          caseItem.status === 'Hearing' ? 'bg-yellow-100 text-yellow-800' : 
                                          'bg-blue-100 text-blue-800'}`}>
                                        {caseItem.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {caseItem.lastUpdated}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link to={`/cases/${caseItem.id}`} className="text-primary-600 hover:text-primary-900 mr-4">
                                        View
                                    </Link>
                                    <Link to={`/cases/${caseItem.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CaseList;