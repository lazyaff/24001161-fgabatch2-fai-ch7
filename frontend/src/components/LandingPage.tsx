import React from 'react';
import { Layout, Typography, Button, message } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

interface ProfileDashboardProps {
  email?: string;
  onLogout?: () => void;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  onLogout = () => {},
}) => {
  const handleLogout = () => {
    message.info('You have been logged out.');
    onLogout(); // Call the logout function passed as a prop
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header
        style={{
          backgroundColor: '#001529',
          padding: '0 50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ color: '#fff', fontSize: '24px' }}>Profile Dashboard</div>
        <Button type="default" onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      {/* Content */}
      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <Title level={2}>Welcome to Your Profile</Title>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>
        © 2024 My Application. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default ProfileDashboard;
