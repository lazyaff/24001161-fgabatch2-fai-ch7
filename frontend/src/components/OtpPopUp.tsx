import React, { useState } from "react";
import { Modal, Input, Button, Typography, message } from "antd";

const { Text } = Typography;

interface OtpModalProps {
    isVisible: boolean;
    email: string;
}

const OtpModal: React.FC<OtpModalProps> = ({ isVisible, email }) => {
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Only allow numbers
        if (value.length <= 4) {
            setOtp(value);
        }
    };

    const handleVerifyClick = async () => {
        if (otp.length !== 4) {
            message.error("Please enter a 4-digit OTP code.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:3000/api/v1/auth/verify-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, otp }),
                }
            );
            const data = await response.json();
            if (data.success) {
                setLoading(false);
                setOtp("");
                message.success("OTP verified successfully");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                message.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            message.error("An error occurred during login. Please try again.");
            setLoading(false);
        }
    };

    return (
        <Modal title="Enter OTP" open={isVisible} footer={null} centered>
            <Text>Enter the 4-digit OTP sent to your email:</Text>
            <Input
                maxLength={4}
                value={otp}
                onChange={handleOtpChange}
                style={{
                    marginTop: "16px",
                    marginBottom: "16px",
                    textAlign: "center",
                }}
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
