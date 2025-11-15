'use client'

import { Calendar, Users, Clock, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface DashboardOverviewProps {
  searchQuery: string
}

export default function DashboardOverview({ searchQuery }: DashboardOverviewProps) {
  const stats = [
    {
      label: 'Today\'s Appointments',
      value: '24',
      icon: Calendar,
      color: 'from-pastel-blue-400 to-pastel-blue-500',
      trend: '+3 from yesterday'
    },
    {
      label: 'Checked In',
      value: '18',
      icon: CheckCircle,
      color: 'from-pastel-green-400 to-pastel-green-500',
      trend: '75% completion'
    },
    {
      label: 'Pending Check-ins',
      value: '3',
      icon: Clock,
      color: 'from-yellow-400 to-yellow-500',
      trend: 'Due now'
    },
    {
      label: 'Urgent Tasks',
      value: '2',
      icon: AlertTriangle,
      color: 'from-red-400 to-red-500',
      trend: 'Requires attention'
    },
  ]

  const recentActivity = [
    { patient: 'Sarah Johnson', action: 'Checked in', time: '2 min ago', status: 'success' },
    { patient: 'Michael Brown', action: 'Appointment confirmed', time: '5 min ago', status: 'info' },
    { patient: 'Emily Davis', action: 'Insurance verified', time: '12 min ago', status: 'success' },
    { patient: 'Robert Wilson', action: 'Appointment rescheduled', time: '15 min ago', status: 'warning' },
    { patient: 'Jennifer Lee', action: 'Called - No answer', time: '23 min ago', status: 'error' },
  ]

  const upcomingAppointments = [
    { time: '10:00 AM', patient: 'David Martinez', type: 'Cleaning', status: 'confirmed' },
    { time: '10:30 AM', patient: 'Lisa Anderson', type: 'Check-up', status: 'pending' },
    { time: '11:00 AM', patient: 'James Taylor', type: 'Root Canal', status: 'confirmed', conflict: true },
    { time: '11:00 AM', patient: 'Mary Thompson', type: 'Filling', status: 'confirmed', conflict: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-500 mt-1">Here's what's happening today</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Time</p>
          <p className="text-xl font-semibold text-gray-700">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" aria-label="Trending up" />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.trend}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-pastel-blue-500" />
            Upcoming Appointments
          </h3>
          <div className="space-y-3">
            {upcomingAppointments.map((apt, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                  apt.conflict
                    ? 'bg-red-50 border-2 border-red-300'
                    : apt.status === 'pending'
                    ? 'bg-yellow-50'
                    : 'bg-pastel-blue-50'
                }`}
              >
                <div className="text-center min-w-[70px]">
                  <p className="text-sm font-bold text-gray-700">{apt.time}</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{apt.patient}</p>
                  <p className="text-sm text-gray-600">{apt.type}</p>
                </div>
                {apt.conflict && (
                  <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" aria-label="Scheduling conflict" />
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  apt.status === 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-pastel-green-500" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{activity.patient}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-pastel-blue-100 border-2 border-pastel-blue-300 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-3">Search Results for: "{searchQuery}"</h3>
          <p className="text-gray-600">AI is processing your request...</p>
        </motion.div>
      )}
    </div>
  )
}
