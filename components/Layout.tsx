import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    unreadMessages: 12,
    missedCalls: 3,
    notifications: 7,
    batteryLevel: 78,
    signalStrength: 4,
    isConnected: true
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah',
      subtitle: 'Hey, are we still meeting tomorrow?',
      time: '10:30 AM'
    },
    {
      id: 2,
      type: 'call',
      title: 'Missed call from Mom',
      subtitle: 'Mobile • 5 min ago',
      time: '9:45 AM'
    },
    {
      id: 3,
      type: 'notification',
      title: 'Instagram notification',
      subtitle: '3 new likes on your post',
      time: '8:20 AM'
    }
  ]);

  const refreshData = () => {
    // Simulate refresh
    setStats(prev => ({
      ...prev,
      batteryLevel: Math.min(100, prev.batteryLevel + 5)
    }));
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Phone Dashboard</h1>
          <p className="text-sm opacity-70">Last updated: Just now</p>
        </div>
        <button 
          onClick={refreshData}
          className="btn btn-sm btn-outline"
        >
          Refresh
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title text-sm">Connection</h3>
            <div className="flex justify-between items-center">
              <span className={`badge ${stats.isConnected ? 'badge-success' : 'badge-error'}`}>
                {stats.isConnected ? 'Connected' : 'Disconnected'}
              </span>
              <span className="text-lg font-bold">{stats.signalStrength}/5</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title text-sm">Battery</h3>
            <div className="flex justify-between items-center">
              <progress 
                className="progress progress-primary w-3/4" 
                value={stats.batteryLevel} 
                max="100"
              ></progress>
              <span className="text-lg font-bold">{stats.batteryLevel}%</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title text-sm">Status</h3>
            <div className="flex justify-between items-center">
              <span className="badge badge-info">Active</span>
              <span className="text-sm opacity-70">All systems normal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link to="/messages" className="card bg-primary text-primary-content shadow hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h3 className="card-title text-sm">Messages</h3>
            <p className="text-2xl font-bold">{stats.unreadMessages} unread</p>
          </div>
        </Link>

        <Link to="/calls" className="card bg-secondary text-secondary-content shadow hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h3 className="card-title text-sm">Calls</h3>
            <p className="text-2xl font-bold">{stats.missedCalls} missed</p>
          </div>
        </Link>

        <Link to="/notifications" className="card bg-accent text-accent-content shadow hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h3 className="card-title text-sm">Notifications</h3>
            <p className="text-2xl font-bold">{stats.notifications} new</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Recent Activity</h2>
            <Link to="/activity" className="link link-primary text-sm">View All</Link>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex justify-between items-start p-3 hover:bg-base-200 rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm opacity-70">{activity.subtitle}</p>
                </div>
                <span className="text-sm opacity-70">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button className="btn btn-outline btn-sm">Send SMS</button>
            <button className="btn btn-outline btn-sm">Make Call</button>
            <button className="btn btn-outline btn-sm">Clear Notifs</button>
            <button className="btn btn-outline btn-sm">Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;