import React from 'react';

const Triggers = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Triggers</h1>
          <p className="text-gray-600">Configure event-based automation triggers.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Triggers</h2>
            <div className="space-y-3">
              {['Temperature Alert', 'Device Offline', 'Battery Low'].map((trigger) => (
                <div key={trigger} className="p-3 border border-gray-200 rounded-lg">
                  <div className="font-medium text-gray-900">{trigger}</div>
                  <div className="text-sm text-gray-600">Last triggered: 2 hours ago</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Trigger Stats</h2>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">24</div>
                <div className="text-sm text-green-600">Active Triggers</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-blue-600">Triggered Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Triggers;