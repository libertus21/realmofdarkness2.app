const { GatewayManager } = require("./GatewayManager");
const GatewayEvents = require('../gateway/GatewayEvents');


module.exports = class Client 
{
  constructor() {
    this.gatewayManager = new GatewayManager();        
    this.gatewayManager.connect()
  }

  handleGatewayEvents(contextSetters) 
  {
    for(const key of Object.keys(GatewayEvents)) {   
      const event = GatewayEvents[key];
      this.gatewayManager.on(event.name, (...args) => event.execute(...args));
    }
    this.gatewayManager.listenOnMessage(contextSetters);
  }

  refresh()
  {
    this.gatewayManager.refresh();
  }
}