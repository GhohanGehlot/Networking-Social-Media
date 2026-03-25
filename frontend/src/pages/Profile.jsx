import Sidebar from "../components/SideBar"

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-56 flex-1 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile</h2>

        <div className="bg-white border border-gray-100 rounded-2xl p-8 max-w-md">
          
          {/* Profile pic */}
          <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold mb-6">
            G
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-400 tracking-wide">Full name</span>
              <span className="text-sm font-medium text-gray-900">Ghohan</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-400 tracking-wide">Email address</span>
              <span className="text-sm font-medium text-gray-900">ghohan@example.com</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-400 tracking-wide">Member since</span>
              <span className="text-sm font-medium text-gray-900">March 2026</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Profile