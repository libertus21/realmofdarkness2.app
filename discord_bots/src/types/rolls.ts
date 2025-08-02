/**
 * Dice-roll argument definitions used by 5th-edition Werewolf modules.
 */
import type { CharacterSelection } from "./characters";

export interface WtaArgs {
  pool: number | null;
  rage: number | null;
  autoRage: boolean;
  difficulty: number | null;
  spec: string | null;
  rageCheck: string | null;
  doubleRageCheck: string | null;
  notes: string | null;
  character: CharacterSelection;
}

export interface RiteArgs {
  pool: number | null;
  rage: number | null;
  useCharRage: boolean;
  trainedParticipants: number | null;
  participants: number | null;
  difficulty: number | null;
  spec: string | null;
  rageCheck: string | null;
  notes: string | null;
  character: CharacterSelection;
}
