/**
 * Declaration of types and exports from server.js module (commonjs) 
 */


//export const ServerEventError: string = "error" ;
//export const ServerEventMessage: string = "message";
//export const ServerEventListening: string = "listening";


declare function ServerHandler(
  msg: any | Error | undefined,
  rinfo: any | undefined
): void;
/*declare function ServerErrorHandler(err: Error): void;
declare function ServerErrorHandler(err: Error): void;
declare function ServerMessageHandler(msg:any, rinfo:any): void;
declare function ServerListeningHandler(): void;*/
export interface Server {
  on: (event: string, f: typeof ServerHandler) => void;
  bind: (port: number) => void;
  close:() => void;
  address: () => {
      address: string,
      port: number
  };
}

declare const server: Server;
export default server;
