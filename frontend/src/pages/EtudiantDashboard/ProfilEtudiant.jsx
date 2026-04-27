import React from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin,
  Map, 
  GraduationCap
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const ProfilEtudiant = () => {
  const { user } = useAuthStore();

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded-lg w-48"></div>
        <div className="h-4 bg-muted rounded w-32"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-2  sm:px-6 py-6 sm:py-12">
        
        {/* Header élégant */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-card border border-border rounded-xl shadow-sm">
              <GraduationCap className="w-7 h-7 text-foreground" />
            </div>
            <h1 className="text-xl sm:text-4xl font-light text-foreground tracking-wide">
              Profil Étudiant
            </h1>
          </div>
          <div className="h-px bg-border w-24 ml-16"></div>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Section Informations Personnelles */}
          <div className="space-y-8">
            <h2 className="text-xl font-medium text-foreground mb-8 pb-3 border-b border-border">
              Informations Personnelles
            </h2>
            
            <div className="space-y-8">
              <div className="group">
                <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-muted rounded-md mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Nom Complet
                    </p>
                    <p className="text-lg text-foreground font-light">
                      {user.nom}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-muted rounded-md mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <p className="text-lg text-foreground font-light">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-muted rounded-md mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Date de Naissance
                    </p>
                    <p className="text-lg text-foreground font-light">
                      {new Date(user.date_naissance).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Informations Scolaires */}
          <div className="space-y-8">
            <h2 className="text-xl font-medium text-foreground mb-8 pb-3 border-b border-border">
              Informations Scolaires
            </h2>
            
            <div className="space-y-8">
              <div className="group">
                <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-muted rounded-md mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Date d'Inscription
                    </p>
                    <p className="text-lg text-foreground font-light">
                      {new Date(user.date_inscription_ecole).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-muted rounded-md mt-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Adresse
                    </p>
                    <p className="text-lg text-foreground font-light leading-relaxed">
                      {user.adress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Localisation */}
        {user.adress && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-card border border-border rounded-lg">
                <Map className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground">
                Localisation
              </h3>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-1 sm:p-6">
              <div className="rounded-lg overflow-hidden border border-border">
                <iframe
                  title="Carte Google Maps"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${encodeURIComponent(user.adress)}&output=embed`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilEtudiant;
