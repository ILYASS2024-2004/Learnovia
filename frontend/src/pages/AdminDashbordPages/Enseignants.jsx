import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Search, Loader, Eye } from 'lucide-react';
import useAdminStore from '../../store/useAdminStore';
import EnseignantForm from '../../components/AdminDashCompnents/EnseignantForm';
import EtudiantDetailsModal from '../../components/AdminDashCompnents/EtudiantDetailsModal';

const Enseignants = () => {
  const { users, fetchUsers, deleteUser, stats, fetchStats, isLoading } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedEnseignant, setSelectedEnseignant] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers('enseignant');
    fetchStats();
  }, [fetchUsers, fetchStats]);

  if (isLoading || !stats) return (
    <div className='flex z-50 fixed top-0 left-0 w-full bg-base-100 justify-center items-center h-screen text-2xl'>
      <Loader className="size-30 animate-spin" />
    </div>
  );

  const filteredEnseignants = users.enseignants.filter((ens) =>
    ens.nom.toLowerCase().includes(search.toLowerCase()) ||
    ens.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filteredEnseignants.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredEnseignants.length / itemsPerPage);

  return (
    <div className='p-6'>
      <div>
        <p className='text-4xl audiowide-regular-b'>Gestion des Enseignants</p>
        <p className='text-sm text-gray-400'>
          Cette section permet de gérer les enseignants. Total : <span className='text-green-300'>{stats.total_enseignants}</span>
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mt-2">Liste des Enseignants</h2>
        <button className="btn" onClick={() => {
          setSelectedEnseignant(null);
          setShowForm(true);
        }}>
          <Plus className="w-4 h-4 mr-1" /> Ajouter
        </button>
      </div>

      <div className="relative w-[250px] mb-4">
        <Search className="absolute top-1/2 left-2 z-1 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          className="input input-bordered w-full text-sm pl-8"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-100 text-gray-300 font-normal">
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Date de naissance</th>
              <th>Adresse</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((ens) => (
              <tr key={ens.id} className="hover:bg-base-200 border-b border-base-300 transition-all">
                <td>{ens.nom}</td>
                <td>{ens.email}</td>
                <td>{ens.date_naissance?.slice(0, 10)}</td>
                <td>{ens.adress}</td>
                <td className="flex gap-2 justify-center">
                  <button className="btn btn-sm btn-ghost" onClick={() => {
                    setSelectedEnseignant(ens);
                    setShowDetails(true);
                  }}>
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="btn btn-sm btn-ghost text-info" onClick={() => {
                    setSelectedEnseignant(ens);
                    setShowForm(true);
                  }}>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="btn btn-sm btn-ghost text-error" onClick={() => deleteUser('enseignant', ens.id)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-4">
                  Aucun enseignant trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`btn btn-xs ${page === p ? 'btn-active btn-primary' : ''}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {showForm && (
        <EnseignantForm
          enseignant={selectedEnseignant}
          onClose={() => {
            setShowForm(false);
            fetchUsers('enseignant');
          }}
        />
      )}
       {showDetails && (
        <EtudiantDetailsModal
          etudiant={selectedEnseignant}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default Enseignants;
