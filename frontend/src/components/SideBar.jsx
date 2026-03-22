import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: 'My Groups', path: '/', icon: '⊞' },
    { label: 'Profile', path: '/profile', icon: '◯' },
  ]

  return (
    <div className="h-screen w-56 bg-white border-r border-gray-100 flex flex-col px-3 py-6 fixed left-0 top-0">
      <h1 className="text-lg font-bold text-gray-900 px-3 mb-8 tracking-tight">NetSocio</h1>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors
              ${location.pathname === item.path
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <button
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <span>→</span>
        Logout
      </button>
    </div>
  )
}

export default Sidebar