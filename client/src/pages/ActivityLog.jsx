import { useState, useEffect } from 'react'

function ActivityLog() {
  const [activities, setActivities] = useState([
    { id: 1, user: 'Admin', action: 'Added new user: John Doe', timestamp: '2024-03-15 10:30:00' },
    { id: 2, user: 'Admin', action: 'Uploaded file: Report-Q1.xlsx', timestamp: '2024-03-15 11:15:00' },
    { id: 3, user: 'Admin', action: 'Assigned task to Jane Smith', timestamp: '2024-03-16 09:45:00' }
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Activity Log</h1>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">By {activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActivityLog