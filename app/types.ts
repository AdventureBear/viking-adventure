export enum Alignment {
    Ljosbearer = "Ljosbearer",
    Skuggasmith = "Skuggasmith",
    Solheart = "Solheart",
    Myrkrider = "Myrkrider",
    PEACEFUL = 'PEACEFUL',
    NEUTRAL = 'NEUTRAL',
    AGGRESSIVE = 'AGGRESSIVE'
}

export enum StoryPhase {
    PEACEFUL_BEGINNINGS = "PEACEFUL_BEGINNINGS",
    FIRST_VENTURES = "FIRST_VENTURES",
    EXPANSION = "EXPANSION",
    CONFLICT = "CONFLICT",
    SETTLEMENT = "SETTLEMENT",
    LEGACY = "LEGACY"
}

export interface Choice {
    text: string;
    alignment: Alignment;
    nextScene: string;
}

export interface Scene {
    id: string;
    name: string;
    text: string;
    location: string;
    season: string;
    storyPhase: StoryPhase;
    isRequired: boolean;
    isDynamicallyGenerated?: boolean;
    imageUrl?: string;
    choices: {
        text: string;
        nextScene: string;
        alignment?: Alignment;
    }[];
}

export interface GameState {
    currentSceneId: string;
    alignmentScores: Record<Alignment, number>;
    completedScenes: string[];
    currentStoryPhase: StoryPhase;
}

export interface NpcRelationship {
    npcId: string;
    name: string;
    affinity: number;
    alignment: Alignment;
}

export interface PlayerCharacter {
    name: string;
    dominantAlignment: Alignment;
    relationships: NpcRelationship[];
}

export interface ProgressTrackerProps {
    currentPhase: StoryPhase;
    phaseProgress: number;
    totalPhases: number;
    dominantAlignment: Alignment;
    keyDecisions: string[];
}

export interface SceneGraphNode {
    id: string;
    name: string;
    children: SceneGraphNode[];
}

export interface SceneCreatorProps {
    onSceneCreated: (newScene: Scene) => void;
}

export interface NpcRelationshipTrackerProps {
    relationships: NpcRelationship[];
}

export interface AlignmentTrackerComponentProps {
    alignmentScores: Record<Alignment, number>;
}

export interface StoryProgressTrackerComponentProps {
    completedScenes: string[];
    currentPhase: StoryPhase;
}

export interface SceneComponentProps {
    scene: Scene;
    onChoiceMade: (choice: Choice) => void;
}