import { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import useGroup from '../store/useGroupStore'
import { useNavigate, useParams } from 'react-router-dom'

const Explore = () => {
  const [search, setSearch] = useState('')

  const groups = useGroup(state => state.exploreGroups);
  const exploreGroups = useGroup(state => state.exploreGroup);
  const joinGroup = useGroup(state => state.joinGroup);
  const navigate = useNavigate();

  useEffect(() => {
    exploreGroups();
  },[])

  async function joinHandler (id){
   await joinGroup(id)
   navigate(`/group/${id}`)
  }

  const filteredGroup = groups.filter(group => 
    group.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-56 flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Explore Groups</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 w-56"
          />
        </div>

        {/* Groups */}
        <div className="flex flex-col gap-3">
          {filteredGroup.length === 0 ? (
            <p className="text-sm text-gray-400">No groups found.</p>
          ) : (
            filteredGroup.map((group) => (
              <div key={group._id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:border-gray-200 transition-colors">

                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-gray-900">{group.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">{group.tags}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{group.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-gray-900">
                      {group.members.length}<span className="text-gray-300 font-normal">/{group.numberOfMembers}</span>
                    </span>
                    <span className="text-xs text-gray-400">members</span>
                  </div>
                  <button onClick={() => joinHandler(group._id)} className="text-xs font-medium bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    Join
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </main>
    </div>
  )
}

export default Explore