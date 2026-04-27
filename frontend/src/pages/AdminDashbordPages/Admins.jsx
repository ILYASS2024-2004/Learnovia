import React, { useEffect, useState } from 'react';
import { Eye, Edit, Trash2, Plus, Search, Loader } from 'lucide-react';
import useAdminStore from '../../store/useAdminStore';
import EtudiantForm from '../../components/AdminDashCompnents/AdminForm';
import EtudiantDetailsModal from '../../components/AdminDashCompnents/EtudiantDetailsModal';

const Admins = () => {
  const { users, fetchUsers, deleteUser, stats, fetchStats, isLoading } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers('admin');
    fetchStats();
  }, [fetchUsers, fetchStats]);

  if (isLoading || !stats) {
    return (
      <div className="flex z-999 absolute top-0 left-0 w-full bg-base-100 justify-center items-center h-screen text-2xl">
        <Loader className="size-30 animate-spin" />
      </div>
    );
  }

  const filteredAdmins = users.admins.filter((admin) =>
    admin.nom.toLowerCase().includes(search.toLowerCase()) ||
    admin.email.toLowerCase().includes(search.toLowerCase())
  );

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedAdmins = filteredAdmins.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  return (
    <div className="p-3 sm:p-6">
      <div>
        <p className="text-sm sm:text-4xl audiowide-regular-b">Gestion des administrateurs</p>
        <p className="text-sm text-gray-400">
          Cette section permet d'ajouter, de consulter, de modifier et de supprimer les administrateurs. Vous avez actuellement <span className="text-green-300">{stats.total_admins} admins</span>.
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm sm:text-2xl font-semibold mt-2">Liste des Administrateurs</h2>
        <button className="btn" onClick={() => {
          setSelectedAdmin(null);
          setShowForm(true);
        }}>
          <Plus className="w-2 sm:w-4 h-2 sm:h-4 sm:mr-1" /> Ajouter
        </button>
      </div>

      <div className="relative w-[250px] mb-4">
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
            {paginatedAdmins.map((admin) => (
              <tr key={admin.id} className="hover:bg-base-200 border-b border-base-300 transition-all">
                <td>{admin.nom}</td>
                <td>{admin.email}</td>
                <td>{admin.date_naissance?.slice(0, 10)}</td>
                <td>{admin.adress}</td>
                <td className="flex gap-2 justify-center whitespace-nowrap">
                  <button className="btn btn-sm btn-ghost" onClick={() => {
                    setSelectedAdmin(admin);
                    setShowDetails(true);
                  }}>
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="btn btn-sm btn-ghost text-info" onClick={() => {
                    setSelectedAdmin(admin);
                    setShowForm(true);
                  }}>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="btn btn-sm btn-ghost text-error" onClick={() => deleteUser('admin', admin.id)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {paginatedAdmins.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-4">
                  Aucun administrateur trouvé.
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
        <EtudiantForm
          etudiant={selectedAdmin}
          onClose={() => {
            setShowForm(false);
            fetchUsers('admin');
          }}
        />
      )}

      {showDetails && (
        <EtudiantDetailsModal
          etudiant={selectedAdmin}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default Admins;
