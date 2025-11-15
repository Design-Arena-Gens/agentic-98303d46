'use client'

import AppointmentCalendar from './AppointmentCalendar'
import CheckInView from './CheckInView'
import InsuranceView from './InsuranceView'
import CallManagement from './CallManagement'
import MessagesView from './MessagesView'
import DashboardOverview from './DashboardOverview'

interface DashboardProps {
  activeView: string
  searchQuery: string
}

export default function Dashboard({ activeView, searchQuery }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto">
      {activeView === 'dashboard' && <DashboardOverview searchQuery={searchQuery} />}
      {activeView === 'appointments' && <AppointmentCalendar />}
      {activeView === 'checkin' && <CheckInView />}
      {activeView === 'insurance' && <InsuranceView />}
      {activeView === 'calls' && <CallManagement />}
      {activeView === 'messages' && <MessagesView />}
    </div>
  )
}
