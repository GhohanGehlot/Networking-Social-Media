import {create} from 'zustand';
import axios from '../utils/axiosInstance';
import { persist} from 'zustand/middleware'
import { toast } from 'react-toastify';




const useAuth = create(persist((set) =>( {
    user : null,
    token : null,
    isLoading : true,

    login: async (email , password) => {
        const response = await axios.post('/auth/login', { email, password });
        if(!response.data.success) throw new Error(response.data.message);
        set({ user : response.data.user , token : response.data.token})
        toast.success(response.data.message);
    },

    register: async (username ,email , password) => {
        const response = await axios.post('/auth/register', { username , email, password });
        if(!response.data.success) throw new Error(response.data.message);
        set({ user : response.data.user , token : response.data.token})
        toast.success(response.data.message);
    },
    
    logout : async () => {
        const response = await axios.post('/auth/logout')
        set({
            user : null,
            token : null
        })
         toast.success(response.data.message);
    },

    fetchUser :async () => {
        try {
            const response = await axios.get('/user/profile');
            if(!response.data.success) throw new Error(response.data.message);
            set({
                user : response.data.user , token : response.data.token , isLoading : false
            })
        } catch (error) {
             set({ user: null, token : null , isLoading: false })
        }
    }
}), {
    name : 'auth-storage',
    partialize : (state) =>( { user : state.user , isLoading : false })
}))



export default useAuth;
