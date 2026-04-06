import {create} from 'zustand';
import axios from '../utils/axiosInstance';

const useGroup = create((set) => ({
    groups : [],
    currentGroup : null,

    myGroup : async () => {
        const response = await axios.get("/group/my-groups");
        set({ groups : response.data.groups})
    },

    viewGroup : async (id) => {
        const response = await axios.get(`/group/${id}`);
        console.log("view" ,response.data.group);
        set({ currentGroup : response.data.group})
    }


}))

export default useGroup;

