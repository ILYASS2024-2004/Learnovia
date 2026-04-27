import React, { useEffect, useState } from 'react';
import { BookOpen, FileText, DollarSign, ImageIcon, X, ChevronFirst } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const CoursForm = ({ cours, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    prix: '',
    img_url: ''
  });
  const {theme}=useThemeStore();

  useEffect(() => {
    if (cours) {
      setFormData({
        titre: cours.titre || '',
        description: cours.description || '',
        prix: cours.prix || '',
        img_url: cours.img_url || ''
      });
    }
  }, [cours]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={`fixed inset-0 ${theme=="light"?" bg-black/20":"bg-white/20"} bg-black/20 bg-opacity-40 z-50 flex items-center justify-center`}>
      <div className="bg-base-100 rounded-lg p-2 sm:p-6 w-full max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost"
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-3xl audiowide-regular-b text-center mb-4">
          {cours ? 'Modifier le cours' : 'Ajouter un nouveau cours'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titre */}
          <label className="form-control w-full">
            <div className="label mb-1 mt-1">
              <span className="label-text">
                <BookOpen className="inline-block w-4 h-4 mr-1" />
                Titre
              </span>
            </div>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              placeholder="Ex: Cours JavaScript"
              className="input input-bordered w-full"
              required
            />
          </label>

          {/* Description */}
          <label className="form-control w-full">
            <div className="label mb-1 mt-1">
              <span className="label-text">
                <FileText className="inline-block w-4 h-4 mr-1" />
                Description
              </span>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description du cours..."
              className="textarea textarea-bordered w-full"
              required
            />
          </label>

          {/* Prix */}
          <label className="form-control w-full">
            <div className="label mb-1 mt-1">
              <span className="label-text">
                <DollarSign className="inline-block w-4 h-4 mr-1" />
                Prix
              </span>
            </div>
            <input
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              placeholder="Ex: 200"
              className="input input-bordered w-full"
              required
              min="0"
            />
          </label>

          {/* Image URL */}
          <label className="form-control w-full">
            <div className="label mb-1 mt-1">
              <span className="label-text">
                <ImageIcon className="inline-block w-4 h-4 mr-1" />
                URL de l'image
              </span>
            </div>
            <input
              type="text"
              name="img_url"
              value={formData.img_url}
              onChange={handleChange}
              placeholder="https://image-url.com/photo.jpg"
              className="input input-bordered w-full"
              required
            />
          </label>

          {/* Boutons */}
          <div className="mt-6 flex justify-between gap-2">
            <button type="button" onClick={onClose} className="btn btn-error text-white">
              Annuler l’action <X></X>
            </button>
            <button type="submit" className="btn btn-primary">
              {cours ? (
                <>Mettre à jour, Cours <BookOpen  /></>) :(<>Créer, Cours <BookOpen /></>) }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoursForm;
