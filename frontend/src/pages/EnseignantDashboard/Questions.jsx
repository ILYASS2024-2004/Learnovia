import { useEffect, useState } from 'react';
import useEnseignantStore from '../../store/useEnseignantStore';
import { Plus, Trash2, Pencil, Search, MessageSquareText, BookOpen, ChartBarDecreasing, TextSearch, Check, BadgeCheck, Bolt, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Questions = () => {
  const {
    cours,
    fetchMesCoursAvecChapitres,
    questions,
    fetchQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    isLoading,
  } = useEnseignantStore();

  const [selectedCoursId, setSelectedCoursId] = useState('');
  const [selectedChapitreId, setSelectedChapitreId] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const [formData, setFormData] = useState({
    texte_question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    bonne_reponse: 'A',
  });

  useEffect(() => {
    fetchMesCoursAvecChapitres();
  }, []);

  const handleCoursChange = (e) => {
    const coursId = e.target.value;
    setSelectedCoursId(coursId);
    setSelectedChapitreId('');
    setEditingQuestionId(null);
    resetForm();
    useEnseignantStore.setState({ questions: [] });
  };

  const handleChapitreChange = async (e) => {
    const chapitreId = e.target.value;
    setSelectedChapitreId(chapitreId);
    setEditingQuestionId(null);
    resetForm();

    if (!chapitreId) {
      useEnseignantStore.setState({ questions: [] });
      return;
    }

    await fetchQuestions(chapitreId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async () => {
    if (!selectedChapitreId) return toast.error("Sélectionnez un chapitre");
    const data = { ...formData, chapitre_id: selectedChapitreId };
    if (editingQuestionId) {
      await updateQuestion(editingQuestionId, data);
    } else {
      await addQuestion(data);
    }
    resetForm();
  };

  const resetForm = () => {
    setEditingQuestionId(null);
    setFormData({
      texte_question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      bonne_reponse: 'A',
    });
  };

  const handleEdit = (q) => {
    setEditingQuestionId(q.id);
    setFormData({
      texte_question: q.texte_question,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      bonne_reponse: q.bonne_reponse,
    });
  };

  const filteredQuestions = questions.filter((q) =>
    q.texte_question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  return (
    <div className="p-2 sm:p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-4xl audiowide-regular-b mb-6">Gestion des Questions</h1>

      {/* Filtres */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <div className='flex gap-2 items-center mb-1'>
            <BookOpen size={18} className='label font-bold'></BookOpen>
            <label className="label font-bold">Cours :</label>
          </div>
          
          <select className="select select-bordered w-full" value={selectedCoursId} onChange={handleCoursChange}>
            <option className='text-gray-400' value="">-- Choisir un cours --</option>
            {cours.map((c) => (
              <option className=' mt-4 ' key={c.id} value={c.id}>{c.titre}</option>
            ))}
          </select>
        </div>

        <div>
           <div className='flex gap-2 items-center mb-1'>
            <ChartBarDecreasing size={18} className='label font-bold'></ChartBarDecreasing>
            <label className="label font-bold">Chapitre :</label>
          </div>
          
          <select
            className="select select-bordered w-full"
            value={selectedChapitreId}
            onChange={handleChapitreChange}
            disabled={!selectedCoursId}
          >
            <option value="">-- Choisir un chapitre --</option>
            {cours.find(c => c.id === Number(selectedCoursId))?.chapitres?.map((ch) => (
              <option key={ch.id} value={ch.id}>{ch.titre}</option>
            ))}
          </select>
        </div>

        <div>
          <div className='flex gap-2 items-center mb-1'>
        
            <TextSearch size={18} className='label font-bold'  />
            <label className="label font-bold">Recherche :</label>
          </div>
          <div className="flex items-center border rounded ">
           
            <input
              type="text"
              placeholder=" Rechercher une question..."
              className="input input-sm border-none  focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div> 
      
      {/* Table */}
      <div>
      
        {isLoading ? (
          <p>Chargement...</p>
        ) : currentQuestions.length === 0 ? (
          <p className="text-gray-500">Aucune question trouvée.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Option A</th>
                  <th>Option B</th>
                  <th>Option C</th>
                  <th>Option D</th>
                  <th>Bonne réponse</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentQuestions.map((q) => (
                  <tr key={q.id}>
                    <td className="max-w-xs">{q.texte_question}</td>
                    <td>{q.option_a}</td>
                    <td>{q.option_b}</td>
                    <td>{q.option_c}</td>
                    <td>{q.option_d}</td>
                    <td className='text-center'><span className="text-center text-green-300 font-bold">{q.bonne_reponse}</span></td>
                    <td className="flex justify-end gap-2">
                      <button className="btn btn-sm " onClick={() => handleEdit(q)}>
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="btn btn-sm " onClick={() => deleteQuestion(q.id, selectedChapitreId)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      

      {/* Formulaire */}
      {selectedChapitreId && (
        <div className="bg-base-100 p-6 rounded-lg shadow space-y-4">
          <label className="label flex gap-2 items-center font-bold">
            <MessageSquareText className="w-4 h-4" /> Texte de la question
          </label>
          <input
            className="input input-bordered w-full pr-2"
            name="texte_question"
            value={formData.texte_question}
            onChange={handleChange}
            placeholder=" Texte de la question"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['A', 'B', 'C', 'D'].map((option) => (
              <div key={option}>
                <label className="label flex gap-1 items-center font-bold">
                  <Check size={18} className='label' />
                  Option {option}
                </label>
                <input
                  className="input input-bordered"
                  name={`option_${option.toLowerCase()}`}
                  value={formData[`option_${option.toLowerCase()}`]}
                  onChange={handleChange}
                  placeholder={`Option ${option}`}
                />
              </div>
            ))}
          </div>

         <label className="label font-bold"> <BadgeCheck size={18} className='label'  />Bonne réponse :</label>
         <br />
          <select
            className="select select-bordered w-[250px]"
            name="bonne_reponse"
            value={formData.bonne_reponse}
            onChange={handleChange}
          >
            <option  value="A">Réponse A</option>
            <option   value="B">Réponse B</option>
            <option   value="C">Réponse C</option>
            <option   value="D">Réponse D</option>
          </select>

          <div className="flex justify-between">
            <button className="btn btn-xs sm:btn-md btn-primary" onClick={handleAddOrUpdate}>
             
              {editingQuestionId ? <>Mettre à jour la question sélectionnée <Bolt className="w-4 h-4 ml-1" /> </>: <><Plus className="w-4 h-4 mr-1" />Ajouter la question au chapitre sélectionné</> }
            </button>
            {editingQuestionId && (
              <button className="btn btn-xs sm:btn-md btn-secondary" onClick={resetForm}>Annuler la modification de la question <X className="w-4 h-4 ml-1"></X></button>
            )}
          </div>
        </div>
      )}
      

     
    </div>
  );
};

export default Questions;
