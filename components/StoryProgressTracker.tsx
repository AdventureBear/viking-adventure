'use client'

import React from 'react'
import { Progress } from "@/components/ui/progress"
import { StoryPhase, storyArcStructure } from '../lib/storyArc'

interface StoryProgressTrackerProps {
  completedScenes: string[]
  currentPhase: StoryPhase
}

export function StoryProgressTrackerComponent({ completedScenes, currentPhase }: StoryProgressTrackerProps) {
  const calculatePhaseProgress = (phase: StoryPhase) => {
    const phaseScenes = storyArcStructure[phase].requiredScenes.concat(storyArcStructure[phase].optionalScenes)
    const completedPhaseScenes = completedScenes.filter(scene => phaseScenes.includes(scene))
    return (completedPhaseScenes.length / phaseScenes.length) * 100
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">Story Progress:</h3>
      {Object.values(StoryPhase).map((phase) => (
        <div key={phase} className="mb-2">
          <p className="font-semibold">{phase}</p>
          <Progress value={calculatePhaseProgress(phase)} className="w-full" />
        </div>
      ))}
      <p className="mt-2">Current Phase: {currentPhase}</p>
    </div>
  )
}