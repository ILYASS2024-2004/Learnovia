import React, { useEffect, useState } from 'react';
import { Eye, Search, Loader, X } from 'lucide-react';
import useEnseignantStore from '../../store/useEnseignantStore';
import { useThemeStore } from '../../store/useThemeStore';

const Etudiants = () => {
  const { etudiantsInscrits, fetchTousMesEtudiants, isLoading } = useEnseignantStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {theme} =useThemeStore();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchTousMesEtudiants();
  }, [fetchTousMesEtudiants]);

  const filtered = etudiantsInscrits.filter(e =>
    e.nom.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl audiowide-regular-b">Etudiants inscrits</h1>
      <p className="text-sm text-gray-400 mb-8 ">
        Liste des étudiants inscrits à vos cours <span className="text-green-500">(paiement confirmé {etudiantsInscrits.length})</span>.
      </p>

       {/* 🔍 Filtrage */}
      <div className="relative w-[250px] mb-4 mt-12">
        <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 z-10 text-gray-300" />
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          className="input input-bordered w-full text-[12px] pl-8"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
            

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Email</th>
              <th className="text-center">Cours</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(e => (
              <tr key={e.id} className="hover:bg-base-200">
                <td className='text-xl text-gray-400'>#{e.id}</td>
                <td>{e.nom}</td>
                <td>{e.email}</td>
                <td className="text-center">
                  <button className="btn btn-ghost btn-sm" onClick={() => {
                    setSelectedEtudiant(e);
                    setShowModal(true);
                  }}>
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-400">Aucun étudiant trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            className={`btn btn-xs ${page === p ? 'btn-primary' : ''}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Modal */}
    {showModal && selectedEtudiant && (
  <div className={`fixed inset-0 ${theme === "light" ? "bg-black/20" : "bg-white/20"} z-50 flex items-center justify-center`}>
    <div className="bg-base-100 rounded-box shadow-xl p-6 w-[400px]">
  
      <div className="flex justify-between items-center mb-4">
          
          <h2 className="text-2xl audiowide-regular-b  ">
          Cours de l'étudiant
          </h2>
          <button className="btn btn-sm btn-ghost"  onClick={() => setShowModal(false)}>
            <X />
          </button>
        </div>

      <ul className="list bg-base-200 rounded-box shadow-md">
        {selectedEtudiant.cours && selectedEtudiant.cours.map(c => (
          <li key={c.id} className="list-row">
            <div>
              <img className="size-10 rounded-box" src={c.img || "https://via.placeholder.com/40"} alt="Cours" />
            </div>
            <div>
              <div>{c.titre}</div>
              <div className="text-xs uppercase font-semibold opacity-60">{c.date}</div>
            </div>
           
          </li>
        ))}
      </ul>

  
    </div>
  </div>
)}

    </div>
  );
};

export default Etudiants;
