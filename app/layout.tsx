
'use client'
import Link from 'next/link'
import './globals.css'
import { Button } from '@/components/ui/button'
import { initialGameState } from '@/lib/gameState'
import { useGameStore } from '@/store/gameStore'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4 justify-between">
                <div className="flex space-x-4">
                <li>
                    <Link href="/" className="hover:underline">
                        Game
                    </Link>
                </li>
                <li>
                    <Link href="/developer" className="hover:underline">
                        Developer Dashboard
                    </Link>
                </li>
                </div>
                <li>
                    <Button  className="" onClick={() => {
                        useGameStore.getState().setGameState(initialGameState)
                    }}>
                        New Game
                    </Button>
                </li>
            </ul>
        </nav>
        <main className="container mx-auto py-8">{children}</main>
        </body>
        </html>
    )
}