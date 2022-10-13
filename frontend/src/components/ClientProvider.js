import { createContext, useState, useEffect } from 'react';
import Client from '../structures/Client';
export const ClientContext = createContext(null);
export const UserContext = createContext(null);
export const CharactersContext = createContext(null);
export const ChroniclesContext = createContext(null);

let client = new Client();

export default function ClientProvider({ children }) {
  // Gatway State
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [chronicles, setChronicles] = useState(null);

  useEffect(() =>{    
    client.handleGatewayEvents({
      setUser: setUser,
      setCharacters: setCharacters,
      setChronicles: setChronicles
    });
  }, []); // only happens on site load

  return (
    <ClientContext.Provider value={client}>
      <UserContext.Provider value={user}>
        <CharactersContext.Provider value={characters}>
          <ChroniclesContext.Provider value={chronicles}>
            { children }
          </ChroniclesContext.Provider>
        </CharactersContext.Provider>
      </UserContext.Provider>
    </ClientContext.Provider>
  )
}