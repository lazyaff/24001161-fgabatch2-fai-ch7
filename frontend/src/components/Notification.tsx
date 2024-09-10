import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button, Input, List, notification } from "antd";
import { jwtDecode } from "jwt-decode";
import type { NotificationPlacement } from "antd/es/notification/interface";

interface JwtPayload {
    id: string;
}

interface NotificationData {
    message: string;
}

const NotificationComponent: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>("");
    const [notifications, setNotifications] = useState<NotificationData[]>([
        {
            message: "Welcome to Your Profile!",
        },
    ]);

    const getUserIdFromToken = (): string | null => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            return decodedToken.id;
        } catch (error) {
            console.error("Invalid token format", error);
            return null;
        }
    };

    useEffect(() => {
        const userId = getUserIdFromToken();
        console.log(userId);
        if (!userId) {
            console.error("User ID not found in token.");
            return;
        }

        const newSocket = io("http://localhost:3000", {
            query: { id: userId },
        });

        setSocket(newSocket);

        newSocket.on("new-notification", (data: NotificationData) => {
            notification.open({
                message: "New Notification",
                description: data.message,
                placement: "topRight" as NotificationPlacement,
            });

            setNotifications((prev) => [...prev, data]);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const handleSendNotification = () => {
        if (socket && message) {
            socket.emit("new-notification", {
                targetId: getUserIdFromToken() || "",
                message,
            });
            setMessage("");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Input
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Button type="primary" onClick={handleSendNotification}>
                Send Notification
            </Button>
            <List
                header={<div>Received Notifications</div>}
                bordered
                dataSource={notifications}
                renderItem={(item) => <List.Item>{item.message}</List.Item>}
                style={{ marginTop: 20 }}
            />
        </div>
    );
};

export default NotificationComponent;
