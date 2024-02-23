import { httpServer } from "../http_server/index.js";
import 'dotenv/config';
import { RawData, WebSocketServer } from 'ws';
import { authorization } from "./authorization/authorization.js";
import { RegData, RegistrationMessage, Ship, wsUser } from "./types/types.js";
import { createRoom } from "./rooms/createRoom.js";
import { addUser } from "./rooms/AddUserToRoom.js";
import { addShips } from "./ships/ships.js";
import { attack } from "./attacks/attack.js";
import { randomAttack } from "./attacks/randomAttack.js";

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
            break;
            case 'create_room':
                 createRoom(ws);
            break;
            case 'add_user_to_room':
                const { indexRoom } = JSON.parse(data.data) as { indexRoom: string };
                addUser(indexRoom, ws);
            case 'add_ships':
                const { gameId, ships, indexPlayer } = JSON.parse(data.data) as {
                    gameId: string;
                    ships: Ship[];
                    indexPlayer: number;
                  };
                  addShips(gameId, ships, indexPlayer);
            break;
            case 'attack':
                const attackData = JSON.parse(data.data) as {
                    gameId: string;
                    x: number;
                    y: number;
                    indexPlayer: 0 | 1;
                  };
                  attack({ ...attackData }, ws);
            break;
            case 'randomAttack':
                const randomAttackData = JSON.parse(data.data) as {
                    gameId: string;
                    indexPlayer: 0 | 1;
                    };
                randomAttack({ ...randomAttackData });
            break;
            default:
                console.log('unknown command');
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
