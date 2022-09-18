import { createContext, useState, useEffect } from 'react';

export const GatewayContext = createContext(null);
export const UserContext = createContext(null);

class WsGateway {
  constructor() {
    this.ws = new WebSocket('ws://localhost:8000/gateway/web');
  }

  listenOnMessage(setUser) {
    this.ws.onmessage = (message) => {
      console.log(message);
      setUser(message.data)
    }
  }

  listenOnOpen() {
    this.ws.onopen = () => {this.send("Hello World")};
  }

  send(message) {
    this.ws.send(message);
  }

  disconnect() {
    this.ws.close();
  }
}

let gateway = new WsGateway();

export default function Gateway({ children }) {
  // Gatway State
  const [user, setUser] = useState(null);

  useEffect(() =>{
    gateway.listenOnOpen();
    gateway.listenOnMessage(setUser);
  }, []); // only happens on site load

  return (
    <GatewayContext.Provider value={gateway}>
      <UserContext.Provider value={user}>
        { children }
      </UserContext.Provider>
    </GatewayContext.Provider>
  )
}