import { Routes, Route, useLocation } from 'react-router-dom';
import Statistiques from './Statistiques';
import Profil from './Profil';
import Etudiants from './Etudiants';
import Enseignants from './Enseignants';
import Admins from './Admins';
import Sidebar from '../../components/AdminDashCompnents/Sidebar';

import { Bell } from 'lucide-react';
import { useState } from 'react';
import NotificationModal from '../../components/AdminDashCompnents/NotificationModal';


const pageTitles = {
  '': 'Statistiques',
  profil: 'Profil',
  etudiants: 'Étudiants',
  enseignants: 'Enseignants',
  admins: 'Administrateurs'
};
const AdminDashboard = () => {
    const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const current = segments[segments.length - 1];
  const pageTitle = pageTitles[current] || 'Dashboard';
  
const [showNotifModal, setShowNotifModal] = useState(false);


  return (
    <div className="flex">
          <Sidebar/>
    
  
      <div className="flex-1 overflow-y-auto overflow-x-auto h-screen">
        <div className="text-gray-500 text-sm mb-2 pl-4 pr-4 border-b border-gray-100 flex items-center justify-between">
  <div>
    Dashboard &gt; <span className="font-bold text-indigo-900">{pageTitle}</span>
  </div>

  {/* 🔔 Icône Notification */}
  <button onClick={() => setShowNotifModal(true)} className="btn btn-ghost btn-circle ">
      
    <Bell className="w-5 h-5 text-indigo-600 " />
  </button>
</div>

{showNotifModal && (
  <NotificationModal onClose={() => setShowNotifModal(false)} />
)}

        <Routes>
          <Route path="" element={<Statistiques />} />
          <Route path="profil" element={<Profil />} />
          <Route path="etudiants" element={<Etudiants />} />

          <Route path="enseignants" element={<Enseignants />} />
          <Route path="admins" element={<Admins />} />
        </Routes>
      </div>
    </div>
  );

}

export default AdminDashboard