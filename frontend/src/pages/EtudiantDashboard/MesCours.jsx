import React, { useEffect, useState } from 'react';
import useEtudiantStore from '../../store/useEtudiantStore';
import { BookOpenCheck, Eye, Loader, LockIcon, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';

const MesCours = () => {
  const {
    fetchMesCours,
    fetchCoursDisponibles,
    fetchProgressionGlobale,
    acheterCours,
    coursPayes,
    coursDisponibles,
    progression,
    isLoading,
  } = useEtudiantStore();
const {theme}=useThemeStore();
  const [coursSelectionne, setCoursSelectionne] = useState(null);
  const [coursPublicSelectionne, setCoursPublicSelectionne] = useState(null);
  const [currentPagePayes, setCurrentPagePayes] = useState(1);
  const [currentPageDisponibles, setCurrentPageDisponibles] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 3;

  const totalPagesPayes = Math.ceil(coursPayes.length / itemsPerPage);
  const coursPagePayes = coursPayes.slice((currentPagePayes - 1) * itemsPerPage, currentPagePayes * itemsPerPage);

  const totalPagesDisponibles = Math.ceil(coursDisponibles.length / itemsPerPage);
  const coursPageDisponibles = coursDisponibles.slice((currentPageDisponibles - 1) * itemsPerPage, currentPageDisponibles * itemsPerPage);

  useEffect(() => {
    fetchMesCours();
    fetchCoursDisponibles();
    fetchProgressionGlobale(); // ✅ Ajouté pour charger la progression réelle
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl audiowide-regular-b">Mes Cours</h2>
        {/* <h2 className="text-5xl font-light text-foreground tracking-wide">Mes Cours</h2> */}
        <p className='text-sm text-gray-400 mb-6'>Vous êtes inscrit à <span className='text-green-300'>{coursPayes.length} cours</span></p>

        {isLoading ? (
          <div className="flex z-[999999999] absolute top-0 left-0 w-full bg-base-100 justify-center items-center h-screen text-2xl">
            <Loader className="size-30 animate-spin" />
          </div>
        ) : (
          <>
            {/* Cours achetés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {coursPagePayes.map((cours) => {
                const progressionCours = progression.find(p => p.id_cours === cours.id);
                const progressionPourcentage = progressionCours ? Math.round(progressionCours.progression) : 0;

                return (
                  <div key={cours.id} className="card rounded-xl overflow-hidden p-3 space-y-4">
                    <figure>
                      <img src={cours.img_url || '/default.jpg'} alt="cours" className="h-40 w-full object-cover rounded-2xl" />
                    </figure>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{cours.titre}</h3>
                      <p className='text-sm text-gray-400'>{cours.description}</p>
                      <div className='flex justify-between text-sm text-gray-400 font-semibold'>
                        <p className="text-green-300">Par {cours.enseignant}</p>
                        <span>{new Date(cours.date_de_creation).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>


                    <div>
                      <span className={`text-sm font-bold ${progressionPourcentage>=50?'text-green-300':'text-orange-300'} `} >{progressionPourcentage}%</span>

                       <div className="flex justify-between items-center">
                      <div className="w-[50%] h-2 bg-gray-400 rounded-full">
                        <div
                          className={`h-full ${progressionPourcentage >= 50 ? 'bg-green-300' : 'bg-orange-300'} rounded-full`}
                          style={{ width: `${progressionPourcentage}%` }}
                        ></div>
                      </div>

                      <button
                        onClick={() => setCoursSelectionne(cours)}
                        className="btn btn-ghost btn-sm flex items-center gap-2"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
</div>
                    
                  </div>
                );
              })}
            </div>

            {totalPagesPayes > 1 && (
              <div className="flex justify-center gap-2 mb-12">
                {Array.from({ length: totalPagesPayes }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPagePayes(i + 1)}
                    className={`btn btn-sm  ${currentPagePayes === i + 1 ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Cours disponibles */}
           <div className='relative'>
             <div className={`absolute bottom-0 right-0  w-60 h-30 ${theme=="dark"? 'bg-amber-600/30':'bg-amber-600/20'}   rounded-full blur-3xl `}></div>
        
           <h2 className="text-4xl audiowide-regular-b">Explorez les cours disponibles</h2>
<p className="text-sm text-gray-400 mb-6">
  Il y a actuellement <span className="text-green-300">{coursDisponibles.length}</span> {coursDisponibles.length === 1 ? 'cours disponible' : 'cours disponibles'} que vous pouvez consulter et acheter pour continuer à progresser dans votre parcours éducatif.
</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursPageDisponibles.map((cours) => (
                <div key={cours.id} className="card rounded-xl overflow-hidden p-3 space-y-4">
                  <img src={cours.img_url || '/default.jpg'} alt="cours" className="h-40 w-full object-cover rounded-2xl" />
                  <div>
                      <h3 className="text-lg font-semibold mb-1">{cours.titre}</h3>
                      <p className='text-sm text-gray-400'>{cours.description}</p>
                      <div className='flex justify-between text-sm text-gray-400 font-semibold'>
                        <p className="text-green-300">Par {cours.enseignant}</p>
                        <span>{new Date(cours.date_de_creation).toLocaleDateString('fr-FR')}
</span>
                      </div> 
                      <p className="text-sm font-bold text-green-300 ">Prix : {cours.prix} €</p>
                    </div>
                 
                  <div className="flex  gap-2">
                    <button className="btn btn-ghost btn-sm" onClick={() => setCoursPublicSelectionne(cours)}>
                      <Eye size={18} /> 
                    </button>
                    <button className="btn btn-sm  btn-ghost" onClick={() => acheterCours(cours.id)}>
                     <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            </div>

            {totalPagesDisponibles > 1 && (
              <div className="flex justify-center gap-2 my-6">
                {Array.from({ length: totalPagesDisponibles }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPageDisponibles(i + 1)}
                    className={`btn btn-sm  ${currentPageDisponibles === i + 1 ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Modale chapitres payés */}
        {coursSelectionne && (
          <div  className={`fixed h-screen inset-0 ${theme === "light" ? "bg-black/20" : "bg-white/20"} z-50 flex items-center justify-center`}>
            <div className=" bg-base-100 p-6 rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setCoursSelectionne(null)}
                className="absolute top-2 right-2 text-gray-400 cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-xl text-center audiowide-regular-b font-bold mb-4">{coursSelectionne.titre}</h3>
              {coursSelectionne.chapitres?.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucun chapitre disponible</p>
              ) : (
                <div className="list  rounded-box ">
                  {coursSelectionne.chapitres.map((ch) => (
                    <div key={ch.id} className="list-row">
                       <div>
              <img className="size-15 rounded-box border-2" src={ch.img_url || "https://via.placeholder.com/40"} alt="Chapitre" />
            </div>
            <div>
                 <div>{ch.titre}</div>
                 <div className="text-xs uppercase font-semibold opacity-60">{new Date(ch.date_de_creation).toLocaleDateString('fr-FR')}
</div>
            </div>
                      <button
                        className="btn btn-sm "
                        onClick={() => {
                          navigate(`/dashboard/chapitres/${ch.id}`);
                          setCoursSelectionne(null);
                        }}
                      >
                     <BookOpenCheck size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modale chapitres bloqués */}
        {coursPublicSelectionne && (
          <div className={`fixed h-screen inset-0 ${theme === "light" ? "bg-black/20" : "bg-white/20"} z-50 flex items-center justify-center`}>
            <div className="bg-base-100 p-6 rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setCoursPublicSelectionne(null)}
                className="absolute top-2 right-2 text-gray-400 cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-xl text-center audiowide-regular-b font-bold mb-4">{coursPublicSelectionne.titre}</h3>
              {!coursPublicSelectionne.chapitres || coursPublicSelectionne.chapitres.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucun chapitre disponible</p>
              ) : (
                <div className="list  rounded-box">
                  {coursPublicSelectionne.chapitres.map((ch) => (
                    <div key={ch.id} className="list-row">
                        <div>
              <img className="size-15 rounded-box border-2" src={ch.img_url || "https://via.placeholder.com/40"} alt="Chapitre" />
            </div>
            <div>
                 <div>{ch.titre}</div>
                 <div className="text-xs uppercase font-semibold opacity-60">{new Date(ch.date_de_creation).toLocaleDateString('fr-FR')}
</div>
            </div>
                      <button
                       
                      >
                     <LockIcon size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesCours;
