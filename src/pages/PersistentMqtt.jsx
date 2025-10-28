import React from 'react';

const PersistentMqtt = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Persistent: MQTT</h1>
          <p className="text-gray-600">Configure and monitor MQTT connections.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">MQTT Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">Connected</div>
              <div className="text-sm text-green-600">Broker Status</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-blue-600">Active Topics</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">1.2k</div>
              <div className="text-sm text-yellow-600">Messages/min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersistentMqtt;