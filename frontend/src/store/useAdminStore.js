import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';

const useAdminStore = create((set) => ({
  stats: null,
  isLoading: false,
  users: {
    etudiants: [],
    enseignants: [],
    admins: [],
  },

  // 📊 Statistiques
  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/admin/stats');
      set({ stats: res.data, isLoading: false });
    } catch (err) {
      console.error("Erreur stats :", err);
      toast.error(err.response?.data?.message || "Erreur stats");
      set({ isLoading: false });
    }
  },

  // 👥 Utilisateurs - Récupération
  fetchUsers: async (role) => {
    try {
      const res = await axiosInstance.get(`/users/${role}s`);
      set((state) => ({
        users: { ...state.users, [`${role}s`]: res.data }
      }));
    } catch (err) {
      toast.error(`Erreur chargement ${role}s`);
      console.error(err)
      
    }
  },

  // ➕ Ajouter utilisateur
  addUser: async (role, data) => {
    try {
      const res = await axiosInstance.post(`/users/${role}s`, data);
      toast.success(`${role} ajouté avec succès`);
      await useAdminStore.getState().fetchUsers(role);
      await useAdminStore.getState().fetchStats(); // 🔥 Ajouté ici
      console.log(res)
    } catch (err) {
      toast.error(err.response?.data?.message || `Erreur ajout ${role}`);

    }
  },

  // ✏️ Modifier utilisateur
  updateUser: async (role, id, data) => {
    try {
      await axiosInstance.put(`/users/${role}s/${id}`, data);
      toast.success(`${role} mis à jour`);
      await useAdminStore.getState().fetchUsers(role);
      await useAdminStore.getState().fetchStats(); // 🔥 Ajouté ici
    } catch (err) {
      toast.error(err.response?.data?.message || `Erreur mise à jour ${role}`);
    }
  },

  // ❌ Supprimer utilisateur
  deleteUser: async (role, id) => {
    try {
      await axiosInstance.delete(`/users/${role}s/${id}`);
      toast.success(`${role} supprimé`);
      await useAdminStore.getState().fetchUsers(role);
      await useAdminStore.getState().fetchStats(); // 🔥 Ajouté ici
    } catch (err) {
      toast.error(err.response?.data?.message || `Erreur suppression ${role}`);
    }
  },

}));

export default useAdminStore;
