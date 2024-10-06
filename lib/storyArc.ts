export enum StoryPhase {
  PEACEFUL_BEGINNINGS = 'PEACEFUL_BEGINNINGS',
  FIRST_RAIDS = 'FIRST_RAIDS',
  EXPANSION = 'EXPANSION',
  SETTLEMENT = 'SETTLEMENT',
  CONFLICT = 'CONFLICT',
  RESOLUTION = 'RESOLUTION'
}

interface StoryArcPhase {
  name: string;
  description: string;
  requiredScenes: string[];
  optionalScenes: string[];
}

export const storyArcStructure: Record<StoryPhase, StoryArcPhase> = {
  [StoryPhase.PEACEFUL_BEGINNINGS]: {
    name: "Peaceful Beginnings",
    description: "The calm before the storm, where players experience daily Viking life.",
    requiredScenes: ["village_life", "first_trade"],
    optionalScenes: ["family_feast", "local_dispute"]
  },
  [StoryPhase.FIRST_RAIDS]: {
    name: "First Raids",
    description: "The initial forays into raiding, marking the start of the Viking Age.",
    requiredScenes: ["raid_preparation", "first_landfall"],
    optionalScenes: ["coastal_skirmish", "loot_division"]
  },
  [StoryPhase.EXPANSION]: {
    name: "Expansion",
    description: "Vikings begin to explore and settle in new lands.",
    requiredScenes: ["new_settlement", "cultural_exchange"],
    optionalScenes: ["map_making", "foreign_alliance"]
  },
  [StoryPhase.SETTLEMENT]: {
    name: "Settlement",
    description: "Establishing permanent presence in new territories.",
    requiredScenes: ["build_longhouse", "winter_survival"],
    optionalScenes: ["native_conflict", "trade_route_establishment"]
  },
  [StoryPhase.CONFLICT]: {
    name: "Conflict",
    description: "Major battles and political struggles shape the Viking world.",
    requiredScenes: ["rival_jarls", "siege_warfare"],
    optionalScenes: ["peace_negotiation", "blood_feud"]
  },
  [StoryPhase.RESOLUTION]: {
    name: "Resolution",
    description: "The conclusion of the Viking Age and its lasting impact.",
    requiredScenes: ["legacy_evaluation", "new_era_dawn"],
    optionalScenes: ["elder_wisdom", "saga_composition"]
  }
}