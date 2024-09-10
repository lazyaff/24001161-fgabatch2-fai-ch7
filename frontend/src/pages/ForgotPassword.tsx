import { useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

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

function ForgotPassword() {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:3000/api/v1/auth/send-token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const data = await response.json();
            if (data.success) {
                message.success("Reset password link sent to your email.");
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
                    Forgot Password
                </Title>
                <Form name="login_form" onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                        style={{ marginBottom: "2rem" }}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Email"
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
                            Process
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default ForgotPassword;
