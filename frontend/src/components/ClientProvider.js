import { createContext, useState, useEffect } from 'react';
const Client = require('../structures/Client');

export const ClientContext = createContext(null);
export const UserContext = createContext(null);
export const CharactersContext = createContext(null);

let client = new Client();

export default function ClientProvider({ children }) {
  // Gatway State
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState(null);

  useEffect(() =>{
    
    client.handleGatewayEvents({
      setUser: setUser,
      setCharacters: setCharacters
    });
  }, []); // only happens on site load

  return (
    <ClientContext.Provider value={client}>
      <UserContext.Provider value={user}>
        <CharactersContext.Provider value={characters}>
          { children }
        </CharactersContext.Provider>
      </UserContext.Provider>
    </ClientContext.Provider>
  )
}