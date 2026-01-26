import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';
import { LockKeyhole, Loader2 } from 'lucide-react';
import './Login.css'; // Assuming you have some styles for the login page
import { useThemeStore } from '../store/useThemeStore';
import Navbar from '../components/Navbar';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const role = searchParams.get('role');
  const { resetPassword } = useAuthStore();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {theme}=useThemeStore()

  const handleReset = async () => {
    if (!newPassword) return toast.error("Mot de passe requis");

    setLoading(true);
    try {
      await resetPassword({ token, nouveau_mdp: newPassword, role });
      toast.success("Mot de passe réinitialisé !");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !role) {
      toast.error("Lien invalide ou incomplet");
      navigate('/login');
    }
  }, [token, role, navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 px-4 ${theme === 'light' ? 'login-lr1' :  'login-dr1'}`}>
   <Navbar />     
      <div className="bg-base-100 p-8 rounded-3xl shadow-2xl w-full max-w-md relative animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full shadow-md">
            <LockKeyhole className="text-indigo-600 w-8 h-8" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4 reset">Réinitialisation</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Veuillez entrer votre nouveau mot de passe sécurisé</p>

        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="input input-bordered w-full pl-11"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <LockKeyhole className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="btn w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 py-3 rounded-xl shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              En cours...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>Réinitialiser</span>
              <LockKeyhole className="h-5 w-5" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
