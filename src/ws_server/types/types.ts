import WebSocket from 'ws';

export const users: User[] = [];

export type TypeMessage =
| 'reg' 
| 'update_winners' 
| 'create_room' 
| 'add_user_to_room' 
| 'create_game' 
| 'update_room' 
| 'add_ships' 
| 'start_game'
| 'attack'
| 'randomAttack'
| 'turn'
| 'finish'
| '';

export interface RegData {
    name: string;
    password: string;
}

export interface RegistrationMessage {
    id: 0;
    type: TypeMessage;
    data: string;
  }

  export interface wsUser extends WebSocket {
    id: string;
    name:string;
  }

  export interface User {
    id: String;
    name: String;
    password: String;
    ws: wsUser;
  }