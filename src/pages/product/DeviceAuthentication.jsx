import React from 'react';
import DevelopmentBanner from '../../components/DevelopmentBanner';

const DeviceAuthentication = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Authentication</h1>
          <p className="text-gray-600">Manage device authentication and security certificates.</p>
          <DevelopmentBanner />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Certificates</h2>
            <div className="space-y-3">
              {[1, 2].map((cert) => (
                <div key={cert} className="p-3 border border-gray-200 rounded-lg">
                  <div className="font-medium text-gray-900">Certificate {cert}</div>
                  <div className="text-sm text-gray-600">Expires: 2024-12-31</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Status</h2>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">Secure</div>
              <div className="text-sm text-green-600">All devices authenticated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceAuthentication;