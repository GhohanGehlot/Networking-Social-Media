import {create} from 'zustand';
import axios from '../utils/axiosInstance';
import { persist} from 'zustand/middleware'




const useAuth = create(persist((set) =>( {
    user : null,
    token : null,
    isLoading : true,

    login: async (email , password) => {
        const response = await axios.post('/auth/login', { email, password });
        set({ user : response.data.user , token : response.data.token})
    },

    register: async (username ,email , password) => {
        const response = await axios.post('/auth/register', { username , email, password });
        set({ user : response.data.user , token : response.data.token})
    },
    
    logout : async () => {
        await axios.post('/auth/logout')
        set({
            user : null,
            token : null
        })
    },

    fetchUser :async () => {
        try {
            const response = await axios.get('/user/profile');
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
