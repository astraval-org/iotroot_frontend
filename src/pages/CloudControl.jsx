import React from 'react';

const CloudControl = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cloud Control</h1>
          <p className="text-gray-600">Centralized cloud-based control and orchestration.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Global Policies</h2>
            <div className="space-y-3">
              {[
                { policy: 'Security Policy', scope: 'Global', status: 'Active' },
                { policy: 'Data Retention', scope: 'Regional', status: 'Active' },
                { policy: 'Access Control', scope: 'Global', status: 'Pending' }
              ].map((policy) => (
                <div key={policy.policy} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{policy.policy}</div>
                      <div className="text-sm text-gray-600">Scope: {policy.scope}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      policy.status === 'Active' ? 'bg-green-100 text-green-700' :
                      policy.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Orchestration</h2>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-blue-600">Managed Devices</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">23</div>
                <div className="text-sm text-purple-600">Active Workflows</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">98.9%</div>
                <div className="text-sm text-orange-600">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudControl;