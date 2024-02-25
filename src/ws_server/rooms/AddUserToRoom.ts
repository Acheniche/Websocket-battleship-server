import { Field, rooms, wsUser } from '../types/types';
import { updateRooms } from './updateRoom';


export const addUser = (roomIndex: string, secondUser: wsUser) => {
  const room = rooms.get(roomIndex);
  const isNotEqual = room?.firstUser && room.firstUser.id === secondUser.id;
  if (!room || !room.firstUser || !secondUser || isNotEqual) return;
  room!.secondUser = secondUser;

  const gameField: Field = {
    firstUser: room.firstUser,
    secondUser: room.secondUser,
    firstUserShips: [],
    secondUserShips: [],
    isPlayed: false,
    activePlayerId: 0,
    firstUserShipsData: { ships: [[]], killed: [[]], shots: [] },
    secondUserShipsData: { ships: [[]], killed: [[]], shots: [] },
  };

  room.field = gameField;
  const roomUsers = [room.firstUser, room.secondUser];
  updateRooms();
  roomUsers.forEach((user, index) => {
    user.send(
      JSON.stringify({
        type: 'create_game',
        data: JSON.stringify({
          idGame: roomIndex,
          idPlayer: index,
        }),
      }),
    );
  });
};