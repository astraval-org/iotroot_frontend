import React from 'react';

const DeviceShadow = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Shadow</h1>
          <p className="text-gray-600">Monitor device state and shadow synchronization.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shadow States</h2>
            <div className="space-y-3">
              {[
                { device: 'Sensor-001', state: 'Synced', lastUpdate: '2 min ago' },
                { device: 'Gateway-002', state: 'Pending', lastUpdate: '5 min ago' },
                { device: 'Device-003', state: 'Synced', lastUpdate: '1 min ago' }
              ].map((shadow) => (
                <div key={shadow.device} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{shadow.device}</div>
                      <div className="text-sm text-gray-600">Last update: {shadow.lastUpdate}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      shadow.state === 'Synced' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {shadow.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shadow Properties</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature</span>
                <span className="font-medium">23.5°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Humidity</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Battery</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceShadow;