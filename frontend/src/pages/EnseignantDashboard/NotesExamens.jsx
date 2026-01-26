// import { useEffect, useState } from 'react';
// import useEnseignantStore from '../../store/useEnseignantStore';
// import useExamenStore from '../../store/useExamenStore';
// import { Plus, Pencil, Trash2, BookOpen, User2, Percent } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import { useThemeStore } from '../../store/useThemeStore';

// const NotesExamens = () => {
//   const {
//     cours,
//     fetchMesCours,
//     tousEtudiants,
//     fetchTousLesEtudiants,
//   } = useEnseignantStore();

//   const {
//     examens,
//     fetchExamens,
//     ajouterExamen,
//     modifierExamen,
//     supprimerExamen,
//   } = useExamenStore();

//   const { theme } = useThemeStore();
//   const couleursCartes = [
//     "bg-amber-300",
//   "bg-red-300","bg-pink-300",
//   "bg-green-300",
//   "bg-blue-300",
  
//   "bg-purple-300",
  
  
// ];


//   const [searchTerm, setSearchTerm] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     etudiant_id: '',
//     cours_id: '',
//     note: '',
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     fetchMesCours();
//     fetchTousLesEtudiants();
//     fetchExamens();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const { etudiant_id, cours_id, note } = formData;
//     if (!etudiant_id || !cours_id || note === '') {
//       return toast.error("Tous les champs sont requis.");
//     }
//     if (note < 0 || note > 20) {
//       return toast.error("La note doit être entre 0 et 20.");
//     }

//     const data = { etudiant_id, cours_id, note };

//     if (editingId) {
//       await modifierExamen(editingId, data);
//     } else {
//       await ajouterExamen(data);
//     }

//     setFormData({ etudiant_id: '', cours_id: '', note: '' });
//     setEditingId(null);
//     setModalOpen(false);
//   };

//   const handleEdit = (exam) => {
//     const etudiant = tousEtudiants.find(e => e.nom === exam.etudiant);
//     const coursItem = cours.find(c => c.titre === exam.cours);
//     setFormData({
//       etudiant_id: etudiant?.id || '',
//       cours_id: coursItem?.id || '',
//       note: exam.note,
//     });
//     setEditingId(exam.id);
//     setModalOpen(true);
//   };

//   const filteredExamens = examens.filter((e) =>
//     e.etudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     e.cours.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredExamens.length / itemsPerPage);
//   const paginatedExamens = filteredExamens.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="min-h-screen  p-6 space-y-6">
//       <h1 className="text-xl sm:text-4xl audiowide-regular-b mb-2">
//         Gestion des Notes d'Examens
//       </h1>

//       <div className="flex justify-between items-center flex-wrap gap-2">
//         <input
//           type="text"
//           className="input input-bordered w-full max-w-xs"
//           placeholder="Rechercher par étudiant ou cours"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           className="btn btn-primary btn-sm rounded-full flex items-center gap-1 shadow-md"
//           onClick={() => setModalOpen(true)}
//         >
//           <Plus className="w-4 h-4" /> Ajouter Note
//         </button>
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <div
//           className={`fixed h-screen inset-0 ${
//             theme === 'light' ? 'bg-black/20' : 'bg-white/20'
//           } z-50 flex items-center justify-center`}
//         >
//           <div className="bg-base-100 p-6 rounded shadow w-full max-w-md">
//             <h2 className="text-xl text-center audiowide-regular-b font-bold mb-4">
//               {editingId ? 'Modifier' : 'Ajouter'} une Note
//             </h2>

//             <label className="label label-text mb-1 flex items-center gap-1">
//               <User2 className="w-4 h-4" /> Étudiant
//             </label>
//             <select
//               name="etudiant_id"
//               className="select select-bordered w-full mb-3"
//               value={formData.etudiant_id}
//               onChange={handleChange}
//             >
//               <option value="">-- Choisir un étudiant --</option>
//               {tousEtudiants.map((etudiant) => (
//                 <option key={etudiant.id} value={etudiant.id}>
//                   {etudiant.nom} ({etudiant.email})
//                 </option>
//               ))}
//             </select>

//             <label className="label label-text mb-1 flex items-center gap-1">
//               <BookOpen className="w-4 h-4" /> Cours
//             </label>
//             <select
//               name="cours_id"
//               className="select select-bordered w-full mb-3"
//               value={formData.cours_id}
//               onChange={handleChange}
//             >
//               <option value="">-- Choisir un cours --</option>
//               {cours.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.titre}
//                 </option>
//               ))}
//             </select>

//             <label className="label label-text mb-1 flex items-center gap-1">
//               <Percent className="w-4 h-4" /> Note (/20)
//             </label>
//             <input
//               type="number"
//               name="note"
//               className="input input-bordered w-full mb-4"
//               placeholder="Note /20"
//               value={formData.note}
//               onChange={handleChange}
//               min="0"
//               max="20"
//             />

//             <div className="flex justify-between gap-2">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => {
//                   setModalOpen(false);
//                   setEditingId(null);
//                   setFormData({ etudiant_id: '', cours_id: '', note: '' });
//                 }}
//               >
//                 Annuler
//               </button>
//               <button className="btn btn-primary" onClick={handleSubmit}>
//                 {editingId ? 'Mettre à jour' : 'Ajouter'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cartes des examens */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//        {paginatedExamens.map((e, i) => (
//   <div
//     key={e.id}
//     className={`rounded-xl relative border-2 shadow-md p-4 hover:shadow-lg transition duration-200 space-y-1 overflow-hidden
//       ${couleursCartes[i % couleursCartes.length]}`}
//   >
//     <h3 className="text-xl font-bold">{e.etudiant}</h3>
//     <p className="text-gray-700"> Cours : {e.cours}</p>
//     <p className="text-gray-700"> Date : {new Date(e.date_examen).toLocaleDateString()}</p>


//     {/* Badge de validation */}
//     <span
//       className={`inline-block absolute top-[-20px] right-[-15px]  text-sm font-semibold rounded-full p-5 ${
//         e.validation === 'NV'
//           ? ' text-red-800'
//           : e.validation === 'OR'
//           ? ' text-yellow-800'
//           : ' text-green-800'
//       }`}
//     >
//     {e.validation}
//     </span>

//     <div className="flex justify-between gap-2 pt-2">
//           <p className="text-gray-700">Note : <span className="font-bold">{e.note} / 20</span></p>
//       <button
//         className="btn btn-ghost "
//         onClick={() => handleEdit(e)}
//       >
//         <Pencil className="w-4 h-4" />
//       </button>
//       <button
//         className="btn btn-ghost"
//         onClick={() => supprimerExamen(e.id)}
//       >
//         <Trash2 className="w-4 h-4" />
//       </button>
//     </div>
//   </div>
// ))}

//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex justify-center gap-2">
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//           <button
//             key={p}
//             className={`btn btn-sm rounded-full ${
//               currentPage === p
//                 ? 'bg-indigo-600 text-white'
//                 : 'bg-gray-200 hover:bg-gray-300'
//             }`}
//             onClick={() => setCurrentPage(p)}
//           >
//             {p}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NotesExamens;




import { useEffect, useState } from 'react';
import useEnseignantStore from '../../store/useEnseignantStore';
import useExamenStore from '../../store/useExamenStore';
import { Plus, Pencil, Trash2, BookOpen, User2, Percent } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useThemeStore } from '../../store/useThemeStore';

const NotesExamens = () => {
  const {
    cours,
    fetchMesCours,
    tousEtudiants,
    fetchTousLesEtudiants,
  } = useEnseignantStore();

  const {
    examens,
    fetchExamens,
    ajouterExamen,
    modifierExamen,
    supprimerExamen,
  } = useExamenStore();

  const { theme } = useThemeStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    etudiant_id: '',
    cours_id: '',
    note: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchMesCours();
    fetchTousLesEtudiants();
    fetchExamens();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { etudiant_id, cours_id, note } = formData;
    if (!etudiant_id || !cours_id || note === '') {
      return toast.error("Tous les champs sont requis.");
    }
    if (note < 0 || note > 20) {
      return toast.error("La note doit être entre 0 et 20.");
    }

    const data = { etudiant_id, cours_id, note };

    if (editingId) {
      await modifierExamen(editingId, data);
    } else {
      await ajouterExamen(data);
    }

    setFormData({ etudiant_id: '', cours_id: '', note: '' });
    setEditingId(null);
    setModalOpen(false);
  };

  const handleEdit = (exam) => {
    const etudiant = tousEtudiants.find(e => e.nom === exam.etudiant);
    const coursItem = cours.find(c => c.titre === exam.cours);
    setFormData({
      etudiant_id: etudiant?.id || '',
      cours_id: coursItem?.id || '',
      note: exam.note,
    });
    setEditingId(exam.id);
    setModalOpen(true);
  };

  const filteredExamens = examens.filter((e) =>
    e.etudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.cours.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExamens.length / itemsPerPage);
  const paginatedExamens = filteredExamens.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 space-y-6 relative ">
      
      <h1 className="text-4xl audiowide-regular-b mb-2">Gestion des Notes d'Examens</h1>

      <div className="flex justify-between items-center">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Rechercher par étudiant ou cours"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Ajouter Note
        </button>
      </div>

      {modalOpen && (
        <div className={`fixed h-screen inset-0 ${theme === "light" ? "bg-black/20" : "bg-white/20"} z-50 flex items-center justify-center`}>
          <div className="bg-base-100 p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl text-center audiowide-regular-b font-bold mb-4">{editingId ? 'Modifier' : 'Ajouter'} une Note</h2>

            <label className="label label-text mb-1 flex items-center gap-1"><User2 className="w-4 h-4" /> Étudiant</label>
            <select name="etudiant_id" className="select select-bordered w-full mb-3" value={formData.etudiant_id} onChange={handleChange}>
              <option value="">-- Choisir un étudiant --</option>
              {tousEtudiants.map((etudiant) => (
                <option key={etudiant.id} value={etudiant.id}>{etudiant.nom} ({etudiant.email})</option>
              ))}
            </select>

            <label className="label label-text mb-1 flex items-center gap-1"><BookOpen className="w-4 h-4" /> Cours</label>
            <select name="cours_id" className="select select-bordered w-full mb-3" value={formData.cours_id} onChange={handleChange}>
              <option value="">-- Choisir un cours --</option>
              {cours.map((c) => (
                <option key={c.id} value={c.id}>{c.titre}</option>
              ))}
            </select>

            <label className="label label-text mb-1 flex items-center gap-1"><Percent className="w-4 h-4" /> Note (/20)</label>
            <input
              type="number"
              name="note"
              className="input input-bordered w-full mb-4"
              placeholder="Note /20"
              value={formData.note}
              onChange={handleChange}
              min="0"
              max="20"
            />

            <div className="flex justify-between gap-2">
              <button className="btn btn-secondary" onClick={() => {
                setModalOpen(false);
                setEditingId(null);
                setFormData({ etudiant_id: '', cours_id: '', note: '' });
              }}>Annuler</button>
              <button className="btn btn-primary" onClick={handleSubmit}>{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#id</th>
              <th>Étudiant</th>
              <th>Cours</th>
              <th>Validation</th>
             
              <th>Date</th>
               <th>Note</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedExamens.map((e) => (
              <tr key={e.id}>
                <td>{e.ide}</td>
                <td>{e.etudiant}</td>
                <td>{e.cours}</td>
                <td
  className={`font-bold ${
    e.validation === "OR"
      ? "text-orange-400"
      : e.validation === "NV"
      ? "text-red-400"
      : "text-green-400"
  }`}
>
  {e.validation}
</td>

               
                <td>{new Date(e.date_examen).toLocaleDateString()}</td>
                 <td
                 className={` font-bold`}
                 >{e.note} / 20</td>
                <td className="flex justify-end gap-2">
                  <button className="btn btn-sm " onClick={() => handleEdit(e)}>
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="btn btn-sm " onClick={() => supprimerExamen(e.id)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination simple sans flèches ni texte */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            className={`btn btn-xs  ${currentPage === p ? 'btn-primary' : ''}`}
            onClick={() => setCurrentPage(p)}
          >{p}</button>
        ))}
      </div>
    </div>
  );
};

export default NotesExamens;
