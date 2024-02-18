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
    data: RegData;
  }