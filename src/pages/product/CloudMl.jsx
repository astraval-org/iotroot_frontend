import React from 'react';
import DevelopmentBanner from '../../components/DevelopmentBanner';

const CloudMl = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cloud ML</h1>
          <p className="text-gray-600">Train and deploy machine learning models in the cloud.</p>
          <DevelopmentBanner />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Training Jobs</h2>
            <div className="space-y-3">
              {[
                { name: 'Sensor Data Analysis', status: 'Running' },
                { name: 'Device Behavior Model', status: 'Completed' },
                { name: 'Energy Optimization', status: 'Queued' }
              ].map((job) => (
                <div key={job.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{job.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    job.status === 'Running' ? 'bg-blue-100 text-blue-700' :
                    job.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h2>
            <div className="space-y-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">96.8%</div>
                <div className="text-sm text-purple-600">Model Accuracy</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">2.1K</div>
                <div className="text-sm text-orange-600">Predictions/Hour</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudMl;