// components/AdminDashCompnents/EnseignantForm.jsx
import React, { useEffect, useState } from 'react';
import useAdminStore from '../../store/useAdminStore';
import { X, Mail, User, Calendar, Lock, MapPin, BookOpen } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const EnseignantForm = ({ enseignant, onClose }) => {
  const { addUser, updateUser } = useAdminStore();
  const isEdit = !!enseignant;
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
      setFormData({ ...enseignant });
    }
  }, [enseignant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    if (isEdit) {
      delete dataToSend.mot_de_passe;
      await updateUser('enseignant', enseignant.id, dataToSend);
    } else {
      await addUser('enseignant', dataToSend);
    }
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${theme=="light"?" bg-black/20":"bg-white/20"} bg-black/20 bg-opacity-40 z-50 flex items-center justify-center`}>
      <div className="bg-base-100 p-2 sm:p-6 rounded-xl shadow-xl w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <h2 className="text-xl sm:text-3xl audiowide-regular-b  ">
            {isEdit ? 'Modifier Enseignant' : 'Ajouter Enseignant'}
          </h2>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="form-control">
            <span className="label-text flex items-center gap-1"><User size={16} /> Nom</span>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control">
            <span className="label-text flex items-center gap-1"><Mail size={16} /> Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control">
            <span className="label-text flex items-center gap-1"><Calendar size={16} /> Date de naissance</span>
            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance?.split('T')[0]}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </label>


          <label className="form-control">
            <span className="label-text flex items-center gap-1"><MapPin size={16} /> Adresse</span>
            <input
              type="text"
              name="adress"
              value={formData.adress}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </label>

          {!isEdit && (
            <label className="form-control">
              <span className="label-text flex items-center gap-1"><Lock size={16} /> Mot de passe</span>
              <input
                type="password"
                name="mot_de_passe"
                value={formData.mot_de_passe}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </label>
          )}

           <div className="flex justify-between gap-2 mt-4">
            <button type="button" className="btn btn-sm sm:btn-md  btn-error text-white" onClick={onClose}>
             Annuler l’action <X></X>
            </button>
            <button type="submit" className="btn btn-sm sm:btn-md  btn-primary">
             {isEdit ? (
  <>
    Modifier l’enseignant <BookOpen size={20} />
  </>
) : (
  <>
    Ajouter l’enseignant <BookOpen size={20} />
  </>
)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnseignantForm;
