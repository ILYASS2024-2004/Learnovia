// frontend/src/pages/Enseignant/ChapitresCours.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEnseignantStore from '../../store/useEnseignantStore';
import { Loader, Trash2, Plus, ArrowLeft, Eye } from 'lucide-react';
import ChapitreForm from '../../components/EnseignantDashComponents/ChapitreForm';
import ContenuChModal from '../../components/EnseignantDashComponents/ContenuChModal';

const ChapitresCours = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchChapitres, chapitres, cours, fetchMesCours, deleteChapitre, isLoading } = useEnseignantStore();
  const [selectedCours, setSelectedCours] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [SelectedContenu, setSelectedContenu] = useState(null);

  useEffect(() => {
    fetchMesCours();
    fetchChapitres(id);
  }, [id]);

  useEffect(() => {
    const coursTrouve = cours.find(c => c.id === parseInt(id));
    setSelectedCours(coursTrouve);
  }, [cours, id]);

  const handleAddChapitre = async (data) => {
    await useEnseignantStore.getState().addChapitre(data);
    setShowForm(false);
  };
   const [showContenu, setShowContenu] = useState(false);

  if (isLoading || !selectedCours) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <button className="btn btn-sm mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-1" /> Retour
      </button>
      <div className='flex gap-7  mb-6 text-4xl audiowide-regular-b'>
           <h1 className="  ">Chapitres du cours :</h1>
      <span className="text-green-300  ">{selectedCours.titre}</span>
      </div>

   

      {chapitres.length === 0 ? (
        <p className="text-gray-500">Aucun chapitre trouvé pour ce cours.</p>
      ) : (
        <div className="list bg-base-100 rounded-box shadow-md">
          {chapitres.map((chapitre) => (
            <div key={chapitre.id} className=" list-row flex items-center justify-between gap-4 p-3 hover:bg-base-200">
              <div className='flex gap-8  items-end'>
             <span className='text-gray-400 text-4xl'>0{chapitre.ordre}</span> 
              <img className='size-15 rounded-xl ' src={chapitre.img_url} alt="" />

              <div>
                  <h3 className="font-bold">{chapitre.titre}</h3>
                  <p>{chapitre.description}</p>
                  <p className='text-sm text-gray-400'>{chapitre.date_de_creation}</p>
              </div>
           

               
              </div>
              <div>
                <button className='btn btn-sm mr-4'
                onClick={() => {
                    setSelectedContenu(chapitre.contenu);
                    setShowContenu(true);
                  }}
                >
                <Eye className="w-4 h-4"></Eye>
                
              </button>
                <button
                className="btn btn-sm "
                onClick={() => deleteChapitre(chapitre.id, selectedCours.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              </div>
              
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-sm mt-6"
        onClick={() => setShowForm(true)}
      >
        <Plus className="w-4 h-4 mr-1" /> Ajouter un chapitre
      </button>

      {showForm && (
        <ChapitreForm
          coursId={selectedCours.id}
          coursTitre={selectedCours.titre}
          onClose={() => setShowForm(false)}
          onSubmit={handleAddChapitre}
        />
      )}
      {showContenu && (
              <ContenuChModal 
                contenu={SelectedContenu}
                onClose={() => setShowContenu(false)}
              />
            )}
    </div>
  );
};

export default ChapitresCours;
