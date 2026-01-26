import { useEffect } from 'react';
import useEnseignantStore from '../../store/useEnseignantStore';
import { X } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const ChapitresModal = ({ cours, onClose }) => {
  const { chapitres, fetchChapitres } = useEnseignantStore();
    const {theme}=useThemeStore();
  useEffect(() => {
    if (cours?.id) {
      fetchChapitres(cours.id);
    }
  }, [cours]);

  return (
    <div className={`fixed inset-0 ${theme === "light" ? "bg-black/20" : "bg-white/20"} z-50 flex items-center justify-center`}>
      <div className=" p-6 rounded-lg bg-base-100 w-[90%] max-w-md h-[300px] overflow-y-auto">
<div className="flex justify-between items-center mb-4">
          
          <h2 className="text-2xl audiowide-regular-b  ">
          Chapitres de {cours.titre}
          </h2>
          <button className="btn btn-sm btn-ghost"  onClick={onClose}>
            <X />
          </button>
        </div>        <ul className="list bg-base-200 rounded-box shadow-md">
          {chapitres.length === 0 && <p className="text-sm text-gray-500">Aucun chapitre trouvé.</p>}
          {chapitres.map(chap => (
            <li key={chap.id} className="list-row">
                  <div>
              <img className="size-15 rounded-box border-2" src={chap.img_url || "https://via.placeholder.com/40"} alt="Chapitre" />
            </div>
            <div>
                 <div>{chap.titre}</div>
                 <div className="text-xs uppercase font-semibold opacity-60">{chap.date_de_creation	}</div>
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: chap.contenu }} /> */}

               
        
                </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default ChapitresModal;
