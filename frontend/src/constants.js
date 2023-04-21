
/**
 * Gateway opcodes
 */
module.exports.GATEWAY_OPCODE = {  
  'dispatch': 0, // Recieve events
  'request': 1, // Send events
  'heartbeat': 2, // Send/Recieve heatbeats
  'identify': 3, // Identify self
  'welcome': 4, // Sent immediately after connecting
  'heartbeatACK': 5, // sent in response to receiving a heatbeat
  'refresh': 6, // Tempory code to refresh all gateway data 
}