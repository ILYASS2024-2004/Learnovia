import React, { useState } from 'react';
import toast from 'react-hot-toast';
import  useAuthStore from '../store/useAuthStore'; // ✅
import { Loader,Send, SmilePlus } from 'lucide-react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('etudiant');
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuthStore(); // ✅

  const handleForgot = async () => {
    if (!email || !role) return toast.error("Tous les champs sont requis");
    setLoading(true);
    try {
      await forgotPassword({ email, role });
      toast.success("Lien envoyé ! Vérifie ta boîte mail");
      setEmail('');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed h-screen inset-0 flex justify-center items-center z-9999990 forgot-password-modal">
      <div className="bg-base-100 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center mdp-f  ">Mot de passe oublié</h2>

        <input
          type="email"
          placeholder="Adresse e-mail"
          className="input input-bordered w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="select select-bordered w-full mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="etudiant">Étudiant</option>
          <option value="enseignant">Enseignant</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-between items-center">
          <button className="btn btn-error text-white" onClick={onClose}>Annuler, Je me souviens <SmilePlus size={18}/> </button>
          <button className="btn btn-primary "  disabled={loading} onClick={handleForgot}>
  {loading ? (
    <Loader className="animate-spin" />
  ) : (
    <span className="flex items-center gap-2">
      Envoyer, maintenat <Send size={18} />
    </span>
  )}
</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
