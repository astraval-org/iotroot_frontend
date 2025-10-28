import React from 'react';

const EdgeControl = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Edge Control</h1>
          <p className="text-gray-600">Manage edge computing and local control systems.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Edge Nodes</h2>
            <div className="space-y-3">
              {[
                { name: 'Edge Gateway 1', status: 'Online', load: '23%' },
                { name: 'Edge Gateway 2', status: 'Online', load: '45%' },
                { name: 'Edge Gateway 3', status: 'Offline', load: '0%' }
              ].map((node) => (
                <div key={node.name} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{node.name}</div>
                      <div className="text-sm text-gray-600">CPU Load: {node.load}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      node.status === 'Online' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Control Rules</h2>
            <div className="space-y-3">
              {[
                { rule: 'Temperature Control', active: true },
                { rule: 'Power Management', active: true },
                { rule: 'Security Protocol', active: false }
              ].map((rule) => (
                <div key={rule.rule} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{rule.rule}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rule.active 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {rule.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeControl;