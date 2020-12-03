/**
 * Declaration of types and exports from server.js module (commonjs) 
 */


//export const ServerEventError: string = "error" ;
//export const ServerEventMessage: string = "message";
//export const ServerEventListening: string = "listening";

/*
msg <Buffer> The message.
rinfo <Object> Remote address information.
address <string> The sender address.
family <string> The address family ('IPv4' or 'IPv6').
port <number> The sender port.
size <number> The message size.*/

export type Rinfo =
{
  address: string;
  family: string;
  port: number;
  size: number;
}

declare function ServerHandler(
  msg: Buffer | Error | undefined,
  rinfo: Rinfo | undefined
): void;
/*declare function ServerErrorHandler(err: Error): void;
declare function ServerErrorHandler(err: Error): void;
declare function ServerMessageHandler(msg:any, rinfo:any): void;
declare function ServerListeningHandler(): void;*/
export interface Udp {
  on: (event: string, f: typeof ServerHandler) => void;
  bind: (port: number) => void;
  close:() => void;
  address: () => {
      address: string,
      port: number,
      family:string
  };
  /**
   * Associates the dgram.Socket to a remote address and port. Every message sent by this handle is automatically sent to that destination.
   * Also, the socket will only receive messages from that remote peer.
   * Trying to call connect() on an already connected socket will result in an ERR_SOCKET_DGRAM_IS_CONNECTED exception.
   * If address is not provided, '127.0.0.1' (for udp4 sockets) or '::1' (for udp6 sockets) will be used by default.
   * Once the connection is complete, a 'connect' event is emitted and the optional callback function is called.
   * In case of failure, the callback is called or, failing this, an 'error' event is emitted.
   */
  connect: (port: number,address: string, callback: () =>void) => void;
  /**
   * A synchronous function that disassociates a connected dgram.Socket from its remote address.
   * Trying to call disconnect() on an unbound or already disconnected socket will result in an ERR_SOCKET_DGRAM_NOT_CONNECTED exception.
   */
  disconnect: () => void;


}

/*

socket.send(msg[, offset, length][, port][, address][, callback])#
History
msg <Buffer> | <TypedArray> | <DataView> | <string> | <Array> Message to be sent.
offset <integer> Offset in the buffer where the message starts.
length <integer> Number of bytes in the message.
port <integer> Destination port.
address <string> Destination host name or IP address.
callback <Function> Called when the message has been sent.socket.send(msg[, offset, length][, port][, address][, callback])#
History
msg <Buffer> | <TypedArray> | <DataView> | <string> | <Array> Message to be sent.
offset <integer> Offset in the buffer where the message starts.
length <integer> Number of bytes in the message.
port <integer> Destination port.
address <string> Destination host name or IP address.
callback <Function> Called when the message has been sent.
*/


declare const udp: Udp;
export default udp;
