import { Layout, Typography, Button, message } from "antd";
import { useEffect } from "react";
import NotificationComponent from "../components/Notification";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/v1/auth/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const result = await response.json();
            if (result.success) {
                localStorage.removeItem("token");
                message.success("You have been logged out successfully.");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000);
            } else {
                message.error(result.message);
            }
        } catch (error) {
            console.log(error);
            message.error("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Header */}
            <Header
                style={{
                    backgroundColor: "#001529",
                    padding: "0 50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ color: "#fff", fontSize: "24px" }}>
                    Profile Dashboard
                </div>
                <Button type="default" onClick={handleLogout}>
                    Logout
                </Button>
            </Header>

            {/* Content */}
            <Content style={{ padding: "50px", textAlign: "center" }}>
                <Title level={2}>Notification</Title>
                <NotificationComponent />
            </Content>

            {/* Footer */}
            <Footer style={{ textAlign: "center" }}>
                © 2024 My Application. All rights reserved.
            </Footer>
        </Layout>
    );
};

export default Dashboard;
