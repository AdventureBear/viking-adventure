'use client'

import React, { useRef, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Choice as ChoiceType, Scene as SceneType } from '@/app/types'
import {ChoiceComponent} from './Choice'
import Image from 'next/image'
import { InventoryPanel } from './InventoryPanel'
import { MessageBox } from './MessageBox'
import { useGameStore } from '@/store/gameStore'
import { useModalStore } from '@/store/modalStore'

interface SceneProps {
  scene: SceneType
  onChoice: (choice: ChoiceType) => void
}

export function SceneComponent({ scene, onChoice }: SceneProps) {
  const [imageUrl, setImageUrl] = useState(scene.imageUrl || 'https://placehold.co/1920x1080/2d2d2d/ffffff?text=Viking+Adventure+Scene');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { gameState } = useGameStore();
  const currentModal = useModalStore((state) => state.current());

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Handle file upload logic here
    setUploading(false);
  };

  return (
    <div className="relative h-screen flex flex-col">
      {/* Cinematic image - takes up 60% of the screen height */}
      <div className="w-full h-[60vh] relative">
        <Image
          priority
          width={1920}
          height={1080}
          src={imageUrl}
          alt="Scene landscape"
          className="w-full h-full object-cover"
          style={{ opacity: uploading ? 0.5 : 1 }}
        />
        {!scene.imageUrl && (
          <>
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={handleImageClick}
            >
              <span className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded">
                {uploading ? 'Uploading...' : 'Click to upload image'}
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </>
        )}
      </div>

      {/* Scene content - takes up remaining 40% */}
      <div className="flex-1 bg-[#1a1a1a] p-4">
        <div className="h-full flex flex-col gap-4">
          {/* Row 1: Scene Description */}
          <div className="flex flex-col">
            {/* Location and Season */}
            <div className="flex justify-between text-amber-200/90 mb-2 border-b border-amber-900/50 pb-2">
              <p className="font-runic text-sm">
                <span className="text-amber-400">Location:</span> {scene.location}
              </p>
              <p className="font-runic text-sm">
                <span className="text-amber-400">Season:</span> {scene.season}
              </p>
            </div>

            {/* Scene Title and Description */}
            <div>
              <h2 className="text-xl font-bold text-amber-200 mb-2 font-runic">{scene.name}</h2>
              <ScrollArea className="h-[80px] w-full rounded-md border border-amber-900/30 bg-[#2d2d2d] p-3">
                <p className="text-amber-100/90 text-sm leading-relaxed">{scene.text}</p>
              </ScrollArea>
            </div>
          </div>

          {/* Row 2: Message Box or Navigation Choices */}
          <div className="flex-1">
            {currentModal ? (
              <MessageBox />
            ) : (
              <div>
                <h3 className="text-sm font-bold text-amber-200 border-b border-amber-900/50 pb-1 mb-2">Your Choices:</h3>
                <div className="grid gap-2">
                  {scene.choices.map((choice, index) => (
                    <ChoiceComponent key={index} choice={choice} onSelect={() => onChoice(choice)} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Features (3 columns) */}
          <div className="grid grid-cols-3 gap-4">
            {/* Inventory */}
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-amber-900/30 rounded-lg p-3">
              <InventoryPanel inventory={gameState.inventory} flags={gameState.flags} />
            </div>
            
            {/* Calendar */}
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-amber-900/30 rounded-lg p-3">
              <h3 className="text-sm font-bold text-amber-200 font-runic mb-2">Calendar</h3>
              <p className="text-xs text-amber-400/70">Coming soon...</p>
            </div>
            
            {/* Weather */}
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-amber-900/30 rounded-lg p-3">
              <h3 className="text-sm font-bold text-amber-200 font-runic mb-2">Weather</h3>
              <p className="text-xs text-amber-400/70">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}