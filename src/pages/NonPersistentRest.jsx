import React from 'react';

const NonPersistentRest = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Non-Persistent: REST APIs</h1>
          <p className="text-gray-600">Manage REST API endpoints and configurations.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Endpoints</h2>
          <div className="space-y-3">
            {['GET /devices', 'POST /devices', 'PUT /devices/:id'].map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <code className="text-sm font-mono text-gray-700">{endpoint}</code>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonPersistentRest;