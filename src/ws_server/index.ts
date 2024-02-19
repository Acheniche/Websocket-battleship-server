import { httpServer } from "../http_server/index.js";
import 'dotenv/config';
import { RawData, WebSocketServer } from 'ws';
import { authorization } from "./authorization/authorization.js";
import { RegData, RegistrationMessage, users, wsUser } from "./types/types.js";

//HTTP server
const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

//WebSocket server

try {
    
    if(process.env.WEBSOCKET_PORT) {
    const WEBSOCKET_PORT: number = +process.env.WEBSOCKET_PORT || 3000;
    const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

wss.on('connection', (ws: wsUser) => {
    ws.on('message', (req: RawData) => {
        const data = JSON.parse(req.toString()) as RegistrationMessage;
        const type = data.type;
        switch (type) {
            case 'reg': 
            const user = JSON.parse(data.data) as RegData;
            authorization(user, ws);
            console.log(users);
            break;
            case 'create_room':
                 
            break;
            default:
            break;
        }
    });
});

wss.on('error', () => console.log(`Websocket server closed`));
console.log(`Start webscoket server on the ${WEBSOCKET_PORT} port!`);
    }
} catch (e) {
    console.log(`Server websocket err `, e);
  }
