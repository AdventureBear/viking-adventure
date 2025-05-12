'use client'

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllScenes } from '@/lib/sceneUtils'
import SceneGraph from './SceneGraph'
import {TimelineIssuesComponent} from './TimelineIssues'
import OpenLoopsComponent from './OpenLoops'
import {Choice} from "@/app/types";

export default function DeveloperDashboard() {
    const allScenes = useMemo(() => getAllScenes(), [])

    const sceneConnections = useMemo(() => {
        const connections: { source: string; target: string }[] = []
        Object.values(allScenes).forEach(scene => {
            scene.choices.forEach((choice: { nextScene: string }) => {
                connections.push({ source: scene.id, target: choice.nextScene })
            })
        })
        return connections
    }, [allScenes])




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


        </div>
    )
}