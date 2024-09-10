import React, { useState } from 'react';
import { Modal, Input, Button, Typography, message } from 'antd';

const { Text } = Typography;

interface OtpModalProps {
  isVisible: boolean;
}

const OtpModal: React.FC<OtpModalProps> = ({ isVisible }) => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  const handleVerifyClick = () => {
    if (otp.length !== 4) {
      message.error('Please enter a 4-digit OTP code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // onVerify(otp);
      setLoading(false);
      setOtp(''); // Clear OTP input after verification
    }, 1000);
  };

  return (
    <Modal title="Enter OTP" open={isVisible} footer={null} centered>
      <Text>Enter the 4-digit OTP sent to your email:</Text>
      <Input
        maxLength={4}
        value={otp}
        onChange={handleOtpChange}
        style={{ marginTop: '16px', marginBottom: '16px', textAlign: 'center' }}
        placeholder="Enter OTP"
        size="large"
      />
      <Button
        type="primary"
        block
        onClick={handleVerifyClick}
        loading={loading}
        disabled={otp.length !== 4}
      >
        Verify
      </Button>
    </Modal>
  );
};

export default OtpModal;
