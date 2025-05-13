'use client'
import Link from 'next/link'
import './globals.css'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { NewGameModal } from '@/components/NewGameModal'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [showNewGameModal, setShowNewGameModal] = useState(false);

    return (
        <html lang="en">
        <body>
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/developer" className="hover:underline text-amber-100">
                    Developer Dashboard
                </Link>
                <Button 
                    onClick={() => setShowNewGameModal(true)}
                    className="bg-amber-900/50 hover:bg-amber-800/50 text-amber-100 border border-amber-900/30"
                >
                    New Game
                </Button>
            </div>
        </nav>
        <main className="container mx-auto py-8">{children}</main>
        <NewGameModal 
            isOpen={showNewGameModal} 
            onClose={() => setShowNewGameModal(false)} 
        />
        </body>
        </html>
    )
}