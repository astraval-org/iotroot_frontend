import React, { useState, useEffect } from 'react';
import DevelopmentBanner from '../../components/DevelopmentBanner';

const DeviceRegistry = () => {
  const [devices, setDevices] = useState([]);
  const [clientId, setClientId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/devices', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDevices(data);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
      setDevices([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientId.trim()) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/devices', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ client_id: clientId })
      });
      
      if (response.ok) {
        setClientId('');
        setShowForm(false);
        fetchDevices();
      }
    } catch (error) {
      console.error('Error adding device:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Registry</h1>
          <p className="text-gray-600">Manage and monitor your IoT device registry.</p>
          <DevelopmentBanner />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Registered Devices</h2>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showForm ? 'Cancel' : 'Add Device'}
            </button>
          </div>
          
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client ID
                  </label>
                  <input
                    type="text"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter client ID"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          )}
          
          <div className="space-y-3">
            {devices.map((device) => (
              <div key={device.client_id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{device.client_id}</div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Registered</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistry;