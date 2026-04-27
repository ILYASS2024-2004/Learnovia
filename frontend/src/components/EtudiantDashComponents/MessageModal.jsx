import { useEffect, useState } from 'react';
import useEtudiantStore from '../../store/useEtudiantStore';
import {
  X,
  Loader,
  BotMessageSquare,
  User2,
  MessageCircle,
} from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const MessageModal = ({ onClose }) => {
  const {
    envoyerMessage,
    enseignants,
    fetchEnseignants,
    isLoading
  } = useEtudiantStore();

  const [enseignantId, setEnseignantId] = useState('');
  const [texte, setTexte] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    fetchEnseignants();
  }, []);

  const handleSend = async () => {
    if (!enseignantId || !texte) return;
    setIsSending(true);
    await envoyerMessage(enseignantId, texte);
    setTexte('');
    setIsSending(false);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${theme === "light" ? "bg-black/20" : "bg-white/20"} z-50 flex items-center justify-center`}>
      <div className="bg-base-100 p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-500">
          <X size={20} />
        </button>

        <h2 className="text-2xl text-center audiowide-regular-b mb-6">Envoyer un message</h2>

        {isLoading ? (
          <div className="text-center text-gray-500">Chargement des enseignants...</div>
        ) : (
          <>
            <label className="label text-sm font-semibold mb-1 flex items-center gap-2">
              <User2 size={16} className="text-gray-600" />
              <span className="label-text text-foreground">Enseignant</span>
            </label>
            <div className="relative mb-4">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <User2 size={18} />
              </span>
              <select
                value={enseignantId}
                onChange={(e) => setEnseignantId(e.target.value)}
                className="select select-bordered w-full pl-1"
              >
                <option value="">-- Sélectionner un enseignant --</option>
                {enseignants.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nom} 
                  </option>
                ))}
              </select>
            </div>

            <label className="label text-sm font-semibold mb-1 flex items-center gap-2">
              <MessageCircle size={16} className="text-gray-600" />
              <span className="label-text text-foreground">Message</span>
            </label>
            <div className="relative mb-4">
           
              <textarea
                placeholder="Écrivez votre message ici..."
                value={texte}
                onChange={(e) => setTexte(e.target.value)}
                className="textarea textarea-bordered w-full pl-1 h-28 resize-none"
              />
            </div>

            <div className="flex justify-between gap-2 sm:gap-4">
              <button
                onClick={onClose}
                className="btn btn-sm sm:btn-md btn-error text-white flex items-center gap-2"
              >
                <X size={18} /> Annuler l'action
              </button>
              <button
                onClick={handleSend}
                disabled={isSending}
                className="btn btn-sm sm:btn-md btn-primary flex items-center gap-2"
              >
                {isSending ? (
                  <>
                    <Loader className="animate-spin" size={18} /> Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message <BotMessageSquare size={18} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageModal;
