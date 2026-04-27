import React, { useEffect, useState } from 'react';
import { X, Mail, MessageSquareText, Users, Send } from 'lucide-react';
import useAdminStore from '../../store/useAdminStore';
import useNotificationStore from '../../store/useNotificationStore';
import { useThemeStore } from '../../store/useThemeStore';

const NotificationModal = ({ onClose }) => {
  const { users, fetchUsers } = useAdminStore();
  const { addNotification } = useNotificationStore();
   const {theme}=useThemeStore()

  const [formData, setFormData] = useState({
    titre: '',
    message: '',
    etudiant_id: '',
  });

  useEffect(() => {
    if (users.etudiants.length === 0) {
      fetchUsers('etudiant');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNotification({
      ...formData,
      etudiant_id: formData.etudiant_id || null,
    });
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${theme=="light"?" bg-black/20":"bg-white/20"} bg-black/20 bg-opacity-40 z-50 flex items-center justify-center`}>
      <div className="bg-base-100 p-2 sm:p-6 rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <div></div>
          <h2 className="text-xl sm:text-2xl audiowide-regular-b ">
           
            Envoyer une notification
          </h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titre */}
          <div>
            <label className="label text-sm font-semibold">Titre</label>
            <div className="relative">
              <input
                type="text"
                name="titre"
                placeholder="Ex. : test..."
                className="input input-bordered w-full pl-10"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="label text-sm font-semibold">Message</label>
            <div className="relative">
              <textarea
                name="message"
                placeholder="Contenu détaillé de la notification..."
                className="textarea textarea-bordered w-full pl-10"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <MessageSquareText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Étudiants */}
          <div>
            <label className="label text-sm font-semibold">Destinataire</label>
            <div className="relative">
              <select
                name="etudiant_id"
                className="select select-bordered w-full pl-10"
                value={formData.etudiant_id}
                onChange={(e) => setFormData({ ...formData, etudiant_id: e.target.value })}
              >
                <option value="">Tous les étudiants</option>
                {users.etudiants.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nom} - {e.email}
                  </option>
                ))}
              </select>
              <Users className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-2 mt-4 ">
            <button type="button" onClick={onClose} className="btn btn-sm sm:btn-md  btn-error text-white">
             Annuler l’action <X size={18}></X>
            </button>
            <button type="submit" className="btn btn-sm sm:btn-md  btn-primary">
               <span className="flex items-center gap-2 ">
      Envoyer, maintenat <Send size={18} />
    </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationModal;
