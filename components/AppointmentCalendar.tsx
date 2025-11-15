'use client'

import { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Clock, User, Phone, Mail, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day')

  const appointments = [
    {
      id: 1,
      time: '09:00',
      duration: 30,
      patient: 'John Smith',
      phone: '(555) 123-4567',
      type: 'Cleaning',
      status: 'confirmed',
      notes: 'Regular checkup'
    },
    {
      id: 2,
      time: '09:30',
      duration: 60,
      patient: 'Sarah Johnson',
      phone: '(555) 234-5678',
      type: 'Root Canal',
      status: 'confirmed',
      notes: 'Follow-up appointment'
    },
    {
      id: 3,
      time: '10:30',
      duration: 30,
      patient: 'Michael Brown',
      phone: '(555) 345-6789',
      type: 'Check-up',
      status: 'pending',
      reminder: 'Send SMS reminder'
    },
    {
      id: 4,
      time: '11:00',
      duration: 45,
      patient: 'Emily Davis',
      phone: '(555) 456-7890',
      type: 'Filling',
      status: 'confirmed'
    },
    {
      id: 5,
      time: '14:00',
      duration: 30,
      patient: 'Robert Wilson',
      phone: '(555) 567-8901',
      type: 'Consultation',
      status: 'rescheduled',
      alert: 'Requested different time'
    },
    {
      id: 6,
      time: '14:30',
      duration: 60,
      patient: 'Jennifer Lee',
      phone: '(555) 678-9012',
      type: 'Crown Fitting',
      status: 'confirmed'
    },
    {
      id: 7,
      time: '15:30',
      duration: 30,
      patient: 'David Martinez',
      phone: '(555) 789-0123',
      type: 'Cleaning',
      status: 'confirmed'
    },
  ]

  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9
    return `${hour.toString().padStart(2, '0')}:00`
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-pastel-green-200 border-pastel-green-400 text-green-800'
      case 'pending': return 'bg-yellow-100 border-yellow-400 text-yellow-800'
      case 'rescheduled': return 'bg-pastel-blue-200 border-pastel-blue-400 text-blue-800'
      default: return 'bg-gray-100 border-gray-400 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-pastel-blue-500" />
            Appointment Calendar
          </h2>
          <p className="text-gray-500 mt-1">Drag and drop to reschedule</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 font-medium transition-colors ${
                viewMode === 'day' ? 'bg-pastel-blue-400 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 font-medium transition-colors ${
                viewMode === 'week' ? 'bg-pastel-blue-400 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm">
            <button className="p-1 hover:bg-gray-100 rounded" aria-label="Previous day">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold text-gray-700 min-w-[150px] text-center">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded" aria-label="Next day">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <div className="space-y-2">
            {timeSlots.map((slot) => {
              const slotAppointments = appointments.filter(apt => apt.time === slot)

              return (
                <div key={slot} className="flex gap-4 min-h-[80px] border-b border-gray-100 last:border-0">
                  <div className="w-20 pt-2">
                    <p className="text-sm font-semibold text-gray-600">{slot}</p>
                  </div>
                  <div className="flex-1 space-y-2 py-2">
                    {slotAppointments.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-300 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                        Available
                      </div>
                    ) : (
                      slotAppointments.map((apt) => (
                        <motion.div
                          key={apt.id}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-xl border-2 cursor-move ${getStatusColor(apt.status)} shadow-sm`}
                          draggable
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-bold text-gray-800">{apt.patient}</p>
                              <p className="text-sm">{apt.type} • {apt.duration} min</p>
                            </div>
                            <span className="text-xs font-semibold uppercase px-2 py-1 bg-white/50 rounded">
                              {apt.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {apt.phone}
                            </span>
                          </div>
                          {apt.alert && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-red-700 bg-red-100 px-2 py-1 rounded">
                              <AlertCircle className="w-3 h-3" />
                              {apt.alert}
                            </div>
                          )}
                          {apt.reminder && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">
                              <Mail className="w-3 h-3" />
                              {apt.reminder}
                            </div>
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-pastel-blue-400 to-pastel-green-400 rounded-2xl p-6 text-white shadow-md">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors">
                + New Appointment
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors">
                Send Reminders
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors">
                View Conflicts
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-pastel-green-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Appointments</span>
                <span className="text-xl font-bold text-green-700">7</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm text-gray-600">Pending Confirmations</span>
                <span className="text-xl font-bold text-yellow-700">1</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pastel-blue-50 rounded-lg">
                <span className="text-sm text-gray-600">Reminders Sent</span>
                <span className="text-xl font-bold text-blue-700">12</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-800 mb-1">Scheduling Conflict</p>
                <p className="text-sm text-yellow-700">2 appointments overlap at 11:00 AM. Please review.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
