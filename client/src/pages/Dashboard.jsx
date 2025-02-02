import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    totalFiles: 0
  })

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-accent">{stats.totalUsers}</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
          <p className="text-3xl font-bold text-accent">{stats.totalTasks}</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Files Uploaded</h3>
          <p className="text-3xl font-bold text-accent">{stats.totalFiles}</p>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Task Completion Trend</h3>
        <Line data={chartData} />
      </div>
    </div>
  )
}

export default Dashboard