import React, { useEffect } from 'react'
import Sidebar from '../components/SideBar';
import GroupCard from '../components/GroupCard';
import { useState } from 'react';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import useGroup from '../store/useGroupStore';

const MyGroups = () => {

  const [showModal , setShowModal] = useState(false);
  const [name , setName] = useState('');
  const [description , setDescription] = useState('');
  const [category , setCategory] = useState('');
  const [numberOfMembers , setnumberOfMembers] = useState('');


  const groups = useGroup(state => state.groups);
  

 async function onSubmitHandler(e){
    e.preventDefault();
    
    try {
      
      const response = await axios.post("/group/create" , {name , description , category , numberOfMembers});
      setShowModal(false);
      setName("");
      setDescription("");
      setCategory("");
      setnumberOfMembers("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Something went wrong")
    }

  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-56 flex-1 p-8">
      <div className='flex items-center justify-between mb-6'>
          <h2 className="text-xl font-bold text-gray-900 mb-6">My Groups</h2>
        <div>
         <button
         onClick={() => setShowModal(true)} 
            className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
          + Create New
  </button>
      </div>
        </div>

        <GroupCard/>
      

   {
    showModal && (
     <form onSubmit={onSubmitHandler} className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Create Group</h3>
        <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-900 text-xl">✕</button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Group name</label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="e.g. CFA Elites" className="h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-gray-400" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Description</label>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="What's this group about?" className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-gray-400 resize-none h-20" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Category</label>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-gray-400">
            <option value="">Select category</option>
            <option value="Finance">Finance</option>
            <option value="AI">AI</option>
            <option value="Tech">Tech</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label  className="text-xs font-medium text-gray-500">Max members (5-100)</label>
          <input onChange={(e) => setnumberOfMembers(e.target.value)} value={numberOfMembers} type="number" min={5} max={100} placeholder="e.g. 20" className="h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-gray-400" />
        </div>

        <button type='submit'  className="mt-2 h-10 bg-gray-900 text-white text-sm font-medium rounded-lg">
          Create Group
        </button>
      </div> 
    </div>
  </form>
          )
        }
      </main>
    </div>
  )
}

export default MyGroups;