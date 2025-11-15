'use client'

import { useState } from 'react'
import { Bot, Send, Minimize2, Maximize2, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hi! I\'m your AI assistant. I can help you with scheduling, patient records, insurance verification, and more. How can I assist you today?',
      time: 'Just now'
    }
  ])
  const [inputText, setInputText] = useState('')

  const suggestions = [
    'Show me today\'s schedule',
    'Check insurance for John Smith',
    'How many no-shows this month?',
    'Find available slots next week',
  ]

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          sender: 'user',
          text: inputText,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        },
        {
          sender: 'ai',
          text: `I understand you're asking about "${inputText}". Let me help you with that...`,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      ])
      setInputText('')
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed right-0 top-0 h-full bg-white shadow-2xl border-l-2 border-pastel-blue-200 flex flex-col z-50 ${
              isExpanded ? 'w-[600px]' : 'w-[400px]'
            } transition-all duration-300`}
          >
            <div className="bg-gradient-to-r from-pastel-blue-400 to-pastel-green-400 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Assistant</h3>
                  <p className="text-xs opacity-90">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label={isExpanded ? 'Minimize' : 'Maximize'}
                >
                  {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close assistant"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-pastel-blue-50/30 to-white scrollbar-hide">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-pastel-blue-400 to-pastel-green-400 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                      : 'bg-white border-2 border-pastel-blue-200 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                  } p-4 shadow-sm`}>
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-pastel-blue-500" />
                        <span className="text-xs font-semibold text-pastel-blue-500">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-4">
                <p className="text-xs text-gray-500 mb-2 font-semibold">Quick Actions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(suggestion)}
                      className="text-left text-sm bg-pastel-blue-50 hover:bg-pastel-blue-100 text-pastel-blue-700 px-4 py-2 rounded-xl transition-colors border border-pastel-blue-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pastel-blue-400 focus:outline-none"
                  aria-label="Chat with AI assistant"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`px-6 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    inputText.trim()
                      ? 'bg-gradient-to-r from-pastel-blue-400 to-pastel-green-400 text-white hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                Try asking about appointments, patient info, or clinic stats
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-pastel-blue-400 to-pastel-green-400 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-3xl transition-shadow"
          aria-label="Open AI assistant"
        >
          <Bot className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" aria-label="New message" />
        </motion.button>
      )}
    </>
  )
}
