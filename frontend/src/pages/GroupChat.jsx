import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/SideBar'
import { useEffect, useState } from 'react'
import useGroup from '../store/useGroupStore';
import useMessage from '../store/useMessage';
import socket from '../socket';
import useAuth from '../store/useAuthStore';
import { useRef } from 'react';

const GroupChat = () => {

 const { id } = useParams();

 const [message, setMessage] = useState('')

 const viewGroup = useGroup(state => state.viewGroup)
 const currentGroup = useGroup(state => state.currentGroup);
 const leaveGroup = useGroup(state => state.leaveGroup);
 const messages = useMessage(state => state.messages);
 const getMessages = useMessage(state => state.getMessages)
 const addMessage = useMessage(state => state.addMessage);
 const authUser = useAuth(state => state.user);

 const navigate = useNavigate();
 const bottomRef = useRef(null)
 
useEffect(() => {
    viewGroup(id);
    getMessages(id);

    socket.connect();
    socket.emit("join-room" , id);

    socket.on("receive-message" , (newMessage) => {
     if (newMessage.sender._id !== authUser._id) {
      addMessage(newMessage);
  }
    })


    return () => {
      socket.off("recieve-message");
      socket.disconnect()
    }
}, [id])

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth"})
},[messages])

function sendHandler(){
  if(!message.trim()) return;

  const newMsg = {
    message,
    sender: {
      _id: authUser._id,
      username: authUser.username
    },
    createdAt: new Date().toISOString()
  }

  addMessage(newMsg);

  socket.emit("send-message" , {
    groupId : id,
    message,
    sender : authUser?._id
  })

  setMessage("")
}



  async function leaveGroupHandler() {
    await leaveGroup(id)
    navigate('/');
  }

  function groupHeaderHandler(){
     navigate(`/group/${id}/detail`)
  }
  if(!currentGroup) return <div>Loading...</div>


  return (

    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-56 flex-1 flex flex-col h-screen">

        {/* Header */}
        <div onClick={() => groupHeaderHandler()} className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">{currentGroup.name}</h2>
            <p className="text-xs text-gray-400">{currentGroup.members.length}/{currentGroup.numberOfMembers} members</p>
          </div>
          <button onClick={() => leaveGroupHandler()} className="text-xs text-red-400 hover:text-red-600 font-medium">Leave</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {messages.map((msg, index) => {
            const isMe = msg.sender._id === authUser._id;
           return (<div key={index} className={`flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
              {!isMe && <span className="text-xs text-gray-400 px-1">{msg.sender.username}</span>}
              <div className={`px-4 py-2 rounded-2xl text-sm max-w-xs ${isMe ? 'bg-gray-900 text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-900 rounded-tl-sm'}`}>
                {msg.message}
              </div>
              <span className="text-xs text-gray-300 px-1">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                     hour: "2-digit",
                     minute: "2-digit"
                   })}
              </span>
            </div>)
          })}

            <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendHandler()}
            placeholder="Type a message..."
            className="flex-1 h-10 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-gray-400"
          />
          <button onClick={sendHandler} className="h-10 px-4 bg-gray-900 text-white text-sm font-medium rounded-xl">
            Send
          </button>
        </div>

      </main>
    </div>
  )
}

export default GroupChat