import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/SideBar'
import { useEffect, useState } from 'react'
import useGroup from '../store/useGroupStore';

const GroupChat = () => {

 const { id } = useParams();

 const viewGroup = useGroup(state => state.viewGroup)
 const currentGroup = useGroup(state => state.currentGroup);
 const leaveGroup = useGroup(state => state.leaveGroup);
 const navigate = useNavigate();
 
useEffect(() => {
    console.log('fetching group:', id)
    viewGroup(id)
}, [])

  const messages = [
    { id: 1, sender: 'Ghohan', text: 'Hey everyone!', time: '9:41 AM', isMe: true },
    { id: 2, sender: 'John', text: 'Whats up', time: '9:42 AM', isMe: false },
    { id: 3, sender: 'Ghohan', text: 'Anyone read Zero to One?', time: '9:43 AM', isMe: true },
  ]

  const [message, setMessage] = useState('')


  async function leaveGroupHandler() {
    await leaveGroup(id)
    navigate('/');
  }

  if(!currentGroup) return <div>Loading...</div>


  return (

    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-56 flex-1 flex flex-col h-screen">

        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">{currentGroup.name}</h2>
            <p className="text-xs text-gray-400">{currentGroup.members.length}/{currentGroup.numberOfMembers} members</p>
          </div>
          <button onClick={() => leaveGroupHandler()} className="text-xs text-red-400 hover:text-red-600 font-medium">Leave</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col gap-1 ${msg.isMe ? 'items-end' : 'items-start'}`}>
              {!msg.isMe && <span className="text-xs text-gray-400 px-1">{msg.sender}</span>}
              <div className={`px-4 py-2 rounded-2xl text-sm max-w-xs ${msg.isMe ? 'bg-gray-900 text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-900 rounded-tl-sm'}`}>
                {msg.text}
              </div>
              <span className="text-xs text-gray-300 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 h-10 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-gray-400"
          />
          <button className="h-10 px-4 bg-gray-900 text-white text-sm font-medium rounded-xl">
            Send
          </button>
        </div>

      </main>
    </div>
  )
}

export default GroupChat