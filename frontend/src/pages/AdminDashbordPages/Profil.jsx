import React from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin,
  Map, 
  Crown
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const Profil = () => {
  const { user } = useAuthStore();

  if (!user) return <p className="text-center text-gray-500">Chargement du profil...</p>;

  return (
    <div className="max-w-4xl mx-auto rounded-xl p-1 sm:p-6 space-y-6">
      <h2 className="text-xl sm:text-3xl audiowide-regular-b mb-4 flex items-center gap-2">
       
        <span>Profil Administrateur</span> <Crown className="w-6 h-6" />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Nom</p>
            <p className="text-lg font-semibold">{user.nom}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Mail className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Date de naissance</p>
            <p className="text-lg font-semibold">
              {new Date(user.date_naissance).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Adresse</p>
            <p className="text-lg font-semibold">{user.adress}</p>
          </div>
        </div>
      </div>

      {/* 📍 Google Maps Embed */}
      {user.adress && (
        <div className="mt-6">
          <h3 className="text-xl audiowide-regular-b mb-3 flex items-center gap-2">
            <Map className="w-5 h-5" />
            <span>Localisation</span>
          </h3>
          <iframe
            title="Carte Google Maps"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '12px' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodeURIComponent(user.adress)}&output=embed`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Profil;