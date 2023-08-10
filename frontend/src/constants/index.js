export function getClans()
{
  return [
    'Banu Haqim', 
    'Brujah', 
    'Gangrel', 
    'Hecata', 
    'Lasombra', 
    'Malkavian', 
    'Ministry', 
    'Nosferatu', 
    'Ravnos', 
    'Salubri', 
    'Toreador', 
    'Tremere', 
    'Tzimisce', 
    'Ventrue', 
    'Caitiff',  
    'Thin Blood'
  ];
}

export function getPredatorTypes()
{
  return [
    'Alleycat',
    'Blood Leech',
    'Cleaver',
    'Consensualist',
    'Farmer',
    'Osiris',
    'Sandman',
    'Scene Queen',
    'Siren',
    'Extortionist',
    'Graverobber',
    'Roadside Killer',
    'Grim Reaper',
    'Montero',
    'Pursuer',
    'Trapdoor',
  ]
}

/**
 * Gateway opcodes
 */
export const GATEWAY_OPCODE = {  
  'dispatch': 0, // Recieve events
  'request': 1, // Send events
  'heartbeat': 2, // Send/Recieve heatbeats
  'identify': 3, // Identify self
  'welcome': 4, // Sent immediately after connecting
  'heartbeatACK': 5, // sent in response to receiving a heatbeat
  'refresh': 6, // Tempory code to refresh all gateway data 
}