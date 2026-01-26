import React, { useEffect, useState } from 'react';
import useEtudiantStore from '../../store/useEtudiantStore';
import useAuthStore from '../../store/useAuthStore';
import { Award, Loader, CalendarCheck } from 'lucide-react';

const Examens = () => {
  const { examens, fetchMesExamens, isLoading } = useEtudiantStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const charger = async () => {
      if (user?.id) {
        setLoading(true);
        await fetchMesExamens(user.id);
        setLoading(false);
      }
    };
    charger();
  }, [user]);

  const getValidationColor = (note) => {
    if (note >= 12) return 'text-green-600';
    if (note >= 10) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl audiowide-regular-b mb-8 flex items-center gap-2">
        <Award size={40} /> Résultats des Examens
      </h2>

      {loading || isLoading ? (
        <div className="flex justify-center py-20">
          <Loader className="animate-spin w-10 h-10 text-primary" />
        </div>
      ) : examens.length === 0 ? (
        <p className="text-center text-gray-500">Aucun examen trouvé pour l’instant.</p>
      ) : (
        <div className="overflow-x-auto h-[400px] overflow-y-auto">
          <table className="table w-full ">
            <thead>
              <tr>
                <th>#</th>
                <th>Cours</th>
                <th>Note</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {examens.map((exam, index) => (
                <tr key={exam.id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{exam.cours}</td>
                  <td className="text-sm">{exam.note}</td>
                  <td>
                    <span className={`text-sm font-semibold ${getValidationColor(exam.note)}`}>
                      {exam.validation}
                    </span>
                  </td>
                  <td className="text-sm flex items-center gap-1">
                    <CalendarCheck size={16} /> {new Date(exam.date_examen).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Examens;
