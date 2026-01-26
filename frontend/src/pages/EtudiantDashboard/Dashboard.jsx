import { useEffect } from 'react';
import useEtudiantStore from '../../store/useEtudiantStore';
import { BookOpen, User } from 'lucide-react';
import BienvenueEtudiant from '../../components/EtudiantDashComponents/BienvenueEtudiant';
import "cally";
import './dash.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const Dashboard = () => {
  const {
    fetchMesCours,
    fetchEnseignants,
    coursPayes,
    enseignants,
    isLoading
  } = useEtudiantStore();

  useEffect(() => {
    fetchMesCours();
    fetchEnseignants();
  }, []);
  const data = coursPayes.map(cours => ({
    nom: cours.titre,
    chapitres: cours.nb_chapitres || cours.chapitres?.length || 0,
  }));

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6 min-h-[200px] ">
        <div className='col-span-1 sm:col-span-3 bg-base-300 p-2 border-1 border-gray-400 rounded-2xl'>
             <h2 className="text-xl font-light text-foreground tracking-wide ">Bienvenue sur votre tableau de bord</h2>
             <p className='text-sm text-gray-400 mb-2'>
                Ici, vous pouvez consulter vos cours, vos enseignants et gérer votre profil. 
              
                <span className='text-green-500'>({coursPayes.length} cours payés et {enseignants.length} enseignants inscrits)</span>
             </p>
             <p className='text-sm text-gray-500 pl-2'>  server.js</p>

             <BienvenueEtudiant></BienvenueEtudiant>
        </div>


        <div className="col-span-1 sm:col-span-1 flex items-center justify-center p-2 bg-base-300 border-1 border-gray-400 rounded-2xl h-[200px]">
          
<calendar-date class="cally rounded-bo scale-x-85 scale-y-75">
  <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
  <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
  <calendar-month></calendar-month>
</calendar-date>

        </div>
   

      </div>


<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

{/* === Mes cours === */}
<div className="p-2 border-1 border-gray-400 rounded-2xl bg-base-300">
  {isLoading ? (
    <p>Chargement...</p>
  ) : coursPayes.length === 0 ? (
    <p className="text-gray-500">Aucun cours inscrit.</p>
  ) : (
    <div className="cours h-[250px]  ">
      {/* Premier slider */}
      <div className="cours-slide">
        {coursPayes.map((cours) => (
          <div
            key={cours.id}
            className="cours-card"
            role="group"
            aria-label={`Cours ${cours.titre}`}
          >
            <img
              src={cours.img_url}
              className="cours-image"
              alt={`Image du cours ${cours.titre}`}
              loading="lazy"
            />
            <h4 className="cours-title">{cours.titre}</h4>
            <p className="cours-description">{cours.description}</p>
          </div>
        ))}
      </div>

      {/* Deuxième slider (copie pour boucle infinie) */}
      <div className="cours-slide">
        {coursPayes.map((cours) => (
          <div
            key={`clone-${cours.id}`}
            className="cours-card"
            role="group"
            aria-label={`Cours ${cours.titre}`}
          >
            <img
              src={cours.img_url}
              className="cours-image"
              alt={`Image du cours ${cours.titre}`}
              loading="lazy"
            />
            <h4 className="cours-title">{cours.titre}</h4>
            <p className="cours-description">{cours.description}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


      <div>
         <div className=" border-1 border-gray-400 rounded-2xl bg-base-300 p-4 ">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nom" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="chapitres" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      </div>
</div>
      {/* === Mes enseignants === */}
      <div className="mb-8 p-2 border-1 border-gray-400 rounded-2xl bg-base-300">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <User size={20} /> Mes enseignants
        </h3>
        {isLoading ? (
          <p>Chargement...</p>
        ) : enseignants.length === 0 ? (
          <p className="text-gray-500">Aucun enseignant pour le moment.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enseignants.map((ens) => (
              <li key={ens.id} className="p-4 rounded-lg shadow hover:shadow-md">
                <h4 className="font-semibold">{ens.nom}</h4>
                <p className="text-sm text-gray-500">{ens.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

     
    </div>
  );
};

export default Dashboard;
