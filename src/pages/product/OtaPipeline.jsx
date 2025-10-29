import React from 'react';
import DevelopmentBanner from '../../components/DevelopmentBanner';

const OtaPipeline = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">OTA Pipeline</h1>
          <p className="text-gray-600">Manage over-the-air firmware updates and deployments.</p>
          <DevelopmentBanner />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Deployments</h2>
            <div className="space-y-3">
              {[
                { name: 'Firmware v2.1.0', progress: 75, devices: 120 },
                { name: 'Security Patch v1.8.4', progress: 100, devices: 85 },
                { name: 'Feature Update v3.0.0', progress: 25, devices: 200 }
              ].map((deployment) => (
                <div key={deployment.name} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-gray-900">{deployment.name}</div>
                    <div className="text-sm text-gray-600">{deployment.progress}%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${deployment.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">{deployment.devices} devices</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Deployment Stats</h2>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-green-600">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">405</div>
                <div className="text-sm text-blue-600">Total Devices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtaPipeline;