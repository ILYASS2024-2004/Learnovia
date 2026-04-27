import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useEtudiantStore from '../../store/useEtudiantStore';
import { FileText, Timer } from 'lucide-react';
import ConfettiExplosion from 'react-confetti-explosion';
import { useThemeStore } from '../../store/useThemeStore';

const TestChapitre = () => {
  const { chapitre_id } = useParams();
  const {
    fetchQuestionsChapitre,
    soumettreTestChapitre,
    marquerChapitreTermine,
  } = useEtudiantStore();
const { theme } = useThemeStore();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [resultat, setResultat] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestionsChapitre(chapitre_id);
      setQuestions(data);
    };
    loadQuestions();
  }, [chapitre_id]);

  const handleChange = (question_id, reponse_donnee) => {
    setAnswers((prev) => ({ ...prev, [question_id]: reponse_donnee }));
  };

  const handleSubmit = async () => {
    const formatted = Object.entries(answers).map(([question_id, reponse_donnee]) => ({
      question_id: parseInt(question_id),
      reponse_donnee,
    }));

    const data = await soumettreTestChapitre(chapitre_id, formatted);
    setResultat(data);

    if (data?.score >= 50) {
      await marquerChapitreTermine(chapitre_id);
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 5000);
    }
  };

  return (
    <div className=" p-2 sm:p-6 rounded-lg relative">
      {showFireworks && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <ConfettiExplosion force={0.9} duration={5000} particleCount={250} width={1600} />
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl sm:text-4xl audiowide-regular-b">Test du Chapitre</h2>
        <div className="flex flex-col gap-1 justify-center items-center">
          <Timer size={30} />
          10min
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 relative">
                     <div className={`absolute bottom-0 right-0  w-60 h-30 ${theme=="dark"? 'bg-amber-600/30':'bg-amber-600/20'}   rounded-full blur-3xl `}></div>
                     <div className={`absolute bottom-1/4 right-1/2  w-60 h-30 ${theme=="dark"? 'bg-purple-600/30':'bg-purple-600/20'}   rounded-full blur-3xl `}></div>

        {questions.map((q, index) => (
          <div key={q.id} className="border-1 border-gray-400 bg-base-300 p-1 sm:p-4 mb-4 rounded-2xl">
            <p className="font-semibold mb-2 text-gray-400">Question N° {index + 1}</p>
            <p className="text-gray-400 mb-1">{q.texte_question}</p>
            <div className="rounded-2xl border-1 border-gray-400 p-1 sm:p-4">
              {q.options.map((opt) => (
                <label key={opt.label} className="block mb-1">
                  <input
                    type="radio"
                    name={`question_${q.id}`}
                    value={opt.label}
                    checked={answers[q.id] === opt.label}
                    onChange={() => handleChange(q.id, opt.label)}
                    className="mr-2 checkbox checkbox-sm"
                  />
                   {opt.value}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!resultat && (
        <button
          onClick={handleSubmit}
          className="group relative inline-flex btn btn-primary justify-center items-center px-10 py-3 mt-2 font-semibold text-white bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 ease-in-out rounded-xl shadow-xl hover:shadow-2xl border-0 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Soumettre mes réponses <FileText />
        </button>
      )}

      {resultat && (
        <div className="mt-8">
          <div className={`text-xl font-semibold mb-4 ${resultat.score >= 50 ? 'text-green-300' : 'text-red-300'}`}>
            score : {resultat.score}%
          </div>
          <div className="flex flex-wrap gap-5">
            {resultat.details.map((rep, index) => (
              <div key={rep.question_id} className="rounded p-2">
                <p className="font-bold mb-1">Question N°{index + 1}</p>
                <p className="text-sm text-gray-400">
                  Ta réponse : <span className="font-semibold text-red-300">{rep.reponse_texte}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Bonne réponse : <span className="font-semibold text-green-300">{rep.bonne_reponse_texte}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestChapitre;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import useEtudiantStore from '../../store/useEtudiantStore';
// import { FileText, Timer } from 'lucide-react';

// const TestChapitre = () => {
//   const { chapitre_id } = useParams();
//   const {
//     fetchQuestionsChapitre,
//     soumettreTestChapitre,
//     marquerChapitreTermine,
//   } = useEtudiantStore();

//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [resultat, setResultat] = useState(null);


//   useEffect(() => {
//     const loadQuestions = async () => {
//       const data = await fetchQuestionsChapitre(chapitre_id);
//       setQuestions(data);
//     };
//     loadQuestions();
//   }, [chapitre_id]);

//   const handleChange = (question_id, reponse_donnee) => {
//     setAnswers((prev) => ({ ...prev, [question_id]: reponse_donnee }));
//   };

//   const handleSubmit = async () => {
//     const formatted = Object.entries(answers).map(([question_id, reponse_donnee]) => ({
//       question_id: parseInt(question_id),
//       reponse_donnee,
//     }));

//     const data = await soumettreTestChapitre(chapitre_id, formatted);
//     setResultat(data);

//     // ✅ Marquer le chapitre terminé si score >= 50%
//     if (data?.score >= 50) {
//       await marquerChapitreTermine(chapitre_id);
//     }
//   };

//   return (
//     <div className="p-6 rounded-lg ">
//       <div className="mb-6 flex items-center justify-between">
//            <h2 className="text-4xl font-light text-foreground tracking-wide">Test du Chapitre</h2> 

//            <div className='flex flex-col gap-1 justify-center items-center'><Timer size={30} />
//                 10min
//      </div>
     
   
//       </div>
//       <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
//           {questions.map((q, index) => (
//         <div key={q.id} className={`border-1 border-gray-400 bg-base-300  p-4 mb-4 rounded-2xl   `}>
//           <p className="font-semibold mb-2 text-gray-400 ">
//            Question N° {index + 1}
         
//           </p>
//           <p className='text-gray-400 mb-1'>  {q.texte_question}</p>

//             <div className='rounded-2xl border-1 border-gray-400 p-4'>
//                 {q.options.map((opt) => (
//             <label key={opt.label} className="block mb-1">
//               <input
//                 type="radio"
//                 name={`question_${q.id}`}
//                 value={opt.label}
//                 checked={answers[q.id] === opt.label}
//                 onChange={() => handleChange(q.id, opt.label)}
//                 className="mr-2 checkbox checkbox-sm"
//               />
//               {opt.label}. {opt.value}
//             </label>
//           ))}

//             </div>
        
//         </div>
//       ))}
//       </div>

    

//       {!resultat && (
//         <button
//           onClick={handleSubmit}
//           className="group relative inline-flex btn btn-primary  justify-center items-center px-10 py-3 mt-2 font-semibold text-white   bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 ease-in-out rounded-xl shadow-xl hover:shadow-2xl border-0 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
//         >
//           Soumettre mes réponses <FileText></FileText>
//         </button>
//       )}

//       {resultat && (
//         <div className="mt-8">
//           <div className={`text-xl font-semibold mb-4 ${resultat.score>=50? 'text-green-300':'text-red-300'} `}>
//             score : {resultat.score}% 
//           </div>
//           <div className='flex flex-wrap gap-5'>
//             {resultat.details.map((rep, index) => (
//             <div key={rep.question_id} className=" rounded p-2 ">
//               <p className="font-bold mb-1">
//                 Question N°{index + 1}
//               </p>
//               <p className="text-sm text-gray-400">
//                 Ta réponse : <span className="font-semibold text-red-300">{rep.reponse_donnee}</span>
//               </p>
//               <p className="text-sm text-gray-400">
//                 Bonne réponse : <span className="font-semibold text-green-300">{rep.bonne_reponse}</span>
//               </p>
//             </div>
//           ))}
//           </div>
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestChapitre;
