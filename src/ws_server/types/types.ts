import WebSocket from 'ws';

export const winners: Winner[] = [];
export const users: User[] = [];
export const rooms: Map<string, Room> = new Map();

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
  export interface Room {
    firstUser: wsUser | null;
    secondUser: wsUser | null;
    field: Field | null;
  }

  export type Position = {
    x: number;
    y: number;
  };

  export interface Ship {
    type: 'small' | 'medium' | 'large' | 'huge';
    position: Position;
    direction: boolean;
    length: number;
  }

  export interface Field {
    firstUserShips: Ship[];
    secondUserShips: Ship[];
    firstUser: wsUser;
    secondUser: wsUser;
    isPlayed: boolean;
    activePlayerId: 0 | 1;
    firstUserShipsData: {
      ships: Position[][];
      killed: Position[][];
      shots: Position[];
    };
    secondUserShipsData: {
      ships: Position[][];
      killed: Position[][];
      shots: Position[];
    };
  }

  export interface EmptyRoom {
    roomId: string;
    roomUsers: { name: string; index: string }[];
  }

  export interface Winner {
    name: string;
    wins: number;
  }