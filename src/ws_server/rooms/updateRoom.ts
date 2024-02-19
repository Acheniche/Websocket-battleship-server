import { users } from "../types/types";
import { getEmptyRooms } from "./getEmptyRooms";

export const updateRooms = () => {
    const roomList = getEmptyRooms();
    users.forEach((user) =>
      user.ws.send(
        JSON.stringify({
          type: 'update_room',
          data: JSON.stringify(roomList),
          id: 0,
        }),
      ),
    );
  };