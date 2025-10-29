import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import Overview from './Overview';
import DeviceRegistry from './product/DeviceRegistry';
import Thing from './product/Thing';
import PersistentMqtt from './product/PersistentMqtt';
import NonPersistentRest from './product/NonPersistentRest';
import DeviceAuthentication from './product/DeviceAuthentication';
import AppAuthentication from './product/AppAuthentication';
import AccessControl from './product/AccessControl';
import Schedules from './product/Schedules';
import Triggers from './product/Triggers';
import AlertsNotifications from './product/AlertsNotifications';
import EdgeMl from './product/EdgeMl';
import CloudMl from './product/CloudMl';
import CodeBase from './product/CodeBase';
import OtaPipeline from './product/OtaPipeline';
import DeviceShadow from './product/DeviceShadow';
import DeviceTwin from './product/DeviceTwin';
import DataCollection from './product/DataCollection';
import EdgeControl from './product/EdgeControl';
import CloudControl from './product/CloudControl';

const MainDashboard = ({ userId, email, onLogout }) => {
  const navigate = useNavigate();
  const { section } = useParams();
  const [activeSection, setActiveSection] = useState(section || 'overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(true);

  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
  }, [section]);

  const handleSectionChange = (newSection) => {
    setActiveSection(newSection);
    navigate(`/dashboard/${newSection}`);
  };



  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'device-registry': return <DeviceRegistry />;
      case 'thing': return <Thing />;
      case 'persistent-mqtt': return <PersistentMqtt />;
      case 'non-persistent-rest': return <NonPersistentRest />;
      case 'device-authentication': return <DeviceAuthentication />;
      case 'app-authentication': return <AppAuthentication />;
      case 'access-control': return <AccessControl />;
      case 'schedules': return <Schedules />;
      case 'triggers': return <Triggers />;
      case 'alerts-notifications': return <AlertsNotifications />;
      case 'edge-ml': return <EdgeMl />;
      case 'cloud-ml': return <CloudMl />;
      case 'code-base': return <CodeBase />;
      case 'ota': return <OtaPipeline />;
      case 'device-shadow': return <DeviceShadow />;
      case 'device-twin': return <DeviceTwin />;
      case 'data-collection': return <DataCollection />;
      case 'edge-control': return <EdgeControl />;
      case 'cloud-control': return <CloudControl />;
      default: return (
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{activeSection}</h1>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        email={email}
        onLogout={onLogout}
      />
      
      <RightSidebar 
        email={email}
      />
      
      {/* Main Content */}
      <div className={`${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} md:mr-16 ml-0 mr-12 transition-all duration-300 h-screen overflow-y-auto`}>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;