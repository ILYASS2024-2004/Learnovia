
import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';

const useNotificationStore = create((set) => ({
  notifications: [],
  totalNonLues: 0,       //nombre de notifications non lues
  loading: false,
  error: null,

  //  Étudiant : récupérer ses notifications
  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/notifications');
      set({ 
        notifications: res.data.notifications, 
        totalNonLues: res.data.total_non_lues,
        loading: false 
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Erreur lors du chargement', loading: false });
      toast.error('Impossible de charger les notifications');
    }
  },

  //  Admin : ajouter une notification (globale ou ciblée)
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

  // 🔼 Étudiant : marquer toutes les notifications comme lues
  marquerToutesCommeLues: async () => {
    try {
      await axiosInstance.put('/notifications/toutes/lire');
      set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, est_lu: true })),
        totalNonLues: 0
      }));
      console.log('Toutes les notifications sont maintenant lues');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Impossible de marquer comme lues');
    }
  },
    //  Supprimer une notification par ID (admin)
  deleteNotification: async (id) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      toast.success('Notification supprimée');
      // Supprimer la notification localement pour mise à jour immédiate
      set(state => ({
        notifications: state.notifications.filter(n => n.id !== id),
        totalNonLues: state.notifications.filter(n => n.id !== id && !n.est_lu).length
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la suppression');
      throw err;
    }
  }
}));

export default useNotificationStore;
