import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';

const rawUser = localStorage.getItem('user');
let parsedUser = null;

try {
  parsedUser = rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null;
} catch {
  parsedUser = null;
}

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  user: parsedUser,
  isAuthenticated: !!localStorage.getItem('token'),
  isCheckingAuth: true,

  login: async ({ email, mot_de_passe, role }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await axiosInstance.post('/auth/login', {
        email,
        mot_de_passe,
        role,
      });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        token,
        role: user.role,
        user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });

      return true;
    } catch (err) {
      throw err;
    }
  },

  logout: () => {
    toast.success("Déconnexion réussie");
    localStorage.clear();
    set({ token: null, role: null, user: null, isAuthenticated: false, isCheckingAuth: false });
  },

  initAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isCheckingAuth: false });
      return;
    }

    try {
      const res = await axiosInstance.get('/auth/checkAuth', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      set({
        token,
        role: user.role,
        user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (err) {
      localStorage.clear();
      set({ token: null, role: null, user: null, isAuthenticated: false, isCheckingAuth: false });
      console.error('Erreur lors de l\'initialisation de l\'authentification:', err);
    }
  },

  forgotPassword: async ({ email, role }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await axiosInstance.post('/auth/forgot-password', { email, role });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  resetPassword: async ({ token, nouveau_mdp, role }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await axiosInstance.post('/auth/reset-password', {
        token,
        nouveau_mdp,
        role,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },


register: async (formData) => {
  try {
    const res = await axiosInstance.post("/auth/register", formData);
    toast.success(res.data.message); // message de succès
    return res.data;
  } catch (err) {
    // si le contrôleur renvoie une erreur
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Erreur inconnue, réessayez plus tard");
    }
    throw err;
  }
},

}));


export default useAuthStore;
