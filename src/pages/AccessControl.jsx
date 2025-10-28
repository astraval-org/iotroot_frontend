import React from 'react';

const AccessControl = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Control</h1>
          <p className="text-gray-600">Manage user permissions and access policies.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Role-Based Access</h2>
            <div className="space-y-3">
              {['Admin', 'Developer', 'Viewer'].map((role) => (
                <div key={role} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{role}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Active</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Read Access</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Write Access</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Admin Access</span>
                <span className="text-red-600">✗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;