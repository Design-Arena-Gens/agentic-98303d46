'use client'

import { useState } from 'react'
import { Phone, PhoneIncoming, PhoneMissed, PhoneForwarded, Voicemail, Clock, User } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CallManagement() {
  const [selectedVoicemail, setSelectedVoicemail] = useState<number | null>(null)

  const missedCalls = [
    {
      id: 1,
      name: 'Jennifer Lee',
      phone: '(555) 678-9012',
      time: '15 min ago',
      attempts: 2,
      priority: 'high'
    },
    {
      id: 2,
      name: 'Robert Wilson',
      phone: '(555) 567-8901',
      time: '32 min ago',
      attempts: 1,
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Patricia Martinez',
      phone: '(555) 456-7890',
      time: '1 hour ago',
      attempts: 3,
      priority: 'high'
    },
  ]

  const voicemails = [
    {
      id: 1,
      name: 'Thomas Anderson',
      phone: '(555) 111-2222',
      time: '10:23 AM',
      duration: '1:24',
      transcription: 'Hi, this is Thomas Anderson. I need to reschedule my appointment for next Tuesday. I have a conflict at 2 PM. Could you call me back to find a new time? My number is 555-111-2222. Thank you.',
      priority: 'medium'
    },
    {
      id: 2,
      name: 'Unknown Caller',
      phone: '(555) 333-4444',
      time: '09:45 AM',
      duration: '0:45',
      transcription: 'Hello, I\'m calling to inquire about your teeth whitening services and pricing. Please give me a call back when you have a chance.',
      priority: 'low'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      phone: '(555) 555-6666',
      time: '09:12 AM',
      duration: '2:15',
      transcription: 'Hi, I\'m experiencing severe tooth pain and need to see a dentist as soon as possible. This is an emergency. My name is Maria Rodriguez and my number is 555-555-6666. Please call me back urgently.',
      priority: 'urgent'
    },
  ]

  const callHistory = [
    { name: 'David Martinez', type: 'outgoing', time: '11:30 AM', duration: '3:45', status: 'completed' },
    { name: 'Lisa Anderson', type: 'incoming', time: '11:15 AM', duration: '2:20', status: 'completed' },
    { name: 'James Taylor', type: 'outgoing', time: '10:45 AM', duration: '5:12', status: 'completed' },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 border-red-300 text-red-800'
      case 'high': return 'bg-orange-100 border-orange-300 text-orange-800'
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Phone className="w-8 h-8 text-pastel-blue-500" />
            Call Management
          </h2>
          <p className="text-gray-500 mt-1">Voicemail transcription & intelligent routing</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-pastel-green-400 to-pastel-blue-400 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
          <Phone className="w-5 h-5" />
          Make Call
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-4 text-white shadow-md"
        >
          <PhoneMissed className="w-8 h-8 mb-2" aria-hidden="true" />
          <p className="text-3xl font-bold">5</p>
          <p className="text-sm opacity-90">Missed Calls</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-pastel-blue-400 to-pastel-blue-500 rounded-2xl p-4 text-white shadow-md"
        >
          <Voicemail className="w-8 h-8 mb-2" aria-hidden="true" />
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm opacity-90">New Voicemails</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-pastel-green-400 to-pastel-green-500 rounded-2xl p-4 text-white shadow-md"
        >
          <PhoneIncoming className="w-8 h-8 mb-2" aria-hidden="true" />
          <p className="text-3xl font-bold">28</p>
          <p className="text-sm opacity-90">Calls Today</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-4 text-white shadow-md"
        >
          <Clock className="w-8 h-8 mb-2" aria-hidden="true" />
          <p className="text-3xl font-bold">4:32</p>
          <p className="text-sm opacity-90">Avg Duration</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Voicemail className="w-6 h-6 text-pastel-blue-500" />
              Voicemails with AI Transcription
            </h3>
            <div className="space-y-3">
              {voicemails.map((vm) => (
                <motion.div
                  key={vm.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer ${getPriorityColor(vm.priority)}`}
                  onClick={() => setSelectedVoicemail(selectedVoicemail === vm.id ? null : vm.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-800">{vm.name}</p>
                        {vm.priority === 'urgent' && (
                          <span className="text-xs font-semibold px-2 py-0.5 bg-red-500 text-white rounded-full animate-pulse">
                            URGENT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{vm.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{vm.time}</p>
                      <p className="text-xs text-gray-500">{vm.duration}</p>
                    </div>
                  </div>
                  {selectedVoicemail === vm.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-gray-300"
                    >
                      <p className="text-sm text-gray-700 mb-3 italic">"{vm.transcription}"</p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-pastel-green-400 hover:bg-pastel-green-500 text-white py-2 rounded-lg font-semibold transition-colors">
                          Call Back
                        </button>
                        <button className="flex-1 bg-pastel-blue-400 hover:bg-pastel-blue-500 text-white py-2 rounded-lg font-semibold transition-colors">
                          Send SMS
                        </button>
                        <button className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition-colors">
                          Archive
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PhoneMissed className="w-6 h-6 text-red-500" />
              Missed Calls to Return
            </h3>
            <div className="space-y-3">
              {missedCalls.map((call) => (
                <div
                  key={call.id}
                  className={`p-4 rounded-xl border-2 ${
                    call.priority === 'high' ? 'bg-red-50 border-red-300' : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{call.name}</p>
                      <p className="text-sm text-gray-600">{call.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{call.time}</p>
                      <p className="text-xs text-red-600">{call.attempts} attempt(s)</p>
                    </div>
                  </div>
                  <button className="w-full bg-pastel-green-400 hover:bg-pastel-green-500 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <PhoneForwarded className="w-4 h-4" />
                    Return Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-pastel-blue-400 to-pastel-purple-300 rounded-2xl p-6 text-white shadow-md">
            <h3 className="text-xl font-bold mb-4">AI Call Routing</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-semibold">Emergency Calls</p>
                <p className="text-xs opacity-90">→ Direct to dentist</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-semibold">Appointments</p>
                <p className="text-xs opacity-90">→ Receptionist queue</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-semibold">Billing Questions</p>
                <p className="text-xs opacity-90">→ Billing department</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              Recent Call History
            </h3>
            <div className="space-y-2">
              {callHistory.map((call, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    {call.type === 'outgoing' ? (
                      <PhoneForwarded className="w-4 h-4 text-blue-600" aria-label="Outgoing call" />
                    ) : (
                      <PhoneIncoming className="w-4 h-4 text-green-600" aria-label="Incoming call" />
                    )}
                    <p className="font-semibold text-gray-800 text-sm">{call.name}</p>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{call.time}</span>
                    <span>{call.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-pastel-green-50 border-2 border-pastel-green-300 rounded-2xl p-4">
            <h4 className="font-semibold text-green-800 mb-2">💡 AI Insight</h4>
            <p className="text-sm text-green-700">
              Peak call times: 9-11 AM and 2-4 PM. Consider scheduling extra staff during these hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
