'use client'

import React from 'react'
import { Progress } from "@/components/ui/progress"
import { Alignment } from '../lib/scenes'

interface AlignmentTrackerProps {
  alignmentScores: Record<Alignment, number>
}

export function AlignmentTrackerComponent({ alignmentScores }: AlignmentTrackerProps) {
  const getDominantAlignment = (): Alignment => {
    return Object.entries(alignmentScores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as Alignment
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">Your Alignment:</h3>
      <p>Dominant Alignment: {getDominantAlignment()}</p>
      <div className="grid grid-cols-2 gap-4">
        {(Object.entries(alignmentScores) as [Alignment, number][]).map(([alignment, score]) => (
          <div key={alignment}>
            <p className="font-semibold">{alignment}</p>
            <Progress value={score * 20} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}