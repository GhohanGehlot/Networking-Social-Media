import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/SideBar'
import useGroup from '../store/useGroupStore'
import useAuthStore from '../store/useAuthStore'

const GroupDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const currentGroup = useGroup(state => state.currentGroup)
  const viewGroup = useGroup(state => state.viewGroup)
  const deleteGroup = useGroup(state => state.deleteGroup)
  const authUser = useAuthStore(state => state.user)

  useEffect(() => {
    viewGroup(id)
  }, [id])

  async function deleteHandler() {
    await deleteGroup(id)
    navigate('/')
  }

  const isAdmin = currentGroup?.host?._id === authUser?._id

  if (!currentGroup) return <div className="flex items-center justify-center min-h-screen text-sm text-gray-400">Loading...</div>

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-56 flex-1 p-10 max-w-xl">

        {/* Back */}
        <button
          onClick={() => navigate(`/group/${id}`)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mb-10 font-medium tracking-wide uppercase"
        >
          ← Back
        </button>

        {/* Group Info */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentGroup.name}</h1>
          <div className="flex items-center gap-2 flex-wrap">       
            <span  className="text-xs font-mono text-gray-400 bg-white border border-gray-200 px-2.5 py-1 rounded-lg">{currentGroup.tags}</span>   
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg font-medium">{currentGroup.category}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div>
            <p className="text-2xl font-bold text-gray-900 font-mono">
              {currentGroup.members.length}
              <span className="text-gray-300 font-normal text-lg">/{currentGroup.numberOfMembers}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">members</p>
          </div>
          <div className="flex-1">
            <div className="w-full bg-gray-100 rounded-full h-1">
              <div
                className="bg-gray-900 h-1 rounded-full"
                style={{ width: `${(currentGroup.members.length / currentGroup.numberOfMembers) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {Math.round((currentGroup.members.length / currentGroup.numberOfMembers) * 100)}% full
            </p>
          </div>
        </div>

        {/* Members */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">Members</h2>
            <span className="text-xs text-gray-400 font-mono">{currentGroup.members.length} total</span>
          </div>

          <div className="flex flex-col gap-1">
            {currentGroup.members.map((member) => (
              <div key={member._id} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold">
                    {member.username?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700">{member.username}</span>
                </div>
                {member._id === currentGroup.createdBy && (
                  <span className="text-xs font-mono text-gray-400">admin</span>
                )}
                {member._id === authUser?._id && (
                  <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full">you</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone — admin only */}
        {isAdmin && (
          <div className="pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-3">Admin only — this cannot be undone.</p>
            <button
              onClick={() => deleteHandler()}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-400 font-medium hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all"
            >
              Delete Group
            </button>
          </div>
        )}

      </main>
    </div>
  )
}

export default GroupDetail