import { useState } from 'react'

function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Project', assignedTo: 'John Doe', status: 'In Progress', dueDate: '2024-03-20' },
    { id: 2, title: 'Client Meeting', assignedTo: 'Jane Smith', status: 'Pending', dueDate: '2024-03-25' }
  ])
  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', status: 'Pending', dueDate: '' })

  const handleAddTask = (e) => {
    e.preventDefault()
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }])
    setNewTask({ title: '', assignedTo: '', status: 'Pending', dueDate: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Task Management</h1>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Assign New Task</h2>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              required
              className="input-field"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
            <input
              type="text"
              required
              className="input-field"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="input-field"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              required
              className="input-field"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
          </div>
          
          <button type="submit" className="btn-primary">
            Assign Task
          </button>
        </form>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map(task => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Tasks