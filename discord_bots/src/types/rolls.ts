/**
 * Dice-roll argument definitions used by 5th-edition Werewolf modules.
 */
import type { CharacterSelection } from "./characters";

export interface WtaArgs {
  pool: number | null; // Base dice pool
  rage: number | null; // Rage dice supplied directly
  autoRage: boolean; // Whether to pull rage dice from character
  difficulty: number | null;
  spec: string | null;
  rageCheck: string | null; // "Reroll" | null
  doubleRageCheck: string | null; // "Reroll" | null
  notes: string | null;
  character: CharacterSelection;
}
