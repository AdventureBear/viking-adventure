'use client'

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StoryPhase, storyArcStructure } from '@/lib/storyArc'
import { Scene } from '@/lib/scenes'
import { getAllScenes } from '@/lib/sceneUtils'
import SceneGraph from './SceneGraph'
import {TimelineIssuesComponent} from './TimelineIssues'
import OpenLoopsComponent from './OpenLoops'

export default function DeveloperDashboard() {
    const allScenes = useMemo(() => getAllScenes(), [])

    const sceneConnections = useMemo(() => {
        const connections: { source: string; target: string }[] = []
        Object.values(allScenes).forEach(scene => {
            scene.choices.forEach(choice => {
                connections.push({ source: scene.id, target: choice.nextScene })
            })
        })
        return connections
    }, [allScenes])

    const getScenesByPhase = (phase: StoryPhase) => {
        return Object.values(allScenes).filter(scene => scene.storyPhase === phase)
    }

    const getPhaseCrossings = () => {
        return sceneConnections.filter(connection => {
            const sourceScene = allScenes[connection.source]
            const targetScene = allScenes[connection.target]
            return sourceScene && targetScene && sourceScene.storyPhase !== targetScene.storyPhase
        })
    }

    const phaseCrossings = useMemo(getPhaseCrossings, [sceneConnections, allScenes])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Developer Dashboard</h1>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Story Graph</CardTitle>
                </CardHeader>
                <CardContent>
                    <SceneGraph scenes={allScenes} connections={sceneConnections} />
                </CardContent>
            </Card>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Timeline Issues</CardTitle>
                </CardHeader>
                <CardContent>
                    <TimelineIssuesComponent scenes={allScenes} />
                </CardContent>
            </Card>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Open Loops</CardTitle>
                </CardHeader>
                <CardContent>
                    <OpenLoopsComponent scenes={allScenes} connections={sceneConnections} />
                </CardContent>
            </Card>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Story Phase Crossings</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {phaseCrossings.map((crossing, index) => (
                            <li key={index}>
                                {crossing.source} ({allScenes[crossing.source]?.storyPhase}) →{' '}
                                {crossing.target} ({allScenes[crossing.target]?.storyPhase})
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {Object.entries(storyArcStructure).map(([phase, phaseData]) => (
                <Card key={phase} className="mb-4">
                    <CardHeader>
                        <CardTitle>{phaseData.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-2">{phaseData.description}</div>
                        <div className="mb-2">
                            <strong>Required Scenes:</strong>
                            <div className="flex flex-wrap gap-2">
                                {phaseData.requiredScenes.map(sceneId => (
                                    <Badge key={sceneId} variant={allScenes[sceneId] ? "default" : "outline"}>
                                        {sceneId}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="mb-2">
                            <strong>Optional Scenes:</strong>
                            <div className="flex flex-wrap gap-2">
                                {phaseData.optionalScenes.map(sceneId => (
                                    <Badge key={sceneId} variant={allScenes[sceneId] ? "default" : "outline"}>
                                        {sceneId}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <strong>All Scenes in Phase:</strong>
                            <div className="flex flex-wrap gap-2">
                                {getScenesByPhase(phase as StoryPhase).map(scene => (
                                    <Badge key={scene.id}>{scene.id}</Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}