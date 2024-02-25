import { EmptyRoom, rooms } from "../types/types";

export const getEmptyRooms = () => {
    const roomList: EmptyRoom[] = [];
    rooms.forEach((data, key) => {
      if (data.secondUser !== null) return;
      roomList.push({
        roomId: key,
        roomUsers: [{ name: data.firstUser!.name, index: data.firstUser!.id }],
      });
    });
    return roomList;
  };