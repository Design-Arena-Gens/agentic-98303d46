'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import SearchBar from '@/components/SearchBar'
import AIAssistant from '@/components/AIAssistant'

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-sm border-b border-pastel-blue-200 px-6 py-4 shadow-sm">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>

        <div className="flex-1 overflow-auto p-6">
          <Dashboard activeView={activeView} searchQuery={searchQuery} />
        </div>
      </div>

      <AIAssistant />
    </main>
  )
}
