'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SceneComponent } from './Scene'
import {Alignment, Choice, StoryPhase} from '@/app/types'
import { useRouter } from 'next/navigation'
import {coreScenes as scenes} from "@/lib/scenes";

interface NPC {
  name: string
  relationship: number // -100 to 100, where -100 is hostile, 0 is neutral, and 100 is friendly
}

interface GameState {
  currentScene: string
  alignmentScores: Record<Alignment, number>
  inventory: string[]
  npcs: Record<string, NPC>
  completedScenes: string[]
  currentStoryPhase: StoryPhase
}

export function Game() {
  const router = useRouter()
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'peaceful_beginning',
    alignmentScores: {
      Ljosbearer: 0,
      Skuggasmith: 0,
      Solheart: 0,
      Myrkrider: 0
    },
    inventory: [],
    npcs: {
      "Traveler": { name: "Traveler", relationship: 0 },
      "King Aella": { name: "King Aella", relationship: 0 },
      "Elder Bjorn": { name: "Elder Bjorn", relationship: 50 },
    },
    completedScenes: [],
    currentStoryPhase: StoryPhase.PEACEFUL_BEGINNINGS
  })

  useEffect(() => {
    const savedState = localStorage.getItem('gameState')
    if (savedState) {
      setGameState(JSON.parse(savedState))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState))
  }, [gameState])

  const currentScene = scenes[gameState.currentScene] || {
    id: 'error',
    text: 'An error occurred. Please start a new game.',
    location: 'Unknown',
    season: 'Unknown',
    choices: [],
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: false
  }

  const handleChoice = (choice: Choice) => {
    setGameState(prevState => {
      const newCompletedScenes = [...prevState.completedScenes, choice.nextScene]


      const newState = {
        ...prevState,
        currentScene: choice.nextScene,
        alignmentScores: {
          ...prevState.alignmentScores,
          [choice.alignment]: prevState.alignmentScores[choice.alignment] + 1
        },
        completedScenes: newCompletedScenes,
        // currentStoryPhase: newPhase,
        npcs: { ...prevState.npcs }
      }
      return newState
    })

    // Navigate to the next scene
    router.push(`/scene/${choice.nextScene}`)
  }

  return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Viking Alignment Adventure</CardTitle>
          <CardDescription>Your journey through the dawn of the Viking Age</CardDescription>
        </CardHeader>
        <CardContent>
          <SceneComponent scene={currentScene} onChoice={handleChoice} />
          {/*<AlignmentTrackerComponent alignmentScores={gameState.alignmentScores} />*/}
          {/*<NpcRelationshipTracker relationships={gameState.npcs} />*/}
          {/*<StoryProgressTrackerComponent*/}
          {/*    completedScenes={gameState.completedScenes}*/}
          {/*    currentPhase={gameState.currentStoryPhase}*/}
          {/*/>*/}
        </CardContent>
      </Card>
  )
}