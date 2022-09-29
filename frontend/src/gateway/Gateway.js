const { EventEmitter } = require('events');
const GatewayMessage = require('../structures/GatewayMessage');
const { GATEWAY_OPCODE } = require('../constants');

module.exports.Gateway = class extends EventEmitter {
  constructor() {
    super()
  }

  connect() {
    this.ws = new WebSocket('ws://localhost:80/gateway/web');
  }

  listenOnMessage(callbacks) {
    this.ws.onmessage = (message) => {
      const json = message.data
      const gm = new GatewayMessage().loadJson(json);
      console.log(gm)
      
      switch(gm.getOpcode()) {
        case GATEWAY_OPCODE.dispatch:
          console.log("Emit", gm.getEventName())
          this.emit(gm.getEventName(), gm.getData(), callbacks);
          break;
        case GATEWAY_OPCODE.welcome:
          // send Identify message
          this.send(new GatewayMessage().identify());
          break;
        default:
          break;
      }
    }
  }

  send(gatewayMessage) {
    this.ws.send(gatewayMessage);
  }

  disconnect() {
    this.ws.close();
  }
}
