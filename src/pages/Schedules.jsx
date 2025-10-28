import React from 'react';

const Schedules = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Schedules</h1>
          <p className="text-gray-600">Manage time-based automation schedules.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Schedules</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Create Schedule
            </button>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((schedule) => (
              <div key={schedule} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Daily Backup - {schedule}</div>
                  <div className="text-sm text-gray-600">Runs every day at 2:00 AM</div>
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

export default Schedules;