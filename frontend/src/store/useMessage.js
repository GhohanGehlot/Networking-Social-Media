import axios from "../utils/axiosInstance"
import {create} from 'zustand';

const useMessage = create((set , get) => ({
    messages : [],

    getMessages : async (groupId) => {
        
        try {
         const response = await axios.get(`/messages/${groupId}`)
         set({messages : response.data.messages})

        } catch (error) {
            console.log(error.message)
        }
    },

    addMessage : (message) => {
         set((state) => ({
            messages: [...state.messages, message]
        }))
    }




}))

export default useMessage;