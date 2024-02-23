import { Position, Ship, rooms } from '../types/types';

export const addShips = (gameId: string, ships: Ship[], indexPlayer: number) => {
  const field = rooms.get(gameId)?.field;
  if (!field) return;

  if (indexPlayer === 0) {
    field.firstUserShips = ships;
    field.activePlayerId = 0;
  } else {
    field.secondUserShips = ships;
    field.activePlayerId = 1;
  }

  const shipsData = indexPlayer === 0 ? field.firstUserShipsData : field.secondUserShipsData;
  const { shipsCoordinates, killedCoordinates } = ShipsCoordinates(ships);
  shipsData.ships = shipsCoordinates;
  shipsData.killed = killedCoordinates;

  if (field.firstUserShips.length && field.secondUserShips.length) {
    [field.firstUser, field.secondUser].forEach(user => {
      user.send(JSON.stringify({
        type: 'start_game',
        data: JSON.stringify({
          ships: user === field.firstUser ? field.firstUserShips : field.secondUserShips,
          currentPlayerIndex: field.activePlayerId,
        }),
        id: 0,
      }));
    });
  }
};

const ShipsCoordinates = (ships: Ship[]) => {
  const shipsCoordinates: Position[][] = [];
  const killedCoordinates: Position[][] = [];
  ships.forEach((ship) => {
    const shipCoor: Position[] = [];
    for (let i = 0; i < ship.length; i++) {
      shipCoor.push(ship.direction ? { x: ship.position.x, y: ship.position.y + i } : { x: ship.position.x + i, y: ship.position.y });
    }
    shipsCoordinates.push(shipCoor);
    killedCoordinates.push([]);
  });
  return { shipsCoordinates, killedCoordinates };
};
