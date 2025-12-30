import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import type { IncomingMessage } from 'http';
import { error } from 'console';

const app = express();


app.get('/', (req: Request, res: Response) => {
    return res.json({ message: "hello world" });
});

const server = app.listen(3000, () => {
    console.log("app is running on port 3000");
});

const wss = new WebSocketServer({ server });

const rooms = new Map<string, Set<WebSocket>>();

wss.on('connection', (ws: WebSocket, req: Request) => {
    console.log('client connected');

    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected to web sockets'
    }))

    ws.on('message', (data: Buffer) => {
        // const message = data.toString();
        const payload = JSON.parse(data.toString())

        const { type, roomId, message } = payload;

        switch (type) {
            case 'join-room':
                joinRoom(roomId, ws);
                ws.send(JSON.stringify({
                    type: 'joined room',
                    roomId
                }));
                break;


            case 'leave-room':
                leaveRoom(roomId, ws);
                ws.send(JSON.stringify({
                    type: "room left",
                    roomId
                }));
                break;


            case 'send-message':
                broadcastToRoom(roomId, message, ws);
                break;
        }

    })


    ws.on('close', () => {
        rooms.forEach((clients, roomId) => {
            leaveRoom(roomId, ws)
        })
        console.log('websocket disconnected')
    })

})


function joinRoom(roomId: string, ws: WebSocket) {

    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
    }

    rooms.get(roomId)!.add(ws);

}


function leaveRoom(roomId: string, ws: WebSocket) {
    rooms.get(roomId)?.delete(ws);

    if (rooms.get(roomId)?.size === 0) {
        rooms.delete(roomId);
    }
}


function broadcastToRoom(roomId: string, message: string, sender?: WebSocket) {
    const clients = rooms.get(roomId);

    clients?.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== sender) {
            client.send(JSON.stringify({
                type: 'room-message',
                roomId,
                message
            }))
        }
    })
}