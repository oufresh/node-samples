const dgram = require('dgram'); // eslint-disable-line @typescript-eslint/no-var-requires
const server = dgram.createSocket('udp4');
//console.log(server);

module.exports = server;
