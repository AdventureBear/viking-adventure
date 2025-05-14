'use client'

import { useParams, useRouter } from 'next/navigation'
import SceneComponent from '@/components/Scene'
// import {AlignmentTrackerComponent} from '@/components/AlignmentTracker'
import { allScenes, Choice as ChoiceType } from '@/lib/scenes'
import SceneCreator from '@/components/SceneCreator'
// import { updateGameState } from '@/lib/gameState'
// import {NpcRelationshipTracker} from "@/components/NpcRelationshipTracker"
import { StoryPhase } from '@/app/types'
import { useGameStore } from '@/store/gameStore'
import { runActions } from '@/engine/actionRunner'
// import { InventoryPanel } from '@/components/InventoryPanel'
// import { GameModal } from '@/components/GameModal'

// interface OpenLoop {
//   sceneId: string
//   choice: ChoiceType
// }

// interface StoryMetrics {
//   openLoops: number
//   closedLoops: number
//   completionPercentage: number
//   currentPhase: StoryPhase
// }
interface SceneInfo {
  id: string;
  name: string;
}

// interface SceneInfo {
//   id: string;
//   name: string;
// }

interface StoryMetrics {
  completionPercentage: number;
  currentPhase: StoryPhase;
  totalScenes: number;
}

function calculateCompletionLikelihood(storyMetrics: StoryMetrics): number {
  // As the story progresses, increase the likelihood of connecting to existing scenes
  return Math.min(0.8, storyMetrics.completionPercentage / 100 + 0.2);
}

function generateScenePrompt(sceneName: string, storyMetrics: StoryMetrics, existingScenes: SceneInfo[]): string {
  const formattedExistingScenes = existingScenes.map(scene => `${scene.id}: ${scene.name}`).join(", ");
  const completionLikelihood = calculateCompletionLikelihood(storyMetrics);
  const maxNewScenes = Math.max(1, Math.floor(20 - storyMetrics.totalScenes / 5)); // Decrease max new scenes as total scenes increase

  return `Create a scene "${sceneName}" for the Viking Alignment Adventure:

Current State:
- Phase: ${storyMetrics.currentPhase}
- Completion: ${storyMetrics.completionPercentage.toFixed(0)}%
- Total Scenes: ${storyMetrics.totalScenes}

Existing scenes: ${formattedExistingScenes}

Instructions:
1. Brief setting description (50 words max)
2. Location in Norse world
3. Season and year
4. Story phase (PEACEFUL_BEGINNINGS, FIRST_RAIDS, EXPANSION, SETTLEMENT, CONFLICT, or RESOLUTION)
5. Is it required for main storyline? (true/false)
6. Two to four choices (Ljosbearer, Skuggasmith, Solheart, Myrkrider)

Important:
- You have a ${(completionLikelihood * 100).toFixed(0)}% chance to connect each choice to an existing scene.
- You can create up to ${maxNewScenes} new scene(s) if needed.
- Prioritize connecting to existing scenes that advance the story timeline.
- If creating a new scene, use a descriptive name that fits the story context.

Format:
{
  "id": "${sceneName}",
  "text": "Scene description",
  "location": "Location",
  "season": "Season and year",
  "storyPhase": "PHASE",
  "isRequired": boolean,
  "choices": [
    {
      "text": "Choice text",
      "alignment": "Alignment",
      "nextScene": "Existing scene ID or new scene name"
    },
    // 1 to 3 more choices
  ]
}

Ensure the scene fits the Viking Age setting and advances the story.`
}

// function formatOpenLoops(openLoops: OpenLoop[]): string {
//   if (openLoops.length === 0) {
//     return "No open loops.";
//   }
//
//   return openLoops.slice(0, 3).map((loop, index) =>
//       `Open Loop ${index + 1}: "${loop.choice.text}" (from "${loop.sceneId}")`
//   ).join('\n');
// }
export default function Page() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const { gameState } = useGameStore()

  const currentScene = allScenes[id]
  //Should only run when etnering the current scene
  console.log(`\n#########################\n Entering ${currentScene.name} with ${currentScene.actions?.length ?? 0} actions`)
  if (currentScene.actions) {
    runActions(currentScene.actions, "onEnter", gameState)
  }

  const handleChoice = (choice: ChoiceType) => {
    console.log(`Exiting scene ${currentScene.name} to ${choice.nextScene}`)
    
    if (currentScene.actions) {
      console.log('Running actions, onExit:', currentScene.actions)
      runActions(currentScene.actions, "onExit", gameState)
    }
    router.push(`/scene/${choice.nextScene}`)
  }

  const calculateStoryMetrics = (): StoryMetrics => {
    const completionPercentage = (gameState.completedScenes.length / Object.keys(allScenes).length) * 100;
    const totalScenes = Object.keys(allScenes).length;

    return {
      completionPercentage,
      currentPhase: gameState.currentStoryPhase,
      totalScenes,
    };
  };

  if (!currentScene) {
    const storyMetrics = calculateStoryMetrics();
    const existingScenes: SceneInfo[] = Object.entries(allScenes).map(([id, scene]) => ({
      id,
      name: scene.name
    }));
    return <SceneCreator
        sceneId={id}
        initialPrompt={generateScenePrompt(id, storyMetrics, existingScenes)}
    />;
  }

  return (
    <div className="w-full min-h-screen bg-[#1a1a1a] text-amber-50">
      <SceneComponent sceneId={id} onChoice={handleChoice} />
    </div>
  )
}