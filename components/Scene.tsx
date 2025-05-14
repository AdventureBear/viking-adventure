'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Choice as ChoiceType } from '@/app/types'
import Image from 'next/image'
// import { MessageBox } from './MessageBox'
import { useGameStore } from '@/store/gameStore'
import { useModalStore } from '@/store/modalStore'
import { allScenes } from '@/lib/scenes'
import { MenuPopover } from './MenuPopover'
import { handleModalChoice } from '@/engine/actionRunner'
import { InventoryPanel } from '@/components/InventoryPanel'
import { AchievementsPanel } from '@/components/AchievementsPanel'

interface SceneProps {
  sceneId: string
  onChoice: (choice: ChoiceType) => void
}

export default function SceneComponent({ sceneId, onChoice }: SceneProps) {
  const gameState = useGameStore((state) => state.gameState)
  const scene = allScenes[sceneId]
  const modal = useModalStore((state) => state.current())

  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [localImageUrl, setLocalImageUrl] = useState(scene.imageUrl)
  const [showMenu, setShowMenu] = useState(false)
  const [descExpanded, setDescExpanded] = useState(false)
  const descRef = useRef<HTMLDivElement>(null)
  const descTextRef = useRef<HTMLDivElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)


  // Check if the description is actually truncated (overflows 3 lines)
  useEffect(() => {
    if (descTextRef.current && !descExpanded) {
      const el = descTextRef.current;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight || '20');
      const maxHeight = lineHeight * 3.2; // add buffer for 3 lines
      setIsTruncated(el.scrollHeight > maxHeight + 2); // +2 for rounding
    } else {
      setIsTruncated(false);
    }
  }, [scene.text, descExpanded]);

  if (!scene) return <div>Scene not found.</div>

  // Fallback image URL if scene.imageUrl is undefined
  const imageUrl = localImageUrl || 'https://placehold.co/1920x1080/2d2d2d/ffffff.png?text=Viking+Adventure+Scene'

  // Handle image upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('sceneId', sceneId)
      const res = await fetch('/api/uploadSceneImage', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        const { imageUrl } = await res.json()
        setLocalImageUrl(imageUrl)
      } else {
        alert('Failed to upload image')
      }
    } catch (err) {
      alert('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  // If no image, show upload UI
  const showUploader = !localImageUrl

  // Scroll overlay into view when collapsing
  const handleShowLess = () => {
    setDescExpanded(false);
    setTimeout(() => {
      descRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="w-full flex flex-col bg-[#ece5db] min-h-screen">
      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Row: Image (75%) + Sidebar (25%) */}
        <div className="flex w-full border-b-2 border-[#bfae99]">
          {/* Left: Header, Description, then Image */}
          <div className="flex flex-col w-[75%]">
            {/* Header bar with location and season/time */}
            <div className="w-full flex justify-between items-center px-8 py-2 bg-[#ece5db]/90 border-b-2 border-[#bfae99] font-runic text-[#5a4632] text-base tracking-wide">
              <span>{scene.location}</span>
              <span>{scene.season}</span>
            </div>
            {/* Scene name and description */}
            <div className="w-full flex flex-col items-center bg-[#ece5db]/90 px-10 py-4 border-b-2 border-[#bfae99]">
              <div className="font-bold text-2xl text-[#5a4632] font-runic truncate whitespace-nowrap mb-1">{scene.name}</div>
              <div
                ref={descTextRef}
                className={
                  descExpanded
                    ? "text-[#3d2c1a] text-base leading-snug"
                    : "text-[#3d2c1a] text-base leading-snug line-clamp-3"
                }
                style={descExpanded ? {} : { maxHeight: '4.2em', overflow: 'hidden' }}
              >
                {scene.text}
              </div>
              {isTruncated && !descExpanded && (
                <button
                  className="mt-1 text-xs text-[#5a4632] underline hover:text-amber-700 transition"
                  onClick={() => setDescExpanded(true)}
                >
                  Read more
                </button>
              )}
              {isTruncated && descExpanded && (
                <button
                  className="mt-1 text-xs text-[#5a4632] underline hover:text-amber-700 transition"
                  onClick={handleShowLess}
                >
                  Show less
                </button>
              )}
            </div>
            {/* Image container, 16:9 aspect ratio */}
            <div className="relative w-full aspect-[16/9] bg-[#ece5db] flex items-center justify-center">
              {showUploader ? (
                <div className="flex flex-col items-center justify-center w-full h-full bg-[#ece5db] border-8 border-dashed border-[#bfae99] cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <span className="text-2xl mb-1">📷</span>
                  <span className="text-base text-[#5a4632]">{uploading ? 'Uploading...' : 'Click to upload a scene image'}</span>
                </div>
              ) : (
                <Image
                  src={imageUrl}
                  alt={scene.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
          {/* Sidebar, 25% width */}
          <aside className="w-[25%] min-h-[16vw] flex flex-col items-center justify-start bg-[#ece5db]/80 border-l-2 border-[#bfae99] p-0">
            {/* Journal header */}
            <div className="w-full flex items-center px-8 py-2 bg-[#ece5db]/90 border-b-2 border-[#bfae99] font-runic text-[#5a4632] text-base tracking-wide">Journal</div>
            {/* Modal (MessageBox) or Choices in Journal area */}
            <div className="w-full flex flex-col items-stretch p-4 gap-2">
              {modal ? (
                <div className="bg-[#1a1a1a]/80 border border-amber-900/30 text-amber-100 p-2 text-sm">
                  <div className="font-bold text-amber-200 font-runic mb-2">{modal.description}</div>
                  <div className="space-y-2">
                    {modal.choices ? (
                      modal.choices.map((choice, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleModalChoice(choice)}
                          className="w-full bg-amber-900/50 hover:bg-amber-800/50 text-amber-100 border border-amber-900/30 py-1 px-2 rounded-none text-left"
                        >
                          {choice.text}
                        </button>
                      ))
                    ) : (
                      <button
                        onClick={() => useModalStore.getState().pop()}
                        className="w-full bg-amber-900/50 hover:bg-amber-800/50 text-amber-100 border border-amber-900/30 py-1 px-2 rounded-none text-left"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                // Choices if no modal
                <div className="flex flex-col gap-2">
                  {scene.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => onChoice(choice)}
                      className="w-full bg-[#e0d3b8]/90 border-2 border-[#bfae99] shadow text-xs font-bold text-[#5a4632] hover:bg-[#d1c2a3] transition py-2 px-2 rounded-none text-left"
                      style={{lineHeight: '1.1'}}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Bottom panels row */}
        <div className="flex-grow flex justify-start border-l-2 border-[#bfae99]">
          <InventoryPanel 
            inventory={gameState.inventory} 
            flags={gameState.flags}
          />
          <div className="border-l-2 border-[#bfae99]">
            <AchievementsPanel achievements={gameState.flags} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between w-full px-4 py-2 bg-[#ece5db] border-t-2 border-[#bfae99] relative text-sm h-[48px] min-h-[48px]">
        {/* Inventory icon/label */}
        <div className="flex items-center gap-1">
          <span className="text-xl">🧺</span>
          <span className="text-[#5a4632] font-semibold">Inventory</span>
        </div>
        {/* Map icon/label */}
        <div className="flex items-center gap-1">
          <span className="text-xl">🗺️</span>
          <span className="text-[#5a4632] font-semibold">Map</span>
        </div>
        {/* Settings gear (menu popover) */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="relative z-20 bg-[#ece5db]/80 border-2 border-[#bfae99] rounded-full p-2 shadow-lg hover:bg-[#e0d3b8] transition"
            aria-label="Open settings menu"
            style={{height: '32px', width: '32px'}}
          >
            <span className="text-xl">⚙️</span>
          </button>
          {showMenu && (
            <div className="absolute bottom-12 right-0 z-50">
              <MenuPopover onNewGame={() => setShowMenu(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}