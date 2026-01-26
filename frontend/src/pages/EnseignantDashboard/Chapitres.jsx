// Chapitres.jsx
import { useEffect, useState } from 'react';
import { Plus, Trash2, Loader } from 'lucide-react';
import useEnseignantStore from '../../store/useEnseignantStore';
import ChapitreForm from '../../components/EnseignantDashComponents/ChapitreForm';

const Chapitres = () => {
  const { cours, fetchMesCours, chapitres, fetchChapitres, deleteChapitre, isLoading } = useEnseignantStore();
  const [selectedCours, setSelectedCours] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMesCours();
  }, [fetchMesCours]);

  const handleAddClick = (cours) => {
    setSelectedCours(cours);
    setShowForm(true);
  };

  const handleAddChapitre = async (data) => {
    await useEnseignantStore.getState().addChapitre(data);
    setShowForm(false);
  };

  const handleCollapseToggle = async (cours) => {
    if (selectedCours?.id === cours.id) {
      setSelectedCours(null);
    } else {
      setSelectedCours(cours);
      fetchChapitres(cours.id);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl sm:text-4xl font-bold mb-6">Chapitres par Cours</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : cours.length === 0 ? (
        <p className="text-gray-500">Aucun cours disponible.</p>
      ) : (
        <div className="space-y-4">
          {cours.map((cours) => (
            <div key={cours.id} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
              <input type="checkbox" className="peer" onChange={() => handleCollapseToggle(cours)} checked={selectedCours?.id === cours.id} readOnly />
              <div className="collapse-title flex items-center gap-4 text-lg font-medium">
                <img src={cours.img_url} alt={cours.titre} className="w-12 h-12 object-cover rounded" />
                {cours.titre}
              </div>
              <div className="collapse-content space-y-2">
                {selectedCours?.id === cours.id && chapitres.length > 0 ? (
                  chapitres.map((chapitre) => (
                    <div key={chapitre.id} className="p-3 border rounded-md flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{chapitre.titre}</h4>
                        <p className="text-sm text-gray-500">Ordre : {chapitre.ordre}</p>
                      </div>
                      <button className="btn btn-sm text-red-600" onClick={() => deleteChapitre(chapitre.id, cours.id)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">Aucun chapitre trouvé.</p>
                )}

                <button className="btn btn-sm mt-4" onClick={() => handleAddClick(cours)}>
                  <Plus className="w-4 h-4 mr-1" /> Ajouter un chapitre
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && selectedCours && (
        <ChapitreForm
          coursId={selectedCours.id}
          coursTitre={selectedCours.titre}
          onClose={() => setShowForm(false)}
          onSubmit={handleAddChapitre}
        />
      )}
    </div>
  );
};

export default Chapitres;
