import { useState } from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import OtpModal from './OtpPopUp';

const styles = {
  formContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  formBox: {
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
};

const { Title } = Typography;

function FormPage({ setIsAuthenticated }: { setIsAuthenticated: () => void }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      // if (data.success) {
      //   message.success('Login successful!');
      //   setLoading(false);
      //   setIsAuthenticated();
      // } else {
      //   message.error(data.message);
      //   setLoading(false);
      // }
    } catch (error) {
      console.error(error);
      message.error('An error occurred during login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <OtpModal isVisible={false} />
      <div style={styles.formBox}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Login
        </Title>
        <Form name="login_form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            style={{ marginBottom: '2rem' }}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
            style={{ marginBottom: '2rem' }}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: '100%' }}
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default FormPage;
