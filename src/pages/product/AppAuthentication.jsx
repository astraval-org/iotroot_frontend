import React from 'react';
import DevelopmentBanner from '../../components/DevelopmentBanner';

const AppAuthentication = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">App Authentication</h1>
          <p className="text-gray-600">Manage application authentication and user access control.</p>
          <DevelopmentBanner />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">OAuth2 Integration</h2>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Google OAuth</div>
                <div className="text-sm text-gray-600">Status: Active</div>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">GitHub OAuth</div>
                <div className="text-sm text-gray-600">Status: Active</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">JWT Tokens</h2>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">Active Sessions</div>
              <div className="text-sm text-blue-600">12 users currently authenticated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppAuthentication;