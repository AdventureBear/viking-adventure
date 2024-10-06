'use client'

import { scenes, Scene } from './scenes'

const dynamicallyGeneratedScenes: Record<string, Scene> = {}

export function addDynamicallyGeneratedScene(scene: Scene) {
  dynamicallyGeneratedScenes[scene.id] = {
    ...scene,
    isDynamicallyGenerated: true
  }
}

export function getAllScenes(): Record<string, Scene> {
  return { ...scenes, ...dynamicallyGeneratedScenes }
}