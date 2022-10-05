const { EventEmitter } = require('events');
const GatewayMessage = require('./GatewayMessage');
const { GATEWAY_OPCODE } = require('../constants');

module.exports.GatewayManager = class extends EventEmitter {
  constructor() {
    super();
  }
  
  connect() {
    this.ws = new WebSocket('ws://localhost/gateway/web');
  }

  listenOnMessage(contextSetters) {
    this.ws.onmessage = (message) => {
      const json = message.data
      const gm = new GatewayMessage().loadJson(json);
      
      switch(gm.getOpcode()) {
        case GATEWAY_OPCODE.dispatch:
          this.emit(gm.getEventName(), gm.getData(), contextSetters);
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
    this.ws.send(gatewayMessage.toJson());
  }

  disconnect() {
    this.ws.close();
  }
}
