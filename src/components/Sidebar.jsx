import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import Icons from './Icons';
import api from '../api/api';

const Sidebar = ({ sidebarCollapsed, setSidebarCollapsed, activeSection, setActiveSection, email, onLogout }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [favoriteItems, setFavoriteItems] = useState([]);
  const [clickHistory, setClickHistory] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const isMobileScreen = window.innerWidth < 768;
    if (isMobileScreen !== sidebarCollapsed) {
      setSidebarCollapsed(isMobileScreen);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load user favorites from localStorage
  useEffect(() => {
    if (email) {
      const saved = localStorage.getItem(`favorites_${email}`);
      if (saved) {
        const favoriteIds = JSON.parse(saved);
        const items = favoriteIds.map(id => getItemById(id)).filter(Boolean);
        setFavoriteItems(items);
      }
    }
  }, [email]);

  // Get item details by ID - prioritize subItems (actual services)
  const getItemById = (id) => {
    if (id === 'overview') return { id: 'overview', label: 'Project Overview', icon: <Icons.Overview /> };
    
    // First check subItems (actual services that users click)
    for (const category of navigationCategories) {
      for (const item of category.items) {
        if (item.subItems) {
          const subItem = item.subItems.find(sub => sub.id === id);
          if (subItem) return { id: subItem.id, label: subItem.label, icon: subItem.icon };
        }
      }
    }
    
    // Then check parent items if not found in subItems
    for (const category of navigationCategories) {
      for (const item of category.items) {
        if (item.id === id) return { id: item.id, label: item.label, icon: item.icon };
      }
    }
    
    return null;
  };

  // Manual pin/unpin functionality
  const togglePin = (sectionId, e) => {
    e.stopPropagation();
    
    const isCurrentlyPinned = favoriteItems.some(item => item.id === sectionId);
    let newFavorites;
    
    if (isCurrentlyPinned) {
      // Unpin
      newFavorites = favoriteItems.filter(item => item.id !== sectionId);
    } else {
      // Check if already at limit
      if (favoriteItems.length >= 7) {
        setNotification('Maximum 7 items can be pinned');
        setTimeout(() => setNotification(null), 3000);
        return;
      }
      
      // Pin
      const item = getItemById(sectionId);
      if (item) {
        newFavorites = [...favoriteItems, item];
      }
    }
    
    setFavoriteItems(newFavorites);
    
    // Save to localStorage
    const favoriteIds = newFavorites.map(item => item.id);
    localStorage.setItem(`favorites_${email}`, JSON.stringify(favoriteIds));
  };
  
  const isPinned = (sectionId) => {
    return favoriteItems.some(item => item.id === sectionId);
  };

  // Enhanced setActiveSection
  const handleSetActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };
  


  const navigationCategories = [
    {
      title: 'Core Platform',
      items: [
        { 
          id: 'devices', 
          label: 'Device View', 
          expandable: true,
          subItems: [
            { id: 'device-registry', label: 'Device Registry', icon: <Icons.Overview /> },
            { id: 'thing', label: 'Thing', icon: <Icons.Device /> },
          ]
        },
      ]
    },
    {
      title: 'Connectivity',
      items: [
        { 
          id: 'communication', 
          label: 'Communication', 
          expandable: true,
          subItems: [
            { id: 'persistent-mqtt', label: 'Persistent: MQTT', icon: <Icons.Communication /> },
            { id: 'non-persistent-rest', label: 'Non-Persistent: REST APIs', icon: <Icons.Data /> },
          ]
        },
        { 
          id: 'security', 
          label: 'Security', 
          expandable: true,
          subItems: [
            { id: 'device-authentication', label: 'Device Authentication', icon: <Icons.Security /> },
            { id: 'app-authentication', label: 'App Authentication', icon: <Icons.Profile /> },
            { id: 'access-control', label: 'Access Control', icon: <Icons.Control /> },
          ]
        },
      ]
    },
    {
      title: 'Intelligence',
      items: [
        { 
          id: 'automation', 
          label: 'Automation', 
          expandable: true,
          subItems: [
            { id: 'schedules', label: 'Schedules', icon: <Icons.Automation /> },
            { id: 'triggers', label: 'Triggers', icon: <Icons.Notification /> },
            { id: 'alerts-notifications', label: 'Alerts & Notifications', icon: <Icons.Notification /> },
          ]
        },
        { 
          id: 'ai-ml', 
          label: 'AI & ML', 
          expandable: true,
          subItems: [
            { id: 'edge-ml', label: 'Edge ML', icon: <Icons.Device /> },
            { id: 'cloud-ml', label: 'Cloud ML', icon: <Icons.AI /> },
          ]
        },
      ]
    },
    {
      title: 'Management',
      items: [

        { 
          id: 'codebase', 
          label: 'Firmware & Codebase', 
          expandable: true,
          subItems: [
            { id: 'code-base', label: 'Code Base', icon: <Icons.Code /> },
            { id: 'ota', label: 'OTA Pipeline', icon: <Icons.Upload /> },
          ]
        },
        { 
          id: 'data', 
          label: 'Data Layer', 
          expandable: true,
          subItems: [
            { id: 'device-shadow', label: 'Device Shadow', icon: <Icons.Security /> },
            { id: 'device-twin', label: 'Device Twin', icon: <Icons.Overview /> },
            { id: 'data-collection', label: 'Data Collection', icon: <Icons.Data /> },
          ]
        },
        { 
          id: 'control', 
          label: 'Control', 
          expandable: true,
          subItems: [
            { id: 'edge-control', label: 'Edge Control', icon: <Icons.Automation /> },
            { id: 'cloud-control', label: 'Cloud Control', icon: <Icons.Control /> },
          ]
        },
      ]
    }
  ];

  const handleSidebarClick = (e) => {
    if (sidebarCollapsed && !e.target.closest('button')) {
      setSidebarCollapsed(false);
    }
  };

  const toggleSection = (itemId) => {
    setExpandedSections(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          {notification}
        </div>
      )}
      
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg md:hidden"
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5 bg-gray-600"></div>
            <div className="w-full h-0.5 bg-gray-600"></div>
            <div className="w-full h-0.5 bg-gray-600"></div>
          </div>
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-20"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <div 
        className={`${
          isMobile 
            ? `fixed left-0 top-0 h-screen w-64 transform transition-transform duration-300 z-30 ${
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : `${sidebarCollapsed ? 'w-16' : 'w-64'} fixed left-0 top-0 h-screen z-10`
        } bg-white shadow-lg flex flex-col cursor-pointer transition-all duration-300`}
        onClick={isMobile ? undefined : handleSidebarClick}
      >
      {/* Logo Section */}
      <div 
        className="p-4  flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
        onClick={(e) => {
          e.stopPropagation();
          handleSetActiveSection('overview');
        }}
      >
        {!sidebarCollapsed ? (
          <div className="flex items-center space-x-2">
            <img src={logo} alt="IoTRoot" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">IeTRoot</span>
          </div>
        ) : (
          <img src={logo} alt="IoTRoot" className="w-8 h-8" />
        )}
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200"></div>
      
      {/* Navigation */}
      <nav className={`flex-1 ${sidebarCollapsed ? 'p-2' : 'p-4'} space-y-4 overflow-y-auto scrollbar-hide`}>
        {/* Overview */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSetActiveSection('overview');
            }}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-1 py-0.5' : 'space-x-3 px-2 py-1'} rounded-md text-left text-sm transition group ${
              activeSection === 'overview'
                ? 'bg-gray-800 text-white font-medium'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            <div className="flex-shrink-0"><Icons.Overview /></div>
            {(!sidebarCollapsed || isMobile) && <span>Project Overview</span>}
            
            {/* Hover Tooltip */}
            {sidebarCollapsed && (
              <div className="fixed left-20 bg-gray-900/60 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60]">
                Project Overview
              </div>
            )}
          </button>
        </div>
        
        {/* Favorites */}
        <div>
          {(!sidebarCollapsed || isMobile) && (
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Favorite
            </div>
          )}
          <div className={sidebarCollapsed ? 'space-y-3' : 'space-y-1'}>
            {favoriteItems.map((item) => (
              <div key={item.id} className="relative flex items-center group">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetActiveSection(item.id);
                  }}
                  className={`flex-1 flex items-center ${sidebarCollapsed ? 'justify-center px-1 py-2' : 'space-x-3 px-2 py-1'} rounded-md text-left text-sm transition ${
                    activeSection === item.id
                      ? 'bg-yellow-100 text-yellow-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  {(!sidebarCollapsed || isMobile) && <span className="flex-1">{item.label}</span>}
                  
                  {/* Hover Tooltip */}
                  {sidebarCollapsed && (
                    <div className="fixed left-20 bg-gray-900/60 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60]">
                      {item.label}
                    </div>
                  )}
                </button>
                {(!sidebarCollapsed || isMobile) && (
                  <button
                    onClick={(e) => togglePin(item.id, e)}
                    className="ml-1 p-1 rounded text-xs transition opacity-0 group-hover:opacity-100 text-yellow-600 hover:text-red-600"
                    title="Unpin"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* IoTRoot Item Label */}
        {(!sidebarCollapsed || isMobile) && (
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
            IoTRoot Service
          </div>
        )}

        {/* Main Features Group */}
        {(!sidebarCollapsed || isMobile) && (
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            {navigationCategories.flatMap(category => category.items).map((item) => (
              <div key={item.id}>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.expandable) {
                        // Close all other sections and toggle current
                        setExpandedSections({ [item.id]: !expandedSections[item.id] });
                      } else {
                        handleSetActiveSection(item.id);
                      }
                    }}

                    className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-left text-sm transition group ${
                      expandedSections[item.id]
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : activeSection === item.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
                      <span>{item.label}</span>
                    </div>
                    {item.expandable && (
                      <Icons.ChevronDown className={`w-4 h-4 transition-transform ${
                        expandedSections[item.id] ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                </div>
                
                {/* Sub Items */}
                {item.expandable && expandedSections[item.id] && (
                  <div className="mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <div key={subItem.id} className="flex items-center group">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetActiveSection(subItem.id);
                            setExpandedSections({});
                          }}
                          className={`flex-1 flex items-center space-x-3 px-2 py-1 rounded-md text-left text-sm transition ${
                            activeSection === subItem.id
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex-shrink-0">{subItem.icon}</div>
                          <span className="flex-1">{subItem.label}</span>
                        </button>
                        <button
                          onClick={(e) => togglePin(subItem.id, e)}
                          className={`ml-1 p-1 rounded text-xs transition opacity-0 group-hover:opacity-100 ${
                            isPinned(subItem.id)
                              ? 'text-yellow-600 hover:text-yellow-700'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                          title={isPinned(subItem.id) ? 'Unpin' : 'Pin'}
                        >
                          {isPinned(subItem.id) ? '📌' : '📍'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
      
      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        {!sidebarCollapsed && (
          <div className="text-sm text-gray-900 font-bold truncate">{email}</div>
        )}
      </div>
      {/* Toggle Button */}
      <div className="px-4 py-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarCollapsed(!sidebarCollapsed);
          }}
          className="w-full flex items-center justify-end p-2 rounded-md  hover:bg-gray-200 transition"
        >
          {sidebarCollapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
        </button>
      </div>
      </div>
    </>
  );
};

export default Sidebar;