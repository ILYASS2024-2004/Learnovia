import { useEffect } from 'react';
import useNotificationStore from '../../store/useNotificationStore';
import { useThemeStore } from '../../store/useThemeStore';
import { X, Bell } from 'lucide-react';

const Notif = ({ onClose }) => {
  const { notifications, fetchNotifications, loading } = useNotificationStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${theme === 'light' ? 'bg-black/20' : 'bg-white/20'}`}>
      <div className="bg-base-100 p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl text-center audiowide-regular-b mb-6 flex items-center justify-center gap-2">
          <Bell size={24} /> Notifications
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : notifications.length === 0 ? (
          <p className="text-center text-gray-500">Aucune notification pour le moment.</p>
        ) : (
          <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {notifications.map((notif, idx) => (
              <li key={idx} className="border-b ">
                <div className='flex items-center justify-between p-2'>
                   <div>
                      <p className="text-sm text-gray-400   mb-1">{notif.titre}</p>
                      <p className="">{notif.message}</p>

                   </div>
                <p className="text-sm text-gray-400 mb-1">{new Date(notif.date).toLocaleDateString()}</p>
                </div>
               
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-center">
          <button onClick={onClose} className="btn btn-error text-white">Fermer, Le modal <X></X></button>

        </div>
      </div>
    </div>
  );
};

export default Notif;
