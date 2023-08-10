import { Ready } from './events/ready';
import { character_update } from './events/character_update';
import { member_update } from './events/member_update';
import { user_update } from './events/user_update';
import { chronicle_update } from './events/chronicle_update';
import { character_delete } from './events/delete_character';

export const GatewayEvents = {
  ready: Ready,
  character_update: character_update,
  member_update: member_update,
  user_update: user_update,
  chronicle_update: chronicle_update,
  character_delete: character_delete,
}