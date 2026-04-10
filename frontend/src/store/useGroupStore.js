import {create} from 'zustand';
import axios from '../utils/axiosInstance';


const useGroup = create((set) => ({
    groups : [],
    currentGroup : null,
    exploreGroups : [],
    

    myGroup : async () => {
        const response = await axios.get("/group/my-groups");
        set({ groups : response.data.groups})
    },

    viewGroup : async (id) => {
        const response = await axios.get(`/group/${id}`);
        set({ currentGroup : response.data.group})
    },

    exploreGroup : async () => {
        const response = await axios.get('group/explore');
        set({ exploreGroups : response.data.groups})
    },

    joinGroup : async (id) => {
       const response = await axios.post(`/group/${id}/join`)
       console.log("join" ,response.data);
        set((state) => ({
            groups : [ ...state.groups , response.data.group ]
        }))
    }


}))

export default useGroup;

