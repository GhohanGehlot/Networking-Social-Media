  import { useEffect } from "react";
  import useGroup from "../store/useGroupStore";
  import { useNavigate } from "react-router-dom";




  const GroupCard = () => {


    const navigate = useNavigate();

    const groups = useGroup(state => state.groups);

    const myGroup = useGroup(state => state.myGroup);

      useEffect(() => {
        myGroup()
      }, [])

    return (
      <div className="flex flex-col gap-3">
          {groups.map((group) => (
          <div onClick={() => navigate(`/group/${group._id}`)} key={group._id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:border-gray-200 transition-colors">
        
        {/* Left — name + tag + type */}
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-gray-900">{group.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-mono">{group.tag}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{group.category}</span>
          </div>
        </div>

        {/* Right — member count */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm font-bold text-gray-900">{group.members.length}<span className="text-gray-300 font-normal">/{group.numberOfMembers}</span></span>
          <span className="text-xs text-gray-400">members</span>
        </div>

      </div>
    ))}
      </div>
      
    )
  }

  export default GroupCard;