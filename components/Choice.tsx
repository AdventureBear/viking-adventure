'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Choice as ChoiceType } from '../lib/scenes'

interface ChoiceProps {
  choice: ChoiceType
  onSelect: () => void
}

export function ChoiceComponent({ choice, onSelect }: ChoiceProps) {
  return (
    <Button
      onClick={onSelect}
      className="w-full mb-2 justify-start text-left"
      variant="outline"
    >
      {choice.text}
    </Button>
  )
}