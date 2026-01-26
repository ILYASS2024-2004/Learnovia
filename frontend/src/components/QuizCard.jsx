import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const QuizCard = () => {
  const [selected, setSelected] = useState(null);
  const correctAnswer = 'B';

  const handleSubmit = () => {
    if (!selected) return toast.error("Choisissez une réponse !");
    if (selected === correctAnswer) {
      toast.success("Bonne réponse ! 🎉");
    } else {
      toast.error("Mauvaise réponse ❌");
    }
  };

  return (
    <div className="bg-yellow-50 p-2 rounded-2xl shadow-lg">
      <h3 className="text-lg font-bold  text-yellow-900">🧠 Quiz rapide</h3>
      <p className=" text-gray-800">Quel langage est utilisé pour styliser une page web ?</p>

      <div className="space-y-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="q1" value="A" className="radio radio-sm" onChange={() => setSelected('A')} />
          <span className="text-gray-700">A. JavaScript</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="q1" value="B" className="radio radio-sm" onChange={() => setSelected('B')} />
          <span className="text-gray-700">B. CSS</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="q1" value="C" className="radio radio-sm" onChange={() => setSelected('C')} />
          <span className="text-gray-700">C. PHP</span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="btn btn-sm mt-4 w-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
      >
        Valider ma réponse
      </button>

    
    </div>
  );
};

export default QuizCard;
