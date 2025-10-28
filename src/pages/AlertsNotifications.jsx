import React from 'react';

const AlertsNotifications = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
          <p className="text-gray-600">Configure notification channels and alert rules.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h2>
            <div className="space-y-3">
              {[
                { name: 'Email', status: 'Active', icon: '📧' },
                { name: 'SMS', status: 'Active', icon: '📱' },
                { name: 'Webhook', status: 'Inactive', icon: '🔗' }
              ].map((channel) => (
                <div key={channel.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span>{channel.icon}</span>
                    <span className="font-medium text-gray-900">{channel.name}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    channel.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {channel.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((alert) => (
                <div key={alert} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-medium text-red-900">Critical Alert {alert}</div>
                  <div className="text-sm text-red-600">Device temperature exceeded threshold</div>
                  <div className="text-xs text-red-500 mt-1">5 minutes ago</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsNotifications;