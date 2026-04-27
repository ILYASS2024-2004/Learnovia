
import { Routes, Route, useLocation } from 'react-router-dom';
import SidebarEtudiant from '../../components/EtudiantDashComponents/SidebarEtudiant';
import ProfilEtudiant from './ProfilEtudiant';
import MesCours from './MesCours';
import ChapitresCoursEtudiant from './ChapitresCoursEtudiant';
import { useEffect, useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Bell, MessageSquareText } from 'lucide-react';
import Notif from '../../components/EtudiantDashComponents/Notif';
import MessageModal from '../../components/EtudiantDashComponents/MessageModal';
// import CoursDisponible from './CoursDisponible';
import Dashboard from './Dashboard';
import PaiementSuccess from './PaiementSuccess';
import TestChapitre from './TestChapitre';
import useNotificationStore from '../../store/useNotificationStore';

const pageTitles = {
  '': 'Mes cours',
  profil: 'Profil',
  'mes-cours': 'Mes cours',
  'cours-disponibles': 'Cours disponibles',
  'examens': 'Examens',
  'chapitres': 'Chapitres',
};

const EtudiantDashboard = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const mainSegment = segments.includes('chapitres') ? 'chapitres' : segments[segments.length - 1];
  const pageTitle = pageTitles[mainSegment] || 'Dashboard';

  const { theme } = useThemeStore();
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const { totalNonLues,  marquerToutesCommeLues,fetchNotifications } = useNotificationStore();
  console.log(totalNonLues)

  // 🔽 Fetch notifications au chargement
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔽 Handler du clic sur la cloche
  const handleClickBell = async () => {
    await marquerToutesCommeLues(); // marque toutes comme lues
    setShowNotifModal(true);         // ouvre le modal
  };

  return (
    <div className="flex">
      <SidebarEtudiant />

      <div className="flex-1 overflow-y-auto overflow-x-auto h-screen relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-0 w-30 h-30 ${theme === "dark" ? 'bg-purple-600/30' : 'bg-purple-600/20'} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 right-0 w-50 h-50 ${theme === "dark" ? 'bg-blue-600/30' : 'bg-blue-600/20'} rounded-full blur-3xl`}></div>
          <div className={`absolute top-1/6 left-1/2 w-70 h-30 ${theme === "dark" ? 'bg-pink-600/30' : 'bg-pink-600/20'} rounded-full blur-3xl`}></div>
        </div>

        <div className="text-gray-500 text-sm pl-4 pr-4 p-2 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              Dashboard &gt; <span className="font-bold text-gray-500">{pageTitle}</span>
            </div>
            <div className="flex gap-2 items-center">
              {/* 🔔 Cloche avec badge nombre non lu */}
              <button
              type='button'
                onClick={handleClickBell}
                className="btn btn-ghost btn-circle text-purple-500 relative"
              >
                <Bell className="w-5 h-5" />
                {totalNonLues > 0 && (
                  <span className="absolute -top-0 -right-1 audiowide-regular-b  bg-red-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalNonLues}
                  </span>
                )}
              </button>

              <button onClick={() => setShowMessageModal(true)} className="btn btn-ghost btn-circle text-purple-500">
                <MessageSquareText className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showNotifModal && <Notif onClose={() => setShowNotifModal(false)} />}
        {showMessageModal && <MessageModal onClose={() => setShowMessageModal(false)} />}

        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="profil" element={<ProfilEtudiant />} />
          <Route path="mes-cours" element={<MesCours />} />
          {/* <Route path="cours-disponibles" element={<CoursDisponible />} /> */}
          <Route path="chapitres/:id" element={<ChapitresCoursEtudiant />} />
          <Route path="/paiement-success" element={<PaiementSuccess />} />
          <Route path="chapitres/test/:chapitre_id" element={<TestChapitre />} />
        </Routes>
      </div>
    </div>
  );
};

export default EtudiantDashboard;










// import { Routes, Route, useLocation } from 'react-router-dom';
// import SidebarEtudiant from '../../components/EtudiantDashComponents/SidebarEtudiant';
// import ProfilEtudiant from './ProfilEtudiant';
// import MesCours from './MesCours';


// import ChapitresCoursEtudiant from './ChapitresCoursEtudiant';

// import { useState } from 'react';
// import { useThemeStore } from '../../store/useThemeStore';
// import { Bell, MessageSquareText } from 'lucide-react';
// import Notif from '../../components/EtudiantDashComponents/Notif';
// import MessageModal from '../../components/EtudiantDashComponents/MessageModal';
// import CoursDisponible from './CoursDisponible';
// import Dashboard from './Dashboard';
// import PaiementSuccess from './PaiementSuccess';
// import TestChapitre from './TestChapitre';

// const pageTitles = {
//   '': 'Mes cours',
//   profil: 'Profil',
//   'mes-cours': 'Mes cours',
//   'cours-disponibles': 'Cours disponibles',
//   'examens': 'Examens',
//   'chapitres': 'Chapitres',
  
// };

// const EtudiantDashboard = () => {
//   const location = useLocation();
//   const segments = location.pathname.split('/').filter(Boolean);
//   const mainSegment = segments.includes('chapitres') ? 'chapitres' : segments[segments.length - 1];
//   const pageTitle = pageTitles[mainSegment] || 'Dashboard';

//   const { theme } = useThemeStore();
//   const [showNotifModal, setShowNotifModal] = useState(false);
//   const [showMessageModal, setShowMessageModal] = useState(false);

//   return (
//     <div className="flex">
//       <SidebarEtudiant />

//       <div className="flex-1 overflow-y-auto overflow-x-auto h-screen relative">
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className={`absolute top-1/4 left-0 w-30 h-30 ${theme === "dark" ? 'bg-purple-600/30' : 'bg-purple-600/20'} rounded-full blur-3xl`}></div>
//           <div className={`absolute bottom-0 right-0 w-50 h-50 ${theme === "dark" ? 'bg-blue-600/30' : 'bg-blue-600/20'} rounded-full blur-3xl`}></div>
//           <div className={`absolute top-1/6 left-1/2 w-70 h-30 ${theme === "dark" ? 'bg-pink-600/30' : 'bg-pink-600/20'} rounded-full blur-3xl`}></div>
//         </div>

//         <div className="text-gray-500 text-sm pl-4 pr-4 p-2 border-b border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               Dashboard &gt; <span className="font-bold text-gray-500">{pageTitle}</span>
//             </div>
//             <div className="flex gap-2 items-center">
//               <button onClick={() => setShowNotifModal(true)} className="btn btn-ghost btn-circle text-purple-500">
//                 <Bell className="w-5 h-5" />
//               </button>
//               <button onClick={() => setShowMessageModal(true)} className="btn btn-ghost btn-circle text-purple-500">
//                <MessageSquareText  className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {showNotifModal && <Notif onClose={() => setShowNotifModal(false)} />}
//         {showMessageModal && <MessageModal onClose={() => setShowMessageModal(false)} />}

//         <Routes>
//           <Route path="" element={<Dashboard/>} />
//           <Route path="profil" element={<ProfilEtudiant />} />
//           <Route path="mes-cours" element={<MesCours />} />
//           <Route path="cours-disponibles" element={<CoursDisponible />} />
        
         
//           <Route path="chapitres/:id" element={<ChapitresCoursEtudiant />} />
//           <Route path="/paiement-success" element={<PaiementSuccess />} />
//           <Route path="chapitres/test/:chapitre_id" element={<TestChapitre />} />


         
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default EtudiantDashboard;