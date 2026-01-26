

// ✅ components/AdminDashCompnents/EtudiantDetailsModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const ContenuChModal = ({ contenu, onClose }) => {
   const {theme}=useThemeStore()
  if (!contenu) return null;
  

  return (
    <div className={`fixed inset-0 ${theme=="light"?" bg-black/20":"bg-white/20"} bg-black/20 bg-opacity-40 z-50 flex items-center justify-center`}>
      <div className="bg-base-100 rounded-xl p-6 w-full max-w-2xl shadow-xl relative h-[500px] overflow-y-auto">
        <button className="absolute top-2 right-2 btn btn-sm btn-ghost" onClick={onClose}><X className="w-5 h-5" /></button>
        {/* <h3 className="text-lg audiowide-regular-b  mb-4">Détails de profile</h3> */}
        <div className='text-black' dangerouslySetInnerHTML={{ __html: contenu }} />

     
         


         
      
      </div>
    </div>
  );
};

export default ContenuChModal;
