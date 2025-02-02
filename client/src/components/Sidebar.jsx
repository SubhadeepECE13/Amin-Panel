import { Link, useLocation } from 'react-router-dom'
import { RiDashboardLine, RiUserLine, RiTaskLine, RiFileList3Line, RiHistoryLine } from 'react-icons/ri'

function Sidebar({ isOpen }) {
  const location = useLocation()
  
  const menuItems = [
    { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
    { path: '/users', icon: RiUserLine, label: 'Users' },
    { path: '/tasks', icon: RiTaskLine, label: 'Tasks' },
    { path: '/files', icon: RiFileList3Line, label: 'Files' },
    { path: '/activity', icon: RiHistoryLine, label: 'Activity Log' }
  ]

  return (
    <aside className={`bg-primary text-white w-64 min-h-screen ${isOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}>
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-secondary transition-colors ${
                location.pathname === item.path ? 'bg-secondary text-white' : ''
              }`}
            >
              <Icon className="sidebar-icon mr-3" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar