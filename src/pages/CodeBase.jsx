import React from 'react';

const CodeBase = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Code Base</h1>
          <p className="text-gray-600">Manage firmware code repositories and versions.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Repositories</h2>
            <div className="space-y-3">
              {[
                { name: 'sensor-firmware', version: 'v2.1.0' },
                { name: 'gateway-code', version: 'v1.8.3' },
                { name: 'device-drivers', version: 'v3.0.1' }
              ].map((repo) => (
                <div key={repo.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{repo.name}</div>
                    <div className="text-sm text-gray-600">Latest: {repo.version}</div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Commits</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((commit) => (
                <div key={commit} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">Fix sensor calibration</div>
                  <div className="text-sm text-gray-600">by developer@iotroot.com</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBase;