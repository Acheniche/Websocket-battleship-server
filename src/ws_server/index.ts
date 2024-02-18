import { httpServer } from "../http_server/index.js";
import 'dotenv/config';
import { WebSocketServer,createWebSocketStream } from 'ws';
import internal from 'stream';
import { WebSocket } from "ws";
import { Player } from "./player/player";

//HTTP server
const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


//WebSocket server

try {
    
    if(process.env.WEBSOCKET_PORT) {
const WEBSOCKET_PORT: number = +process.env.WEBSOCKET_PORT || 3000;
const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

wss.on('connection', (ws: WebSocket) => {
    const wsStream: internal.Duplex = createWebSocketStream(ws, {
        encoding: 'utf8',
        decodeStrings: false,
    });
    wsStream.on('data', (req) => {
        const { type, data } = JSON.parse(req.toString());
        switch (type) {
            case 'reg': 
            handleRegistration(data, ws);
            break;
            default:
            break;
        }
    });
    wsStream.on('error', () => console.log('Websocket closed!'));
});
wss.on('error', () => console.log(`Websocket server closed`));
console.log(`Start webscoket server on the ${WEBSOCKET_PORT} port!`);
    }
} catch (e) {
    console.log(`Server websocket err `, e);
  }
  const players: Player[] = [];

  const handleRegistration = (data: string, ws: WebSocket): void => {
    const userInfo = JSON.parse(data);
    const player = new Player(ws);
    player.userRegistration(userInfo);
    players.push(player);
  };
