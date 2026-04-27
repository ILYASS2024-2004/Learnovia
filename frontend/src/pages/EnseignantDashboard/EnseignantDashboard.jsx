import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../../components/EnseignantDashComponents/Sidebar';
import Profil from './Profil';
import MesCours from './MesCours';
import Chapitres from './Chapitres';
import Etudiants from './Etudiants';
import Questions from './Questions';
import ChapitresCours from './ChapitresCours';
import { useEffect, useState } from 'react';
import useEnseignantStore from '../../store/useEnseignantStore';

import { useThemeStore } from '../../store/useThemeStore';
import { Bell } from 'lucide-react';
import Notif from '../../components/EnseignantDashComponents/Notif';

const pageTitles = {
  '': 'Mes cours',
  profil: 'Profil',
  'mes-cours': 'Mes cours',
  chapitre: 'Chapitres',
  'chapitres': 'Chapitres',
  'etudiants': 'Étudiants',
  'questions': 'Questions',
 
};


const EnseignantDashboard = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
 // Trouver le segment parent pertinent
  const mainSegment = segments.includes('chapitres') ? 'chapitres' : segments[segments.length - 1];
  const pageTitle = pageTitles[mainSegment] || 'Dashboard';

  const { cours } = useEnseignantStore();
  const [coursTitre, setCoursTitre] = useState('');
const {theme}=useThemeStore();
const [showNotifModal, setShowNotifModal] = useState(false);
  useEffect(() => {
    if (mainSegment === 'chapitres' && segments.length > 2) {
      const id = segments[2];
      const coursTrouve = cours.find(c => c.id === parseInt(id));
      if (coursTrouve) setCoursTitre(coursTrouve.titre);
      else setCoursTitre('');
    } else {
      setCoursTitre('');
    }
  }, [location.pathname, cours]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 overflow-y-auto overflow-x-auto h-screen relative ">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-0 w-30 h-30 ${theme=="dark"? 'bg-purple-600/30':'bg-purple-600/20'}   rounded-full blur-3xl `}></div>
        <div className={`absolute bottom-0 right-0 w-50 h-50 ${theme=="dark"? 'bg-blue-600/30':'bg-blue-600/20'}   rounded-full blur-3xl `}></div>
        <div className={`absolute top-1/6 left-1/2 w-70 h-30  ${theme=="dark"? 'bg-pink-600/30':'bg-pink-600/20'}  rounded-full blur-3xl `}></div>
       
      </div>
             <div className="text-gray-500 text-sm  pl-4 pr-4 p-2 border-b border-gray-100 ">
  <div className='flex items-center justify-between'>
           <div>Dashboard &gt; <span className="font-bold text-gray-500">{pageTitle}</span>
            {coursTitre && (
              <span className="text-green-300"> &gt; {coursTitre}</span>
            )}
            
            </div> 
              <button onClick={() => setShowNotifModal(true)} className="btn btn-ghost btn-circle ">
      
    <Bell className="w-5 h-5 text-indigo-600 " />
  </button>
          </div>


</div>
{showNotifModal && (
  <Notif onClose={() => setShowNotifModal(false)} />
)}

       <Routes>
  <Route path="" element={<Etudiants />} />
  <Route path="profil" element={<Profil />} />
  <Route path="mes-cours" element={<MesCours />} />
  {/* <Route path="chapitre" element={<Chapitres />} /> */}
  <Route path="chapitres/:id" element={<ChapitresCours />} />
  

  <Route path="questions" element={<Questions />} />
 
</Routes>

      </div>
    </div>
  );
};

export default EnseignantDashboard;
