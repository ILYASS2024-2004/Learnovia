
// ✅ components/AdminDashCompnents/EtudiantDetailsModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const EtudiantDetailsModal = ({ etudiant, onClose }) => {
   const {theme}=useThemeStore()
  if (!etudiant) return null;
  

  return (
    <div className={`fixed inset-0 ${theme=="light"?" bg-black/20":"bg-white/20"} bg-black/20 bg-opacity-40 z-50 flex items-center justify-center`}>
      <div className="bg-base-100 rounded-xl p-6 w-full max-w-md shadow-xl relative h-[400px] overflow-y-auto">
        <button className="absolute top-2 right-2 btn btn-sm btn-ghost" onClick={onClose}><X className="w-5 h-5" /></button>
        <h3 className="text-lg audiowide-regular-b  mb-4">Détails de profile</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div><strong>Nom:</strong> {etudiant.nom}</div>
          <div><strong>Email:</strong> {etudiant.email}</div>
          <div><strong>Date de naissance:</strong> {etudiant.date_naissance?.slice(0, 10)}</div>
           {etudiant.date_inscription_ecole &&<div><strong>Inscrit depuis:</strong> {etudiant.date_inscription_ecole?.slice(0, 10)}</div>}
          <div><strong>Adresse:</strong> {etudiant.adress}</div>
          <div><strong>Localisation:</strong></div>
          {etudiant.adress && (
        <div className="mt-6">
          
          <iframe
            title="Carte Google Maps"
            width="100%"
            height="200"
            style={{ border: 2, borderRadius: '10px' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodeURIComponent(etudiant.adress)}&output=embed`}
          ></iframe>
        </div>
      )}

         


         
        </div>
      </div>
    </div>
  );
};

export default EtudiantDetailsModal;
