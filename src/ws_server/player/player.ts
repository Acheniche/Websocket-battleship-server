import { RegData } from "../types/types";
import { createHmac } from 'crypto';
import { WebSocket } from 'ws';
import { EventEmitter } from 'events';

export class Player extends EventEmitter {
    public ws: WebSocket;
    public name: string = '';
    public password: string = '';
    public playerID: number = 0;

    constructor (ws:WebSocket) {
        super();
        this.ws = ws;
    }
    
    static IDgenerator( registrationData: RegData): number {
        const hash = createHmac('sha256', 'BattleShip')
          .update(registrationData.name + registrationData.password)
          .digest('hex');
        return parseInt(hash, 16);
      }

    userRegistration(registrationData: RegData): void {
        this.name = registrationData.name;
        this.password = registrationData.password;
        this.playerID = Player.IDgenerator(registrationData);
        
        const userData = JSON.stringify({
            name: this.name,
            index: this.playerID,
            error: false,
            errorText: '',
          });

        const registrationJson: string = JSON.stringify({
            type: 'reg',
            id: 0,
            data: userData,
          });

        this.ws.send(registrationJson, (error) => {
            if (error) {
                console.log(error);
            }
            console.log('Send registration');
        })
    }
}