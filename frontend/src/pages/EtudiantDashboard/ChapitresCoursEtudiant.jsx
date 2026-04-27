import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useEtudiantStore from '../../store/useEtudiantStore';
import { Loader, Sparkles } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const ChapitresCoursEtudiant = () => {
  const { id } = useParams(); // chapitre_id
  const { fetchChapitreParId, fetchVideosByChapitre } = useEtudiantStore();
  const [chapitre, setChapitre] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  const { theme } = useThemeStore();

  useEffect(() => {
    const charger = async () => {
      setLoading(true);
      const dataChapitre = await fetchChapitreParId(id);
      const dataVideos = await fetchVideosByChapitre(id);

      setChapitre(dataChapitre);
      setVideos(dataVideos);
      setLoading(false);
    };
    charger();
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
    <div className="p-1 sm:p-6 space-y-4">
      <h2 className="text-xl sm:text-4xl audiowide-regular-b">
        <span className="text-gray-400">#{chapitre.ordre}</span> {chapitre.titre}
      </h2>
      <p className="text-gray-400 text-sm">{chapitre.description}</p>
      {/* 🔹 Affichage des vidéos */}
<div className="mt-3">
  {videos.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {videos.map((video) => (
        <div
          key={video.id}
          className="flex flex-col items-center overflow-hidden "
        >
          <video
            src={video.url}
            controls
            className="w-full h-[100%]  rounded-2xl border-4"
          />
          {video.description && (
            <p className="p-2 text-lg text-gray-500 text-center">{video.description}</p>
          )}
        </div>
       
      ))}
    </div>
  ) : (
    <p className="text-gray-400 ">Aucune vidéo pour ce chapitre.</p>
  )}
</div>



      {chapitre.contenu ? (
        <>
          <div className="p-1 sm:p-3 rounded-2xl bg-base-300 border-1 border-gray-400 min-w-[900px] ">
            <div  dangerouslySetInnerHTML={{ __html: chapitre.contenu }} />
          </div>

        
          <button
            onClick={() => Navigate(`/dashboard/chapitres/test/${chapitre.id}`)}
            className="group relative inline-flex justify-center items-center px-3 sm:px-9 py-1 sm:py-3 mt-8 font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 ease-in-out rounded-xl shadow-xl hover:shadow-2xl border-0 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            <Sparkles
              className={`absolute animate-pulse ${theme === 'light' ? 'text-black' : ' text-white'} w-7 h-7 -top-2 left-2 pointer-events-none`}
            />
            <Sparkles
              className={`absolute ${theme === 'light' ? 'text-black' : ' text-white'} animate-pulse w-7 h-7 -bottom-2 right-2 pointer-events-none`}
            />
            Voulez-vous passer le test de ce chapitre ?
          </button>
        </>
      ) : (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <p className="text-yellow-700">
           Aucune  contenu  pour ce chapitre.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChapitresCoursEtudiant;
