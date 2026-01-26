import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import { X, User, Mail, Calendar, MapPin, Lock, User2, Crown } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const AdminForm = ({ admin, onClose }) => {
  const { addUser, updateUser } = useAdminStore();
  const isEdit = !!admin;
     const {theme}=useThemeStore()

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    adress: '',
    date_naissance: '',
    mot_de_passe: '',
  });

  useEffect(() => {
    if (isEdit) {
      setFormData({ ...admin });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    if (isEdit) {
      delete dataToSend.mot_de_passe;
      await updateUser('admin', admin.id, dataToSend);
    } else {
      await addUser('admin', dataToSend);
    }
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${theme=="light"?" bg-black/20":"bg-white/20"} bg-black/20 bg-opacity-40 z-50 flex items-center justify-center`}>
      <div className="bg-base-100 p-6 rounded-xl shadow-xl w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <h2 className="text-3xl audiowide-regular-b">
            
            {isEdit ? 'Modifier Admin' : 'Ajouter Admin'}
          </h2>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>
            <X />
          </button>
        </div>
         <form onSubmit={handleSubmit} className="space-y-4">
          <label className="form-control w-full">
            <div className="label"><span className="label-text">Nom</span></div>
            <div className="relative">
              <User className="absolute left-3 top-2 z-1 text-gray-400" />
              <input
                type="text"
                name="nom"
                placeholder="Nom complet"
                value={formData.nom}
                onChange={handleChange}
                className="input input-bordered w-full pl-12"
                required
              />
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label"><span className="label-text">Email</span></div>
            <div className="relative">
              <Mail className="absolute left-3 top-2 z-1 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full pl-12"
                required
              />
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label"><span className="label-text">Date de naissance</span></div>
            <div className="relative">
              <Calendar className="absolute left-3 top-2 z-1 text-gray-400" />
              <input
                type="date"
                name="date_naissance"
                value={formData.date_naissance?.split('T')[0]}
                onChange={handleChange}
                className="input input-bordered w-full pl-12"
                required
              />
            </div>
          </label>

          

          <label className="form-control w-full">
            <div className="label"><span className="label-text">Adresse</span></div>
            <div className="relative">
              <MapPin className="absolute left-3 top-2 z-1 text-gray-400" />
              <input
                type="text"
                name="adress"
                placeholder="Adresse"
                value={formData.adress}
                onChange={handleChange}
                className="input input-bordered w-full pl-12"
                required
              />
            </div>
          </label>

          {!isEdit && (
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Mot de passe</span></div>
              <div className="relative">
                <Lock className="absolute left-3 top-2 z-1 text-gray-400" />
                <input
                  type="password"
                  name="mot_de_passe"
                  placeholder="Mot de passe"
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-12"
                  required
                />
              </div>
            </label>
          )}

          <div className="flex justify-between gap-2 mt-4">
            <button type="button" className="btn btn-error text-white" onClick={onClose}>
             Annuler l’action <X></X>
            </button>
            <button type="submit" className="btn btn-primary">
             {isEdit ? (
  <>
    Modifier l’étudiant <Crown />
  </>
) : (
  <>
    Ajouter l’étudiant <Crown />
  </>
)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
