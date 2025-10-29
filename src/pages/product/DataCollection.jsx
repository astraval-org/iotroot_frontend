import React from 'react';
import DevelopmentBanner from '../../components/DevelopmentBanner';

const DataCollection = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Collection</h1>
          <p className="text-gray-600">Monitor data ingestion and storage metrics.</p>
          <DevelopmentBanner />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Streams</h2>
            <div className="space-y-3">
              {[
                { name: 'Temperature Data', rate: '1.2K/min', status: 'Active' },
                { name: 'Sensor Readings', rate: '850/min', status: 'Active' },
                { name: 'Device Logs', rate: '2.1K/min', status: 'Active' }
              ].map((stream) => (
                <div key={stream.name} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{stream.name}</div>
                      <div className="text-sm text-gray-600">{stream.rate}</div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {stream.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Storage Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Storage</span>
                <span className="font-medium">1.2TB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Ingestion</span>
                <span className="font-medium">45GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Retention Period</span>
                <span className="font-medium">2 Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Compression Ratio</span>
                <span className="font-medium">3.2:1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCollection;