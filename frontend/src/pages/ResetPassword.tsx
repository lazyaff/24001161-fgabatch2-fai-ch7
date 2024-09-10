import { useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const styles = {
    formContainer: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
    },
    formBox: {
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
    },
};

const { Title } = Typography;

function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    // Function to get query parameters from URL
    const getQueryParams = (param: string) => {
        return new URLSearchParams(location.search).get(param);
    };

    // Get the token from the URL
    const token = getQueryParams("token");

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:3000/api/v1/auth/reset-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...values,
                        token: token,
                    }),
                }
            );
            const data = await response.json();
            if (data.success) {
                message.success("Password reset successful.");
                setLoading(false);
                setTimeout(() => {
                    window.location.href = "/login";
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
        <div style={styles.formContainer}>
            <div style={styles.formBox}>
                <Title
                    level={2}
                    style={{ textAlign: "center", marginBottom: "24px" }}
                >
                    Reset Password
                </Title>
                <Form name="login_form" onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                        style={{ marginBottom: "2rem" }}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input your Confirmation Password!",
                            },
                        ]}
                        style={{ marginBottom: "2rem" }}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Confirmation Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: "0.5rem" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            style={{ width: "100%" }}
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default ResetPassword;
