import React from 'react';
import DevelopmentBanner from '../../components/DevelopmentBanner';

const Thing = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thing</h1>
          <p className="text-gray-600">Manage IoT things and their properties.</p>
          <DevelopmentBanner />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thing Properties</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature</span>
                <span className="font-medium">23°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Humidity</span>
                <span className="font-medium">65%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
            <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Update Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thing;