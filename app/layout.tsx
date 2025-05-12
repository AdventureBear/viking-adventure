import Link from 'next/link'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
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
            </ul>
        </nav>
        <main className="container mx-auto py-8">{children}</main>
        </body>
        </html>
    )
}