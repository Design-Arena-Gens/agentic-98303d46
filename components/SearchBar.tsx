'use client'

import { Search, X } from 'lucide-react'
import { useState, useRef } from 'react'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickSearches = [
    'John Smith patient record',
    'Today\'s appointments',
    'Insurance verification',
    'Pending check-ins',
  ]

  return (
    <div className="relative max-w-2xl">
      <div className={`flex items-center gap-3 bg-white rounded-2xl px-4 py-3 transition-all duration-200 ${
        isFocused ? 'ring-2 ring-pastel-blue-400 shadow-lg' : 'shadow-sm'
      }`}>
        <Search className="w-5 h-5 text-pastel-blue-400" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search patients, appointments, or ask a question..."
          className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          aria-label="Search patients and records"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isFocused && !searchQuery && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-pastel-blue-100 p-4 z-50">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Quick Searches</p>
          <div className="space-y-1">
            {quickSearches.map((query, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(query)
                  inputRef.current?.focus()
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-pastel-blue-50 text-sm text-gray-700 transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
