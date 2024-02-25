import { rooms, wsUser } from "../types/types";
import { createHmac } from 'crypto';
import { updateRooms } from "./updateRoom";

export const IDgenerator = (): number => {
    const hash = createHmac('sha256', 'BattleShip')
      .update(Date.now().toString())
      .digest('hex');
    return parseInt(hash, 16);
  }

export const createRoom = (firstUser: wsUser) => {
    const index = IDgenerator()
    rooms.set(index.toString(), {firstUser, secondUser: null, field: null});
    updateRooms();
}