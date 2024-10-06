'use client'

import { Scene, Alignment } from '../lib/scenes'
import { StoryPhase, storyArcStructure } from '../lib/storyArc'

export function generateMissingScene(sceneId: string): Scene | null {
  // Find the phase this scene belongs to
  const phase = Object.entries(storyArcStructure).find(([_, data]) => 
    data.requiredScenes.includes(sceneId) || data.optionalScenes.includes(sceneId)
  )?.[0] as StoryPhase | undefined

  if (!phase) return null

  return {
    id: sceneId,
    text: `This is a placeholder for the ${sceneId} scene in the ${phase} phase. The scene content needs to be created.`,
    location: "Unknown Location",
    season: "Unknown Season",
    storyPhase: phase,
    isRequired: storyArcStructure[phase].requiredScenes.includes(sceneId),
    choices: [
      {
        text: "Placeholder choice 1",
        alignment: 'Ljosbearer',
        nextScene: 'peaceful_beginning'
      },
      {
        text: "Placeholder choice 2",
        alignment: 'Skuggasmith',
        nextScene: 'peaceful_beginning'
      },
      {
        text: "Placeholder choice 3",
        alignment: 'Solheart',
        nextScene: 'peaceful_beginning'
      },
      {
        text: "Placeholder choice 4",
        alignment: 'Myrkrider',
        nextScene: 'peaceful_beginning'
      }
    ]
  }
}