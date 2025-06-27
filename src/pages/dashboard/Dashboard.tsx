import React from 'react';
import Layout from '../common/Layout';
import WelcomeSection from './WelcomeSection';
import SystemStatus from './SystemStatus';
import OverviewCards from './OverviewCards';
import QuickActionsSection from './QuickActionsSection';
import RecentActivityFeed from './RecentActivityFeed';
import FloatingActionButton from './FloatingActionButton';

const Dashboard: React.FC = () => {
  const handleAddNew = () => {
    // Handle add new item action
    console.log('Add new item clicked');
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="space-y-6">
        <WelcomeSection />
        <OverviewCards />
        <QuickActionsSection />
        <RecentActivityFeed />
        <SystemStatus />
      </div>
      <FloatingActionButton onClick={handleAddNew} />
    </Layout>
  );
};

export default Dashboard;