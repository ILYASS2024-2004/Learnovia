// MesCours.jsx
import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Loader, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useEnseignantStore from '../../store/useEnseignantStore';
import CoursForm from '../../components/EnseignantDashComponents/CoursForm';
import CoursEtudiantsChart from '../../components/EnseignantDashComponents/CoursEtudiantsChart';
import CoursEtudiantsLineChart from '../../components/EnseignantDashComponents/CoursEtudiantsLineChart';

const MesCours = () => {
  const navigate = useNavigate();
  const { cours, fetchMesCours, addCours, updateCours, deleteCours, isLoading } = useEnseignantStore();
  const [page, setPage] = useState(1);
  const [selectedCours, setSelectedCours] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    fetchMesCours();
  }, [fetchMesCours]);

  const handleCoursSubmit = async (formData) => {
    try {
      if (selectedCours) {
        await updateCours(selectedCours.id, formData);
      } else {
        await addCours(formData);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Erreur soumission formulaire cours :', error);
    }
  };

  const totalPages = Math.ceil(cours.length / itemsPerPage);
  const paginatedCours = cours.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-2 sm:p-6">
      <div className="mb-6">
        {/* <h1 className="text-xl sm:text-4xl audiowide-regular-b mb-2 ">Mes Cours</h1> */}
        <h1 className="text-xl sm:text-4xl audiowide-regular-b mb-2 ">Mes Cours</h1>
        <div className='flex justify-between items-center'>
          <p className="text-sm text-gray-400">
            Voici les cours que vous avez créés <span className='text-green-300'>({cours.length} pour le moment)</span>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center">
            <button
              className="btn btn-sm"
              onClick={() => {
                setSelectedCours(null);
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4  mr-0 sm:mr-2" /> Ajouter un cours
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin w-10 h-10 text-primary" />
        </div>
      ) : cours.length === 0 ? (
        <p className="text-gray-500">Aucun cours disponible.</p>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-9 mb-9'>
            {cours.length > 0 && (
              <CoursEtudiantsChart data={cours.map(c => ({
                titre: c.titre,
                nombreEtudiants: c.etudiants ? c.etudiants.length : 0,
              }))} />
            )}
            {cours.length > 0 && <CoursEtudiantsLineChart cours={cours} />}
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {paginatedCours.map((cours) => (
              <div key={cours.id} className="rounded-2xl overflow-hidden p-5 space-y-4">
                <figure>
                  <img src={cours.img_url} alt={cours.titre} className="w-full h-40 object-cover rounded-2xl" />
                </figure>
                <div className='space-y-1.5'>
                  <h2 className="card-title">{cours.titre}</h2>
                  <p className="text-sm text-gray-500 line-clamp-2">{cours.description}</p>
                  <div className="text-sm font-semibold text-green-300">{cours.prix} €</div>

                  <div className="mt-1 flex gap-2 flex-wrap">
                    <button
                      className="btn btn-sm"
                      onClick={() => navigate(`/dashboard/chapitres/${cours.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        setSelectedCours(cours);
                        setShowForm(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() => deleteCours(cours.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
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
        </>
      )}

      {showForm && (
        <CoursForm
          cours={selectedCours}
          onClose={() => setShowForm(false)}
          onSubmit={handleCoursSubmit}
        />
      )}
    </div>
  );
};

export default MesCours;
