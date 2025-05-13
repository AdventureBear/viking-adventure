import { StoryPhase, Choice, GameState } from '@/app/types'



// export interface GameState {
//     alignmentScores: Record<Alignment, number>
//     inventory: Record<string, number>
//     npcs: Record<string, NPC>
//     completedScenes: string[]
//     currentStoryPhase: StoryPhase
//     currentSceneId: string
//     flags: Record<string, boolean>
//     reputation: Record<string, number>
//     health: number
// }

export const initialGameState: GameState = {
    alignmentScores: {
        Ljosbearer: 0,
        Skuggasmith: 0,
        Solheart: 0,
        Myrkrider: 0
    },
    inventory: {},
    npcs: {
        "Traveler": { name: "Traveler", relationship: 0 },
        "King Aella": { name: "King Aella", relationship: 0 },
        "Elder Bjorn": { name: "Elder Bjorn", relationship: 50 },
    },
    completedScenes: [],
    currentStoryPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    currentSceneId: "village_gathering",
  flags: {},
  reputation: {},
  health: 10,
}

export function updateGameState(prevState: GameState, choice: Choice): GameState {
    const newCompletedScenes = [...prevState.completedScenes, choice.nextScene]

    // let newPhase = prevState.currentStoryPhase
    // if (storyArcStructure[newPhase].requiredScenes.every(scene => newCompletedScenes.includes(scene))) {
    //     const phaseOrder = Object.values(StoryPhase)
    //     const nextPhaseIndex = phaseOrder.indexOf(newPhase) + 1
    //     if (nextPhaseIndex < phaseOrder.length) {
    //         newPhase = phaseOrder[nextPhaseIndex]
    //     }
    // }

    const newState = {
        ...prevState,
        alignmentScores: {
            ...prevState.alignmentScores,
            [choice.alignment]: prevState.alignmentScores[choice.alignment] + 1
        },
        completedScenes: newCompletedScenes,
        // currentStoryPhase: newPhase,
        npcs: { ...prevState.npcs }
    }

    // Update NPC relationships based on the choice
    if (choice.nextScene === 'secret_meeting') {
        newState.npcs["Traveler"].relationship = Math.min(100, newState.npcs["Traveler"].relationship + 20)
    } else if (choice.nextScene === 'preemptive_strike') {
        newState.npcs["Traveler"].relationship = Math.max(-100, newState.npcs["Traveler"].relationship - 10)
    } else if (choice.nextScene === 'trade_agreement') {
        newState.npcs["King Aella"].relationship = Math.min(100, newState.npcs["King Aella"].relationship + 30)
    } else if (choice.nextScene === 'tribute_demand') {
        newState.npcs["King Aella"].relationship = Math.max(-100, newState.npcs["King Aella"].relationship - 50)
    }

    return newState
}