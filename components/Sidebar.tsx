'use client'

import { Calendar, Users, Shield, Phone, MessageSquare, Home, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: 3 },
    { id: 'checkin', label: 'Check-In', icon: Users },
    { id: 'insurance', label: 'Insurance', icon: Shield, urgent: true },
    { id: 'calls', label: 'Call Management', icon: Phone, badge: 5 },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 12 },
  ]

  return (
    <aside className="w-64 bg-white/90 backdrop-blur-sm border-r border-pastel-blue-200 flex flex-col shadow-lg">
      <div className="p-6 border-b border-pastel-blue-100">
        <h1 className="text-2xl font-bold text-pastel-blue-500 flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pastel-blue-400 to-pastel-green-400 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🦷</span>
          </div>
          SmileCare AI
        </h1>
        <p className="text-sm text-gray-500 mt-1">Receptionist Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2" role="navigation" aria-label="Main navigation">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-pastel-blue-400 to-pastel-green-400 text-white shadow-md'
                  : 'text-gray-700 hover:bg-pastel-blue-50'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isActive ? 'bg-white/30' : 'bg-pastel-blue-200 text-pastel-blue-700'
                }`}>
                  {item.badge}
                </span>
              )}
              {item.urgent && (
                <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" aria-label="Urgent" />
              )}
            </motion.button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-pastel-blue-100">
        <div className="bg-gradient-to-r from-pastel-green-100 to-pastel-blue-100 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-700">Today's Overview</p>
          <div className="mt-2 space-y-1 text-xs text-gray-600">
            <p>✓ 24 appointments scheduled</p>
            <p>⏰ 3 pending check-ins</p>
            <p>📞 5 missed calls</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
