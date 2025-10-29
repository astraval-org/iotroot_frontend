import React from 'react';
import DevelopmentBanner from '../../components/DevelopmentBanner';

const DeviceRegistry = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Registry</h1>
          <p className="text-gray-600">Manage and monitor your IoT device registry.</p>
          <DevelopmentBanner />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Registered Devices</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Add Device
            </button>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((device) => (
              <div key={device} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Device {device}</div>
                  <div className="text-sm text-gray-600">ID: device-{device}</div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistry;