import React from 'react';

const EdgeMl = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Edge ML</h1>
          <p className="text-gray-600">Deploy and manage machine learning models on edge devices.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Deployed Models</h2>
            <div className="space-y-3">
              {['Image Classification', 'Anomaly Detection', 'Predictive Maintenance'].map((model) => (
                <div key={model} className="p-3 border border-gray-200 rounded-lg">
                  <div className="font-medium text-gray-900">{model}</div>
                  <div className="text-sm text-gray-600">Accuracy: 94.2%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Inference Time</span>
                <span className="font-medium">15ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Memory Usage</span>
                <span className="font-medium">128MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CPU Usage</span>
                <span className="font-medium">23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeMl;