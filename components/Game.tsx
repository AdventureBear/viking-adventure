'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { scenes, Scene as SceneType, Choice as ChoiceType, Alignment } from '../lib/scenes'
import {SceneComponent} from './Scene'
import {AlignmentTrackerComponent} from './AlignmentTracker'

import {StoryProgressTrackerComponent} from './StoryProgressTracker'
import { StoryPhase, storyArcStructure } from '../lib/storyArc'
import { generateMissingScene } from './scene-generator'
import {NpcRelationshipTracker} from "@/components/NpcRelationshipTracker";

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
Scene: ${sceneName}
Text: [Vivid description of the scene]
Location: [Specific location]
Season: [Season and year]
StoryPhase: [One of the story phases]
IsRequired: [true/false]
Choices:
1. [Choice text] (Alignment: [Alignment]) -> Next scene: [Next scene name]
2. [Choice text] (Alignment: [Alignment]) -> Next scene: [Next scene name]
3. [Choice text] (Alignment: [Alignment]) -> Next scene: [Next scene name]
4. [Choice text] (Alignment: [Alignment]) -> Next scene: [Next scene name]

Please ensure that the scene and choices align with the overall story arc and contribute to the player's journey through the Viking Age.`}

export function Game() {
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
  const [missingScene, setMissingScene] = useState<string | null>(null)
  const [scenePrompt, setScenePrompt] = useState<string>('')

  const currentScene = scenes[gameState.currentScene] || {
    id: 'error',
    text: 'An error occurred. Please start a new game.',
    location: 'Unknown',
    season: 'Unknown',
    choices: [],
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: false
  }

  const handleChoice = (choice: ChoiceType) => {
    if (scenes[choice.nextScene]) {
      setGameState(prevState => {
        const newScene = scenes[choice.nextScene]
        const newCompletedScenes = [...prevState.completedScenes, choice.nextScene]
        
        // Check if we need to advance to the next story phase
        let newPhase = prevState.currentStoryPhase
        if (storyArcStructure[newPhase].requiredScenes.every(scene => newCompletedScenes.includes(scene))) {
          const phaseOrder = Object.values(StoryPhase)
          const nextPhaseIndex = phaseOrder.indexOf(newPhase) + 1
          if (nextPhaseIndex < phaseOrder.length) {
            newPhase = phaseOrder[nextPhaseIndex]
          }
        }

        const newState = {
          ...prevState,
          currentScene: choice.nextScene,
          alignmentScores: {
            ...prevState.alignmentScores,
            [choice.alignment]: prevState.alignmentScores[choice.alignment] + 1
          },
          completedScenes: newCompletedScenes,
          currentStoryPhase: newPhase,
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
      })
      setMissingScene(null)
    } else {
      const generatedScene = generateMissingScene(choice.nextScene)
      if (generatedScene) {
        scenes[choice.nextScene] = generatedScene
        handleChoice(choice) // Recursively call handleChoice with the new scene
      } else {
        setMissingScene(choice.nextScene)
        setScenePrompt(generateScenePrompt(choice.nextScene))
      }
    }
  }

  const handleSceneCreation = () => {
    // This function would be used to handle the created scene data
    // For now, it just clears the missing scene state
    setMissingScene(null)
    setScenePrompt('')
  }

  if (missingScene) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Scene Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Missing Scene</AlertTitle>
            <AlertDescription>
              The scene &#34;{missingScene}&#34; does not exist. Here&#39;s a prompt to create this scene:
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Textarea
              value={scenePrompt}
              onChange={(e) => setScenePrompt(e.target.value)}
              rows={20}
              className="w-full"
            />
            <Button onClick={handleSceneCreation} className="mt-2">
              Scene Created (Clear Prompt)
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Viking Alignment Adventure</CardTitle>
        <CardDescription>Your journey through the dawn of the Viking Age</CardDescription>
      </CardHeader>
      <CardContent>
        <SceneComponent scene={currentScene} onChoice={handleChoice} />
        <AlignmentTrackerComponent  alignmentScores={gameState.alignmentScores} />
        <NpcRelationshipTracker relationships={gameState.npcs} />
        <StoryProgressTrackerComponent
          completedScenes={gameState.completedScenes} 
          currentPhase={gameState.currentStoryPhase} 
        />
      </CardContent>
    </Card>
  )
}