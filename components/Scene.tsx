'use client'

import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Choice as ChoiceType, Scene as SceneType } from '../lib/scenes'
import {ChoiceComponent} from './Choice'

interface SceneProps {
  scene: SceneType
  onChoice: (choice: ChoiceType) => void
}

export function SceneComponent({ scene, onChoice }: SceneProps) {
  return (
    <>
      <div className="mb-4 text-sm text-muted-foreground">
        <p><strong>Location:</strong> {scene.location}</p>
        <p><strong>Season:</strong> {scene.season}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Current Scenario:</h2>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <p className="text-sm leading-relaxed">{scene.text}</p>
        </ScrollArea>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Your Choices:</h3>
        {scene.choices.map((choice, index) => (
          <ChoiceComponent key={index} choice={choice} onSelect={() => onChoice(choice)} />
        ))}
      </div>
    </>
  )
}