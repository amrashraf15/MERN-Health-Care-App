import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";



const API_URL = import.meta.env.MODE === "development" ? "http://localhost:6060/api/auth" : "/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    authUser:null,
    appointment:null,
    isGettingAppointments:false,
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:false,
    isGettingProfile:false,
    isUpdatingProfile:false,
    bookedDoctor:null,
    appointments:[],

    checkAuth: async () =>{
        set({isCheckingAuth:true})
        try {
            const res = await axios.get(`${API_URL}/check-auth`);
            set({authUser:res.data.user})
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        }finally{
            set({isCheckingAuth:false});
        }
    },
    signup: async (data) => {
        console.log("Data sent to backend:", data);
        set({isSigningUp:true})
            try {
                const res = await axios.post(`${API_URL}/signup`,data)
                set({authUser:res.data.user});
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message || "Something went wrong");
            }finally{
                set({isSigningUp:false})
            }
    },
    login: async (email,password) => {
        set({isLoggingIn:true})
        try {
            const res = await axios.post(`${API_URL}/login`,{email,password});
            set({authUser:res.data.user})
        } catch (error) {
                console.log("Error in login:", error);
                toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isLoggingIn:false})
        }
    },
    logout: async () => {
        try {
            await axios.post(`${API_URL}/logout`);
            set({authUser:null})
            toast.success("Logged out successfully");  
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    getProfile: async () => {
        set({isGettingProfile:true})
        try {
            const res = await axios.get(`${API_URL}/get-profile`);
            set({authUser:res.data.user})
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isGettingProfile:false})
        }
    },
    updateProfile: async (data) =>{
        set({isUpdatingProfile:true})
        try {
            const res = await axios.put(`${API_URL}/update-profile`,data);
            set({authUser:res.data.user})
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isUpdatingProfile:false})
        }
    },
    listAppointment:async () => {
        set({isGettingAppointments:true})
        try {
            const res =await axios.get(`${API_URL}/appointments`);
            set({appointments:res.data.appointments});
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isGettingAppointments:false})
        }

    },
    bookAppointment: async ({docId,slotDate,slotTime}) => {
        try {
            const res = await axios.post(`${API_URL}/book-appointment`,{docId,slotDate,slotTime});
            set({appointment:res.data.appointmentData,bookedDoctor:res.data.appointmentData.docData})
            toast.success("Appointment Booked successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    },
    cancelAppointment: async (appointmentId) =>{
        try {
            const res = await axios.put(`${API_URL}/cancel-appointment`,{appointmentId});
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
}))
