/**
 * Common character-related TypeScript types shared across bot modules.
 * These replace many ad-hoc `any` usages and allow us to migrate the dice
 * modules (rageRoll, wtaRoll, riteRoll) to strict typing.
 */
import { ColorResolvable } from "discord.js";

/** Basic tracker (Rage, Hunger, Willpower, etc.). */
export interface Tracker {
  current: number;
  total?: number;
}

/**
 * Minimal information we reliably get from the backend for any character.
 * Extend this if more fields are required.
 */
export interface TrackedCharacterBase {
  id: string;
  name: string;
  thumbnail?: string;
  splat: {
    slug: string;
  };
  rage?: Tracker;
  hunger?: Tracker;
  // ...add other trackers when needed
}

/**
 * Result returned by the helper `getCharacter()`.
 * If the character is not being tracked, `tracked` is undefined.
 */
export interface CharacterSelection<T extends TrackedCharacterBase = TrackedCharacterBase> {
  name: string;
  tracked?: T;
}

/** Helper interface for Rage roll results. */
export interface RageRollResult {
  dice: number[];
  passed: boolean;
}

export interface RageResults {
  decreased: number;
  rolls: RageRollResult[];
  toString: string;
  color: ColorResolvable;
}
