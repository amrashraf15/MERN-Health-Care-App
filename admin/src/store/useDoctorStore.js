import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:6060/api/doctor" : "/api/doctor";
axios.defaults.withCredentials = true;


export const useDoctorStore = create((set) => ({
    authDoctor:null,
    isGettingAppointments:false,
    isLoggingIn:false,
    isCheckingDoctor:false,
    isGettingProfile:false,
    isUpdatingProfile:false,
    appointments:[],
    dashboardData:{},

    checkDoctor: async () =>{
        set({isCheckingDoctor:true})
        try {
            const res = await axios.get(`${API_URL}/check-auth`);
            set({authDoctor:res.data.doctor})
        } catch (error) {
            console.log("Error in checkDoctor:", error);
            set({ authDoctor: null });
        }finally{
            set({isCheckingDoctor:false});
        }
    },
    login: async (email,password) => {
        set({isLoggingIn:true})
        try {
            const res = await axios.post(`${API_URL}/login`,{email,password});
            set({authDoctor:res.data.doctor})
        } catch (error) {
                console.log("Error in Doctor login:", error);
                toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isLoggingIn:false})
        }
    },
    logoutDoctor: async () => {
        try {
            await axios.post(`${API_URL}/logout`);
            set({authDoctor:null});
            toast.success("Logged out successfully");  
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    doctorAppointments: async () => {
        try {
            const res = await axios.get(`${API_URL}/doctor-appointments`) ;
            set({appointments:res.data.latestAppointments});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    completeDoctorAppointment: async (appointmentId) => {
        try {
            await axios.put(`${API_URL}/complete-appointment`,{appointmentId});
            toast.success('Appointment Completed Successfully');
            await useDoctorStore.getState().doctorAppointments(); 
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete Appointment");
        }
    },
    getDoctorProfile: async () => {
            set({isGettingProfile:true})
            try {
                const res = await axios.get(`${API_URL}/doctor-info`);
                set({authDoctor:res.data.doctor})
            } catch (error) {
                toast.error(error.response.data.message || "Something went wrong");
            }finally{
                set({isGettingProfile:false})
            }
    },
    updateDoctorProfile: async (data) => {
        set({isUpdatingProfile:true})
        try {
            const res = await axios.put(`${API_URL}/update-doctor-info`,data);
            toast.success('Doctor Profile  Updated Successfully');
            set({authDoctor:res.data.doctor})
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isUpdatingProfile:false})
        }
    },
    doctorDashboard: async () => {
        try {
            const res = await axios.get(`${API_URL}/doctordashboard`)
            set({dashboardData:res.data.dashData})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch Dashboard Data");
        }
    }
}))
