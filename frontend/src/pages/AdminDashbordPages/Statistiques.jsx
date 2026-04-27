import React, { useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import { Book, Crown, GraduationCap, Loader, Trophy, University } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Statistiques = () => {
  const { stats, fetchStats, isLoading } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);
  console.log(stats)
  
  

  if (isLoading || !stats)  return (<>
        
    <div className='flex z-999999999 absolute top-0 left-0 w-full bg-base-100 justify-center items-center h-screen text-2xl'>
      <Loader  className="size-30 animate-spin" />

      
      </div>
    </>
    );
  const data = stats.etudiants_par_cours.map(cours => ({
    nom: cours.titre,
    etudiants: cours.total_etudiants_inscrits
  }));
  const pieData = [
  { name: 'Admins', value: stats.total_admins },
  { name: 'Enseignants', value: stats.total_enseignants },
  { name: 'Étudiants', value: stats.total_etudiants }
];
  return (
    <div>
      <h1 className='audiowide-regular-b  text-xl sm:text-4xl ml-2'>Statistiques</h1>
      <p className='text-gray-400 mb-4 pl-1'>Vue d’ensemble des données par rôle : professeurs, étudiants, administrateurs</p>
  
      {stats && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-5 gap-7 '>
          <div className='h-30 flex flex-col justify-between     p-4 rounded-xl bg-amber-300 border-2 border-gray-400'>
            <div className='flex justify-between items-center'>
             <span className='font-bold font-md audiowide-regular'>Nbr des Etudiants</span> 
              <University size={30} />

            </div>
            <span className='font-bold text-2xl'>{stats.total_etudiants}</span>
            

          </div>
          {/* Prof */}
          <div className='h-30 flex flex-col justify-between  p-4 rounded-xl bg-violet-300 border-2 border-gray-400'>
            <div className='flex justify-between items-center'>
             <span className='font-bold font-md audiowide-regular'>Nbr des Profs</span> 
              <GraduationCap  size={30} />

            </div>
            <span className='font-bold text-2xl'>{stats.total_enseignants }</span>
            

          </div>
          {/* Admins */}
           <div className='h-30 flex flex-col justify-between  p-4 rounded-xl bg-error border-2 border-gray-400'>
            <div className='flex justify-between items-center'>
             <span className='font-bold font-md audiowide-regular'>Nbr des Admins</span> 
              <Crown  size={30} />

            </div>
            <span className='font-bold text-2xl'>{stats.total_admins }</span>
            

          </div>
          {/* Cours */}
          <div className='h-30 flex flex-col justify-between  p-4 rounded-xl bg-primary border-2 border-gray-400'>
            <div className='flex justify-between items-center'>
             <span className='font-bold font-md audiowide-regular'>Nbr des Cours</span> 
              <Book  size={30} />

            </div>
            <span className='font-bold text-2xl'>{stats.total_cours }</span>
            

          </div>


        </div>
      )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* BarChart Étudiants par cours */}
  <div className="b rounded shadow p-1 sm:p-4">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">Étudiants par cours</h2>
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nom" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="etudiants" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* PieChart Répartition des rôles */}
  <div className=" rounded shadow p-4">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">Répartition des rôles</h2>
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={["#EF4444", "#C4B5FD", "#FCD34D"][index % 3]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>
<div>
  <ul className="list bg-base-100 rounded-box shadow-md">
  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
    Cours les plus populaires (inscriptions) Top 5
  </li>

  {stats?.top_cours.map((cours, index) => (
    <li key={index} className="list-row flex items-center justify-between gap-4 p-3 hover:bg-base-200">
      {/* Exemple d'icône de livre pour illustrer */}
      <div className="flex items-center gap-4">
        <img
          className="size-10 rounded-box"
          src={cours.img_url} // icône dynamique
          alt={cours.titre}
        />
        <div>
          <div className="font-medium">{cours.titre}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {cours.inscrits} inscription{cours.inscrits > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      
      {/* Médaille de classement */}
      <div className="badge  badge-lg">
        {index>0?`#${index + 1}`:""}
        {index==0?<Trophy />:""}
      </div>
    </li>
  ))}
</ul>

</div>




    </div>




    
  );
};

export default Statistiques;
