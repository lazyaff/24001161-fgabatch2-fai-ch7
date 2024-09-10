// require("./sentry.js");

const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("../routes");
const setupSwagger = require("./swagger");
const Sentry = require("@sentry/node");
const { Server } = require("socket.io");
const prisma = require("../utils/prisma");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type,Authorization",
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(routes);

// set up swagger
setupSwagger(app);

// set up socket io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.use((socket, next) => {
    const user_id = socket.handshake.query.id;
    if (!user_id) {
        return next(new Error("user_id is required"));
    }

    socket.user_id = user_id;
    next();
});

io.on("connection", async (socket) => {
    try {
        console.log(`Socket.id: ${socket.id} connected`);

        const user = await prisma.users.findFirst({
            where: {
                id: socket.user_id,
            },
        });

        if (!user) {
            console.error(`User with id ${socket.user_id} not found.`);
            socket.disconnect();
            return;
        }

        await prisma.users.update({
            where: {
                id: socket.user_id,
            },
            data: {
                socket_id: socket.id,
            },
        });

        socket.on("new-notification", async (data) => {
            const { targetId, message } = data;

            try {
                const target = await prisma.users.findFirst({
                    where: {
                        id: targetId,
                    },
                });

                if (target) {
                    await prisma.notifications.create({
                        data: {
                            user_id: target.id,
                            message,
                            status: "unread",
                        },
                    });

                    io.to(target.socket_id).emit("new-notification", {
                        message,
                    });
                } else {
                    console.error(`Target user with id ${targetId} not found.`);
                }
            } catch (error) {
                console.error("Error sending notification:", error);
            }
        });

        socket.on("disconnect", async () => {
            console.log("User disconnected:", socket.id);

            await prisma.users.update({
                where: { id: socket.user_id },
                data: { socket_id: null },
            });
        });
    } catch (error) {
        console.error("Error during connection setup:", error);
    }
});

// // set up sentry
// Sentry.setupExpressErrorHandler(app);

// // Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//     res.statusCode = 500;
//     res.end(res.sentry + "\n");
// });

module.exports = app;
