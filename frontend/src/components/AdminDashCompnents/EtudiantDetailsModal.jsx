// ✅ components/AdminDashCompnents/EtudiantDetailsModal.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import useAdminStore from '../../store/useAdminStore';

const EtudiantDetailsModal = ({ etudiant, onClose }) => {
  const { theme } = useThemeStore();
  const { coursEtudiant, fetchCoursByEtudiant } = useAdminStore();

  useEffect(() => {
    if (etudiant?.id) {
      fetchCoursByEtudiant(etudiant.id); // récupérer les cours de cet étudiant
    }
  }, [etudiant?.id]);

  if (!etudiant) return null;

  return (
    <div
      className={`fixed inset-0 ${
        theme === "light" ? "bg-black/20" : "bg-white/20"
      } bg-opacity-40 z-50 flex items-center justify-center`}
    >
      <div className="bg-base-100 rounded-xl p-6 w-full max-w-lg shadow-xl relative max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 btn btn-sm btn-ghost"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg audiowide-regular-b mb-4">Détails de profil</h3>

        {/* Infos de l'étudiant */}
        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <strong>Nom:</strong> {etudiant.nom}
          </div>
          <div>
            <strong>Email:</strong> {etudiant.email}
          </div>
          <div>
            <strong>Date de naissance:</strong>{" "}
            {etudiant.date_naissance?.slice(0, 10)}
          </div>
          {etudiant.date_inscription_ecole && (
            <div>
              <strong>Inscrit depuis:</strong>{" "}
              {etudiant.date_inscription_ecole?.slice(0, 10)}
            </div>
          )}
          <div>
            <strong>Adresse:</strong> {etudiant.adress}
          </div>

          {/* Carte */}
          {etudiant.adress && (
            <div className="mt-2">
              <iframe
                title="Carte Google Maps"
                width="100%"
                height="200"
                style={{ border: 2, borderRadius: '10px' }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  etudiant.adress
                )}&output=embed`}
              ></iframe>
            </div>
          )}
        </div>

        {/* 🔹 Cours de l'étudiant */}
        {coursEtudiant.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-3">Cours de l'étudiant</h4>
            <div className="space-y-3">
              {coursEtudiant.map((cours) => (
                <div
                  key={cours.id}
                  className="flex items-center  rounded-xl overflow-hidden shadow-sm"
                >
                  {/* Photo du cours */}
                  <img
                    src={cours.img_url}
                    alt={cours.titre}
                    className="w-28 h-28 object-cover"
                  />
                  {/* Infos du cours */}
                  <div className="p-3 flex flex-col justify-center">
                    <h5 className="font-semibold">{cours.titre}</h5>
                    <span className="text-sm text-gray-500">{cours.enseignant}</span>
                    <span className="text-xs text-gray-400">{cours.email_enseignant}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EtudiantDetailsModal;
