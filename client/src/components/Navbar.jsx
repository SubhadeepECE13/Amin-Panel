import { RiMenu2Fill, RiLogoutBoxRLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

function Navbar({ onMenuClick }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 py-3 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
        >
          <RiMenu2Fill className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 hover:text-accent transition-colors"
          >
            <RiLogoutBoxRLine className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar