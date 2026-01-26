import React, { useEffect, useRef, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';

const BienvenueEtudiant = () => {
    const {user}=useAuthStore();
  const codeJS = `/**
 * Fonction pour souhaiter la bienvenue à un étudiant
 * avec une logique simulée.
 */
function bienvenueEtudiant(nom) {
  const message = [];

  message.push("Bonjour " + nom + " 👋");
  message.push("Bienvenue dans l'espace étudiant !");
  message.push("Nous sommes ravis de t'accueillir 🎓");
  message.push("Prépare-toi à apprendre, progresser et réussir 💪");

  return message.join("\\n");
}

// Exemple d'utilisation
console.log(bienvenueEtudiant(${user?.nom || 'Étudiant'}));
`;

  const [texteAffiche, setTexteAffiche] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTexteAffiche((prev) => prev + codeJS[i]);
      i++;
      if (i >= codeJS.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [texteAffiche]);

  return (
    <div className="bg-black text-white p-2 rounded-xl border border-gray-700 shadow-lg h-[100px] overflow-y-auto">
      <pre className="whitespace-pre-wrap font-mono text-sm">
        {texteAffiche}
        <div ref={endRef} />
      </pre>
    </div>
  );
};

export default BienvenueEtudiant;
