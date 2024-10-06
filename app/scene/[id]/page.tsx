'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {SceneComponent} from '@/components/Scene'
import {AlignmentTrackerComponent} from '@/components/AlignmentTracker'
import {StoryProgressTrackerComponent} from '@/components/StoryProgressTracker'
import { scenes, Scene as SceneType, Choice as ChoiceType } from '@/lib/scenes'
import { StoryPhase } from '@/lib/storyArc'
import SceneCreator from '@/components/SceneCreator'
import { GameState, initialGameState, updateGameState } from '@/lib/gameState'
import {NpcRelationshipTracker} from "@/components/NpcRelationshipTracker";



function generateScenePrompt(sceneName: string): string {
  return `Please create a detailed scene for "${sceneName}" in the Viking Alignment Adventure game. Include:

1. A vivid description of the setting and situation (about 100-150 words).
2. The specific location within the Norse world.
3. The season and year (if applicable).
4. The story phase this scene belongs to (PEACEFUL_BEGINNINGS, FIRST_RAIDS, EXPANSION, SETTLEMENT, CONFLICT, or RESOLUTION).
5. Whether this scene is required for the main storyline (true or false).
6. Four distinct choices for the player, each aligning with one of the game's alignments (Ljosbearer, Skuggasmith, Solheart, Myrkrider).
7. The next scene name for each choice.

Example format:
{
  "id": "${sceneName}",
  "text": "Vivid description of the scene",
  "location": "Specific location",
  "season": "Season and year",
  "storyPhase": "One of the story phases",
  "isRequired": true or false,
  "choices": [
    {
      "text": "Choice text",
      "alignment": "Alignment",
      "nextScene": "Next scene name"
    },
    // ... three more choices ...
  ]
}

Please ensure that the scene and choices align with the overall story arc and contribute to the player's journey through the Viking Age.`
}

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  useEffect(() => {
    const savedState = localStorage.getItem('gameState')
    if (savedState) {
      setGameState(JSON.parse(savedState))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState))
  }, [gameState])

  const currentScene = scenes[id as string]

  const handleChoice = (choice: ChoiceType) => {
    const newGameState = updateGameState(gameState, choice)
    setGameState(newGameState)
    router.push(`/scene/${choice.nextScene}`)
  }

  if (!currentScene) {
    return <SceneCreator sceneId={id as string} initialPrompt={generateScenePrompt(id as string)} />
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Viking Alignment Adventure</CardTitle>
        <CardDescription>Your journey through the dawn of the Viking Age</CardDescription>
      </CardHeader>
      <CardContent>
        <SceneComponent scene={currentScene} onChoice={handleChoice} />
        <AlignmentTrackerComponent alignmentScores={gameState.alignmentScores} />
        <NpcRelationshipTracker relationships={gameState.npcs} />
        <StoryProgressTrackerComponent
          completedScenes={gameState.completedScenes}
          currentPhase={gameState.currentStoryPhase}
        />
      </CardContent>
    </Card>
  )
}