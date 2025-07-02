import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";



const API_URL = import.meta.env.MODE === "development" ? "http://localhost:6060/api/admin" : "/api/admin";
axios.defaults.withCredentials = true;

export const useAdminStore = create((set) => ({
    authAdmin:null,
    isLoggingIn:false,
    isCheckingAdmin:false,
    isAddingDoctor:false,
    isGettingDoctors:false,
    doctors:[],
    dashboardData:{},
    newDoctor:null,
    allAppointments:[],

    checkAdmin: async () =>{
        set({isCheckingAdmin:true})
        try {
            const res = await axios.get(`${API_URL}/check-admin`);
            set({authAdmin:res.data.admin})
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authAdmin: null });
        }finally{
            set({isCheckingAdmin:false});
        }
    },
    login: async (email,password) => {
        set({isLoggingIn:true})
        try {
            const res = await axios.post(`${API_URL}/login`,{email,password});
            set({authAdmin:res.data.admin})
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
            set({authAdmin:null})
            toast.success("Admin Logged out successfully");  
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    addDoctor: async (data) => {
        set({isAddingDoctor:true})
        try {
            const res = await axios.post(`${API_URL}/add-doctor`,data);
            set({newDoctor:res.data.doctor})
            toast.success('Doctor added successfully');
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }finally{
            set({isAddingDoctor:false})
        }
    },
    getAllDoctors:async () => {
        set({isGettingDoctors:true})
        try {
            const res =await axios.get(`${API_URL}/all-doctors`)
            set({doctors:res.data.doctors})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }finally{
            set({isGettingDoctors:false})
        }
    },
    changeDoctorAvailability: async (id) => {
        try {
            await axios.put(`${API_URL}/change-availability`, { id });
            set((state) => ({
            doctors: state.doctors.map((doc) =>
            doc._id === id ? { ...doc, available: !doc.available } : doc
        ),}));
        toast.success('Availability Changed Successfully');
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to change availability");
        }
    },
    getAllAppointments: async () =>{
        try {
            const res = await axios.get(`${API_URL}/all-appointments`);
            set({allAppointments:res.data.appointments});
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to Fetch Appointments");
        }
    },
    deleteAppointment: async (appointmentId) => {
        try {
            await axios.delete(`${API_URL}/delete-appointment`,{data:{appointmentId}});
            toast.success('Appointment Deleted Successfully');
            await useAdminStore.getState().getAllAppointments(); 

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete Appointment");
        }
    },
    dashboard: async () => {
        try {
            const res = await axios.get(`${API_URL}/dashboard`)
            set({dashboardData:res.data.dashData})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch Dashboard Data");
        }
    }
}))