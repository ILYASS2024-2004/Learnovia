import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';

const useNotificationStore = create((set) => ({
  notifications: [],
  loading: false,
  error: null,

  // 🔽 Étudiant : récupérer ses notifications
  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/notifications');
      set({ notifications: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Erreur lors du chargement', loading: false });
      toast.error('Impossible de charger les notifications');
    }
  },

  // 🔼 Admin : ajouter une notification (globale ou ciblée)
  addNotification: async (notificationData) => {
    try {
      const res = await axiosInstance.post('/notifications', notificationData);
      toast.success('Notification ajoutée');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de l\'ajout');
      throw err;
    }
  },
}));

export default useNotificationStore;
