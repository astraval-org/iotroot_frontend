import React from 'react';

const DeviceTwin = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Twin</h1>
          <p className="text-gray-600">Manage digital twins and device synchronization.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Twin Status</h2>
            <div className="space-y-3">
              {[
                { name: 'Physical State', status: 'Synced', color: 'green' },
                { name: 'Digital State', status: 'Synced', color: 'green' },
                { name: 'Configuration', status: 'Updating', color: 'yellow' }
              ].map((twin) => (
                <div key={twin.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{twin.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full bg-${twin.color}-100 text-${twin.color}-700`}>
                    {twin.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Twin Properties</h2>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900">Model Version</div>
                <div className="text-sm text-blue-700">v2.1.0</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-900">Last Sync</div>
                <div className="text-sm text-purple-700">2 minutes ago</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-900">Health Score</div>
                <div className="text-sm text-green-700">98/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceTwin;