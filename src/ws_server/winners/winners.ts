import { users, winners } from "../types/types";

export const updateWinners = () => {
    users.forEach((user) =>
      user.ws.send(
        JSON.stringify({
          type: 'update_winners',
          data: JSON.stringify(winners),
          id: 0,
        }),
      ),
    );
  };