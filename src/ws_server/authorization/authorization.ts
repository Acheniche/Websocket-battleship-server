import { updateRooms } from "../rooms/updateRoom";
import { RegData, users, wsUser } from "../types/types";
import { createHmac } from 'crypto';
import { updateWinners } from "../winners/winners";

export const IDgenerator = ( name: string, password: string): number => {
    const hash = createHmac('sha256', 'BattleShip')
      .update(name + password)
      .digest('hex');
    return parseInt(hash, 16);
  }

export const authorization = ({name, password}: RegData, ws: wsUser) => {
const index = IDgenerator(name, password);
if(users.length != 0) {
  for(let i = 0; i < users.length; i++){
    if(users[i].id == index.toString()){
      console.log('this user already exists');
      return;
    }
  }
}

ws.name = name;
ws.id = index.toString();
users.push({name, id: index.toString(), password, ws});
ws.send(
    JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: name,
        index: index,
        error: false,
        errorText: '',
      }),
      id: 0,
    }),
  );
  updateRooms();
  updateWinners();
}