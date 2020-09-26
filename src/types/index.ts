import { Response, Request } from 'express';

export type BasicRoute = {
  req: Request;
  res: Response;
};

export type Tier = 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
export type Type = 'consumable' | 'normal';

export type Action = {
  name: string;
  description: string;
  icon: string;
};
export type Enemy = {
  name: string;
  description: string;
  type: Type;
  hp: number;
  tier: Tier;
  gold: number;
  exp: number;
  loot: string[]; // IDs of items enemy can drop
  location: string[]; // IDs of locations enemy can be encountered
};
export type Event = {
  name: string;
  description: string;
  icon: string;
};
export type Item = {
  name: string;
  description: string;
  type: Type;
  tier: Tier;
};
export type Location = {
  name: string;
  description: string;
  icon: string;
};
export type NPC = {
  name: string;
  description: string;
  icon: string;
  hp: number;
  tier: Tier;
};
