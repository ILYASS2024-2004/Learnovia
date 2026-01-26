// 📁 pages/etudiant/ChapitresCoursEtudiant.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useEtudiantStore from '../../store/useEtudiantStore';
import { Loader, Sparkles } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
const ChapitresCoursEtudiant = () => {
  const { id } = useParams(); // id = chapitre_id
  const { fetchChapitreParId } = useEtudiantStore();
  const [chapitre, setChapitre] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  const {theme}=useThemeStore();

  useEffect(() => {
    const chargerChapitre = async () => {
      setLoading(true);
      const data = await fetchChapitreParId(id);
      setChapitre(data);
      setLoading(false);
    };
    chargerChapitre();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!chapitre) {
    return <p className="text-center text-gray-500">Chapitre introuvable ou non accessible.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-4xl audiowide-regular-b"><span className='text-gray-400'>#{chapitre.ordre}</span> {chapitre.titre}</h2>
      <p className="text-gray-400 text-sm">{chapitre.description}</p>

      {chapitre.contenu ? (
  
        <> 
        <div className='p-3 rounded-2xl bg-base-300 border-1 border-gray-400'>
            <div dangerouslySetInnerHTML={{ __html: chapitre.contenu }} />
          <div className="mt-6">
        </div>
      
   
   
   
  </div>
           <button
      onClick={() => Navigate(`/dashboard/chapitres/test/${chapitre.id}`)}
      className="group relative inline-flex  justify-center items-center px-9 py-3 mt-8 font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 ease-in-out rounded-xl shadow-xl hover:shadow-2xl border-0 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
    >
          {/* Sparkles animation */}
  <Sparkles
    className={`absolute animate-pulse ${theme=="light"?'text-black':' text-white'} w-7 h-7 -top-2 left-2 pointer-events-none`}
  />
  <Sparkles
    className={`absolute  ${theme=="light"?'text-black':' text-white'} animate-pulse w-7 h-7 -bottom-2 right-2 pointer-events-none`}
  />
 

       Voulez-vous passer le test de ce chapitre ?
    </button>       
        </>
                
    
      ) : (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <p className="text-yellow-700">
            Vous devez acheter ce cours pour accéder au contenu de ce chapitre.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChapitresCoursEtudiant;
