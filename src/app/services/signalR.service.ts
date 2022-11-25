import {
    Injectable,
    EventEmitter
} from '@angular/core';
// declare the global variables  
declare var $: any;
@Injectable()
export class SignalRService {
    // Declare the variables
    private proxy: any;
    private proxyName: string = 'notificationHub';
    private connection: any;
    // create the Event Emitter
    public messageReceived: EventEmitter<any>;
    public connectionEstablished: EventEmitter<any>;
    public connectionExists: any;
    constructor() {
        // Constructor initialization
        this.connectionEstablished = new EventEmitter<any>();
        this.messageReceived = new EventEmitter<any>();
        this.connectionExists = false;
        // create hub connection
        this.connection = $.hubConnection('http://vinatex.harmonyes.com.vn/SmartEOSAPI');
        // this.connection = $.hubConnection('http://eos.harmonyes.com.vn:1169/SmartEOSAPI');
        // create new proxy as name already given in top
        this.proxy = this.connection.createHubProxy(this.proxyName);
        // register on server events
        this.registerOnServerEvents();
        // call the connecion start method to start the connection to send and receive events.
        this.startConnection();
    }
    // method to hit from client
    // tslint:disable-next-line:typedef
    public sendTime() {
        // server side hub method using proxy.invoke with method name pass as param
        this.proxy.invoke('GetRealTime');
    }
    // check in the browser console for either signalr connected or not
    private startConnection(): void {
        this.connection.start().done((data: any) => {
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }
    private registerOnServerEvents(): void {
        this.proxy.on('broadcastMessage', (data: any) => {
            this.messageReceived.emit(data)
        });
    }
}

