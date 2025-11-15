'use client'

import { useState } from 'react'
import { QrCode, UserCheck, ClipboardCheck, AlertCircle, CheckCircle } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'

export default function CheckInView() {
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)

  const pendingCheckIns = [
    {
      id: 1,
      name: 'David Martinez',
      time: '10:00 AM',
      type: 'Cleaning',
      phone: '(555) 789-0123',
      status: 'waiting'
    },
    {
      id: 2,
      name: 'Lisa Anderson',
      time: '10:30 AM',
      type: 'Check-up',
      phone: '(555) 890-1234',
      status: 'waiting'
    },
    {
      id: 3,
      name: 'James Taylor',
      time: '11:00 AM',
      type: 'Root Canal',
      phone: '(555) 901-2345',
      status: 'late',
      alert: 'Expected 15 min ago'
    },
  ]

  const checkedInToday = [
    { name: 'John Smith', time: '09:00 AM', checkedAt: '08:55 AM' },
    { name: 'Sarah Johnson', time: '09:30 AM', checkedAt: '09:28 AM' },
    { name: 'Michael Brown', time: '10:00 AM', checkedAt: '09:45 AM' },
  ]

  const handleCheckIn = (patientId: number) => {
    setSelectedPatient(patientId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-pastel-green-500" />
            Patient Check-In
          </h2>
          <p className="text-gray-500 mt-1">Manage arrivals and digital forms</p>
        </div>
        <button
          onClick={() => setShowQRScanner(!showQRScanner)}
          className="flex items-center gap-2 bg-gradient-to-r from-pastel-blue-400 to-pastel-green-400 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <QrCode className="w-5 h-5" />
          {showQRScanner ? 'Close Scanner' : 'Scan QR Code'}
        </button>
      </div>

      {showQRScanner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg text-center"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Scan Patient QR Code</h3>
          <div className="flex justify-center mb-4">
            <div className="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center border-4 border-dashed border-pastel-blue-300">
              <QRCodeSVG value="https://clinic.example.com/checkin/12345" size={200} />
            </div>
          </div>
          <p className="text-gray-600">Position the QR code within the frame</p>
          <p className="text-sm text-gray-400 mt-2">Patients can show their appointment confirmation QR code</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6 text-pastel-blue-500" />
              Pending Check-Ins ({pendingCheckIns.length})
            </h3>
            <div className="space-y-3">
              {pendingCheckIns.map((patient) => (
                <motion.div
                  key={patient.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-xl border-2 ${
                    patient.status === 'late'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-pastel-blue-50 border-pastel-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-lg">{patient.name}</p>
                      <p className="text-sm text-gray-600">
                        {patient.time} • {patient.type}
                      </p>
                      <p className="text-sm text-gray-500">{patient.phone}</p>
                    </div>
                    {patient.status === 'late' && (
                      <AlertCircle className="w-6 h-6 text-red-500 animate-pulse" />
                    )}
                  </div>
                  {patient.alert && (
                    <div className="mb-3 text-sm text-red-700 bg-red-100 px-3 py-2 rounded-lg">
                      ⚠️ {patient.alert}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCheckIn(patient.id)}
                      className="flex-1 bg-pastel-green-400 hover:bg-pastel-green-500 text-white py-2 rounded-lg font-semibold transition-colors"
                    >
                      Check In
                    </button>
                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition-colors">
                      Send Forms
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedPatient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-pastel-green-100 to-pastel-blue-100 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Digital Forms</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for Visit *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pastel-blue-400 focus:outline-none"
                    placeholder="E.g., Routine cleaning, toothache..."
                    required
                    aria-required="true"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Any changes to medical history? *
                  </label>
                  <select
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pastel-blue-400 focus:outline-none"
                    required
                    aria-required="true"
                  >
                    <option>No changes</option>
                    <option>Yes, I need to update</option>
                  </select>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current medications
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pastel-blue-400 focus:outline-none"
                    rows={3}
                    placeholder="List any medications..."
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-pastel-green-400 hover:bg-pastel-green-500 text-white py-3 rounded-lg font-semibold transition-colors">
                    Complete Check-In
                  </button>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-pastel-green-500" />
              Checked In Today
            </h3>
            <div className="space-y-2">
              {checkedInToday.map((patient, index) => (
                <div key={index} className="p-3 bg-pastel-green-50 rounded-lg">
                  <p className="font-semibold text-gray-800">{patient.name}</p>
                  <p className="text-sm text-gray-600">Apt: {patient.time}</p>
                  <p className="text-xs text-green-600">✓ Checked in at {patient.checkedAt}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-pastel-blue-400 to-pastel-purple-300 rounded-2xl p-6 text-white shadow-md">
            <h3 className="text-xl font-bold mb-4">Check-In Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>On-time arrivals</span>
                <span className="text-2xl font-bold">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Avg check-in time</span>
                <span className="text-2xl font-bold">3min</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Digital forms completed</span>
                <span className="text-2xl font-bold">18</span>
              </div>
            </div>
          </div>

          <div className="bg-pastel-green-50 border-2 border-pastel-green-300 rounded-2xl p-4">
            <h4 className="font-semibold text-green-800 mb-2">💡 Quick Tip</h4>
            <p className="text-sm text-green-700">
              Send patients a QR code via SMS for contactless check-in upon arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
