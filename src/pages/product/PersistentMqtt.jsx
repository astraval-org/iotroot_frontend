import React, { useState, useEffect } from 'react';
import DevelopmentBanner from '../../components/DevelopmentBanner';

const PersistentMqtt = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [topics, setTopics] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);
  const [editPublishTopics, setEditPublishTopics] = useState('');
  const [editSubscribeTopics, setEditSubscribeTopics] = useState('');

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
    }
  };

  const validateTopics = (topicString) => {
    const errors = [];
    const topicList = topicString.split(',').map(t => t.trim()).filter(t => t);
    
    if (topicList.length === 0) {
      errors.push('At least one topic is required');
      return { valid: false, errors };
    }

    const validTopics = [];
    topicList.forEach((topic, index) => {
      if (!topic) {
        errors.push(`Topic ${index + 1} cannot be empty`);
        return;
      }
      
      if (topic.includes(' ')) {
        errors.push(`Topic "${topic}" cannot contain spaces`);
        return;
      }
      
      if (topic.startsWith('/') || topic.endsWith('/')) {
        errors.push(`Topic "${topic}" cannot start or end with /`);
        return;
      }
      
      validTopics.push(`iet/${topic}`);
    });

    return { valid: errors.length === 0, errors, validTopics };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDevice || !topics.trim()) return;
    
    const validation = validateTopics(topics);
    setErrors(validation.errors);
    
    if (!validation.valid) return;
    
    const topicPatterns = validation.validTopics.map(topic => ({ pattern: topic }));
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/devices/${selectedDevice}/topics`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          publishTopics: topicPatterns,
          subscribeTopics: topicPatterns
        })
      });
      
      if (response.ok) {
        setTopics('');
        setSelectedDevice('');
        setErrors([]);
        fetchDevices();
        alert('Topics updated successfully');
      }
    } catch (error) {
      console.error('Error updating topics:', error);
    }
    setLoading(false);
  };

  const parseTopics = (publishAcl) => {
    if (!publishAcl) return [];
    try {
      const topics = JSON.parse(publishAcl);
      return topics.map(t => t.pattern.replace('iet/', '')).join(', ');
    } catch {
      return '';
    }
  };

  const handleEditTopics = (device) => {
    setEditingDevice(device.client_id);
    setEditPublishTopics(parseTopics(device.publishAcl));
    setEditSubscribeTopics(parseTopics(device.subscribeAcl));
  };

  const handleSaveTopics = async (clientId) => {
    const publishValidation = validateTopics(editPublishTopics);
    const subscribeValidation = validateTopics(editSubscribeTopics);
    
    const allErrors = [...publishValidation.errors, ...subscribeValidation.errors];
    if (allErrors.length > 0) {
      setErrors(allErrors);
      return;
    }
    
    const publishPatterns = publishValidation.validTopics.map(topic => ({ pattern: topic }));
    const subscribePatterns = subscribeValidation.validTopics.map(topic => ({ pattern: topic }));
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/devices/${clientId}/topics`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          publishTopics: publishPatterns,
          subscribeTopics: subscribePatterns
        })
      });
      
      if (response.ok) {
        setEditingDevice(null);
        setEditPublishTopics('');
        setEditSubscribeTopics('');
        setErrors([]);
        fetchDevices();
      }
    } catch (error) {
      console.error('Error updating topics:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Persistent: MQTT</h1>
          <p className="text-gray-600">Configure MQTT topics for devices.</p>
          <DevelopmentBanner />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Configure Device Topics</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Device
              </label>
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose a device...</option>
                {devices.map((device) => (
                  <option key={device.client_id} value={device.client_id}>
                    {device.client_id}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topics (comma-separated)
              </label>
              <input
                type="text"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., user3, home/new, my/#"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter topics without 'iet/' prefix. Examples: user3, home/new, my/#
              </p>
            </div>
            
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <ul className="text-sm text-red-600 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Topics'}
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Topics</h2>
          
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.client_id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{device.client_id}</h3>
                    
                    {editingDevice === device.client_id ? (
                      <div className="mt-2 space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Publish Topics</label>
                          <input
                            type="text"
                            value={editPublishTopics}
                            onChange={(e) => setEditPublishTopics(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., user3, home/new, my/#"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Subscribe Topics</label>
                          <input
                            type="text"
                            value={editSubscribeTopics}
                            onChange={(e) => setEditSubscribeTopics(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., user3, home/new, my/#"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveTopics(device.client_id)}
                            disabled={loading}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingDevice(null)}
                            className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-600">
                          Publish: {parseTopics(device.publishAcl) || 'No topics configured'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Subscribe: {parseTopics(device.subscribeAcl) || 'No topics configured'}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {editingDevice !== device.client_id && (
                    <button
                      onClick={() => handleEditTopics(device)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersistentMqtt;