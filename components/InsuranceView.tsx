'use client'

import { useState } from 'react'
import { Shield, CheckCircle, XCircle, Clock, Search, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function InsuranceView() {
  const [verifying, setVerifying] = useState<number | null>(null)

  const insuranceProviders = [
    { name: 'Delta Dental', logo: '🦷', color: 'from-blue-400 to-blue-500' },
    { name: 'MetLife', logo: '🏢', color: 'from-green-400 to-green-500' },
    { name: 'Cigna', logo: '🏥', color: 'from-purple-400 to-purple-500' },
    { name: 'Aetna', logo: '❤️', color: 'from-red-400 to-red-500' },
  ]

  const verificationQueue = [
    {
      id: 1,
      patient: 'David Martinez',
      provider: 'Delta Dental',
      memberId: 'DD123456789',
      appointment: '10:00 AM',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      patient: 'Lisa Anderson',
      provider: 'MetLife',
      memberId: 'ML987654321',
      appointment: '10:30 AM',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 3,
      patient: 'James Taylor',
      provider: 'Cigna',
      memberId: 'CG456789012',
      appointment: '11:00 AM',
      status: 'pending',
      priority: 'high'
    },
  ]

  const verifiedToday = [
    {
      patient: 'John Smith',
      provider: 'Delta Dental',
      status: 'active',
      coverage: '100% Preventive, 80% Basic',
      deductible: '$50 remaining',
      verifiedAt: '08:45 AM'
    },
    {
      patient: 'Sarah Johnson',
      provider: 'Aetna',
      status: 'active',
      coverage: '100% Preventive, 70% Major',
      deductible: 'Met for year',
      verifiedAt: '09:15 AM'
    },
    {
      patient: 'Michael Brown',
      provider: 'MetLife',
      status: 'inactive',
      issue: 'Plan expired - requires update',
      verifiedAt: '09:45 AM'
    },
  ]

  const handleVerify = async (id: number) => {
    setVerifying(id)
    setTimeout(() => setVerifying(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Shield className="w-8 h-8 text-pastel-blue-500" />
            Insurance Verification
          </h2>
          <p className="text-gray-500 mt-1">Real-time eligibility checks</p>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search member ID..."
            className="outline-none text-gray-700 w-48"
            aria-label="Search member ID"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insuranceProviders.map((provider, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${provider.color} rounded-2xl p-4 text-white shadow-md cursor-pointer`}
          >
            <div className="text-3xl mb-2">{provider.logo}</div>
            <p className="font-bold">{provider.name}</p>
            <p className="text-sm opacity-90">Quick verify</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-6 h-6 text-yellow-500" />
              Verification Queue ({verificationQueue.length})
            </h3>
            <button className="text-sm text-pastel-blue-500 hover:text-pastel-blue-600 font-semibold">
              Auto-verify all
            </button>
          </div>
          <div className="space-y-3">
            {verificationQueue.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-xl border-2 ${
                  item.priority === 'high'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-800 text-lg">{item.patient}</p>
                      {item.priority === 'high' && (
                        <AlertTriangle className="w-4 h-4 text-red-500" aria-label="High priority" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.provider}</p>
                    <p className="text-sm text-gray-500">Member ID: {item.memberId}</p>
                    <p className="text-sm text-gray-500">Appointment: {item.appointment}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVerify(item.id)}
                    disabled={verifying === item.id}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                      verifying === item.id
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-pastel-blue-400 hover:bg-pastel-blue-500 text-white'
                    }`}
                  >
                    {verifying === item.id ? 'Verifying...' : 'Verify Now'}
                  </button>
                  <button className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition-colors">
                    Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-pastel-green-400 to-pastel-blue-400 rounded-2xl p-6 text-white shadow-md">
            <h3 className="text-xl font-bold mb-4">Today's Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Verified
                </span>
                <span className="text-2xl font-bold">18</span>
              </div>
              <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Pending
                </span>
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
                <span className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Issues
                </span>
                <span className="text-2xl font-bold">1</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-pastel-blue-100 hover:bg-pastel-blue-200 text-pastel-blue-700 py-3 rounded-lg font-semibold transition-colors">
                Manual Entry
              </button>
              <button className="w-full bg-pastel-green-100 hover:bg-pastel-green-200 text-pastel-green-700 py-3 rounded-lg font-semibold transition-colors">
                Upload Card Image
              </button>
              <button className="w-full bg-pastel-purple-100 hover:bg-pastel-purple-200 text-purple-700 py-3 rounded-lg font-semibold transition-colors">
                View History
              </button>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 mb-1">Action Required</p>
                <p className="text-sm text-red-700">1 patient has expired insurance. Contact before appointment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-pastel-green-500" />
          Recently Verified
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {verifiedToday.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${
                item.status === 'active' ? 'bg-pastel-green-50 border-2 border-pastel-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {item.status === 'active' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <p className="font-bold text-gray-800">{item.patient}</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.provider}</p>
              {item.status === 'active' ? (
                <>
                  <p className="text-xs text-gray-600 mb-1">{item.coverage}</p>
                  <p className="text-xs text-gray-600 mb-2">{item.deductible}</p>
                </>
              ) : (
                <p className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded mb-2">{item.issue}</p>
              )}
              <p className="text-xs text-gray-400">Verified at {item.verifiedAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
