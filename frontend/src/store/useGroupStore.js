import {create} from 'zustand';
import axios from '../utils/axiosInstance';

const useGroup = create((set) => ({
    groups : [],

    myGroup : async () => {
        const response = await axios.get("/group/my-groups");
        console.log(response.data.groups);
        set({ groups : response.data.groups})
    }
}))

export default useGroup;

