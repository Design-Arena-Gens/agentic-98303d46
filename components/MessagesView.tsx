'use client'

import { useState } from 'react'
import { MessageSquare, Send, Clock, CheckCheck, Mail, Smartphone, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [messageText, setMessageText] = useState('')

  const conversations = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      lastMessage: 'Thank you! See you tomorrow at 9:30',
      time: '2 min ago',
      unread: 0,
      status: 'confirmed',
      phone: '(555) 234-5678'
    },
    {
      id: 2,
      patient: 'Michael Brown',
      lastMessage: 'Can I reschedule to next week?',
      time: '15 min ago',
      unread: 2,
      status: 'pending',
      phone: '(555) 345-6789'
    },
    {
      id: 3,
      patient: 'Emily Davis',
      lastMessage: 'What time should I arrive?',
      time: '1 hour ago',
      unread: 1,
      status: 'pending',
      phone: '(555) 456-7890'
    },
    {
      id: 4,
      patient: 'Robert Wilson',
      lastMessage: 'Appointment confirmed',
      time: '2 hours ago',
      unread: 0,
      status: 'confirmed',
      phone: '(555) 567-8901'
    },
  ]

  const messages = [
    {
      id: 1,
      sender: 'clinic',
      text: 'Hi Sarah! This is a reminder about your dental cleaning appointment tomorrow at 9:30 AM. Please reply to confirm.',
      time: '10:15 AM',
      status: 'read'
    },
    {
      id: 2,
      sender: 'patient',
      text: 'Hi! Yes, I\'ll be there.',
      time: '10:18 AM',
      status: 'delivered'
    },
    {
      id: 3,
      sender: 'clinic',
      text: 'Great! Please arrive 10 minutes early to complete check-in. Remember to bring your insurance card.',
      time: '10:19 AM',
      status: 'read'
    },
    {
      id: 4,
      sender: 'patient',
      text: 'Thank you! See you tomorrow at 9:30',
      time: '10:20 AM',
      status: 'delivered'
    },
  ]

  const templates = [
    { name: 'Appointment Reminder', text: 'Hi [NAME]! Reminder: You have an appointment on [DATE] at [TIME]. Reply to confirm.' },
    { name: 'Pre-Visit Instructions', text: 'Hi [NAME]! Please arrive 10 min early and bring your insurance card.' },
    { name: 'Follow-up Care', text: 'Hi [NAME]! How are you feeling after your procedure? Please let us know if you have any concerns.' },
    { name: 'Reschedule Request', text: 'Hi [NAME]! We received your reschedule request. What dates work best for you?' },
  ]

  const selectedPatient = conversations.find(c => c.id === selectedConversation)

  const handleSend = () => {
    if (messageText.trim()) {
      setMessageText('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-pastel-blue-500" />
            Patient Messages
          </h2>
          <p className="text-gray-500 mt-1">Two-way SMS & email communication</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all border border-gray-200">
            <Mail className="w-5 h-5" />
            Email
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-pastel-blue-400 to-pastel-green-400 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
            <Smartphone className="w-5 h-5" />
            SMS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div className="bg-gradient-to-br from-pastel-blue-400 to-pastel-blue-500 rounded-2xl p-4 text-white shadow-md">
          <MessageSquare className="w-8 h-8 mb-2" aria-hidden="true" />
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm opacity-90">Unread Messages</p>
        </motion.div>
        <motion.div className="bg-gradient-to-br from-pastel-green-400 to-pastel-green-500 rounded-2xl p-4 text-white shadow-md">
          <CheckCheck className="w-8 h-8 mb-2" aria-hidden="true" />
          <p className="text-3xl font-bold">45</p>
          <p className="text-sm opacity-90">Sent Today</p>
        </motion.div>
        <motion.div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-4 text-white shadow-md">
          <Clock className="w-8 h-8 mb-2" aria-hidden="true" />
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm opacity-90">Pending Response</p>
        </motion.div>
        <motion.div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-4 text-white shadow-md">
          <AlertCircle className="w-8 h-8 mb-2" aria-hidden="true" />
          <p className="text-3xl font-bold">98%</p>
          <p className="text-sm opacity-90">Response Rate</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-pastel-blue-100 to-pastel-green-100 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Conversations</h3>
          </div>
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto scrollbar-hide">
            {conversations.map((conv) => (
              <motion.div
                key={conv.id}
                whileHover={{ backgroundColor: '#f0f9ff' }}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedConversation === conv.id ? 'bg-pastel-blue-50' : ''
                }`}
                onClick={() => setSelectedConversation(conv.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-gray-800">{conv.patient}</p>
                  {conv.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1 truncate">{conv.lastMessage}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{conv.time}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    conv.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {conv.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
          {selectedPatient ? (
            <>
              <div className="p-4 bg-gradient-to-r from-pastel-blue-400 to-pastel-green-400 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">{selectedPatient.patient}</p>
                    <p className="text-sm opacity-90">{selectedPatient.phone}</p>
                  </div>
                  <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-colors">
                    View Profile
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[400px] scrollbar-hide bg-gradient-to-b from-pastel-blue-50/30 to-white">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'clinic' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${
                      msg.sender === 'clinic'
                        ? 'bg-gradient-to-r from-pastel-blue-400 to-pastel-green-400 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                        : 'bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                    } p-3 shadow-sm`}>
                      <p className="text-sm mb-1">{msg.text}</p>
                      <div className="flex items-center gap-1 justify-end">
                        <span className={`text-xs ${msg.sender === 'clinic' ? 'text-white/80' : 'text-gray-500'}`}>
                          {msg.time}
                        </span>
                        {msg.sender === 'clinic' && (
                          <CheckCheck className={`w-3 h-3 ${msg.status === 'read' ? 'text-blue-200' : 'text-white/60'}`} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2 mb-2">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setMessageText(template.text)}
                      className="text-xs bg-pastel-blue-100 hover:bg-pastel-blue-200 text-pastel-blue-700 px-3 py-1 rounded-full transition-colors"
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pastel-blue-400 focus:outline-none"
                    aria-label="Message input"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!messageText.trim()}
                    className={`px-6 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                      messageText.trim()
                        ? 'bg-gradient-to-r from-pastel-blue-400 to-pastel-green-400 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-pastel-blue-50 border-2 border-pastel-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Automated Reminders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCheck className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-gray-800">24hr Reminder</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">Sent automatically 24 hours before appointment</p>
            <p className="text-xs text-green-600">✓ Active • 18 sent today</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCheck className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-gray-800">Confirmation</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">Request confirmation within 1 hour of booking</p>
            <p className="text-xs text-green-600">✓ Active • 7 sent today</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCheck className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-gray-800">Follow-up</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">Check in 24 hours after procedure</p>
            <p className="text-xs text-green-600">✓ Active • 5 sent today</p>
          </div>
        </div>
      </div>
    </div>
  )
}
