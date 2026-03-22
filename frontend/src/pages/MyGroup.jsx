import React from 'react'
import Sidebar from '../components/SideBar';
import GroupCard from '../components/GroupCard';

const MyGroups = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-56 flex-1 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">My Groups</h2>
        <GroupCard/>
      </main>
    </div>
  )
}

export default MyGroups;