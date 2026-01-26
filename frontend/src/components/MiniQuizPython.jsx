import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const MiniQuizPython = () => {
  const [selected, setSelected] = useState(null);
  const correct = "B";

  const check = () => {
    if (!selected) return toast.error("Choisis une option !");
    toast[selected === correct ? "success" : "error"](
      selected === correct ? "Bravo ! 🎉" : "Oops, essaie encore."
    );
  };

  return (

       <div className="bg-lime-50 p-1 rounded-xl shadow-md text-sm">
      <p className="font-semibold text-lime-800 mb-2">🐍 Python :</p>
      <p className="mb-2 text-gray-700">Quel est le bon mot-clé pour une fonction ?</p>

      <div className="space-y-0.5">
        <label className="flex items-center gap-2 text-black">
          <input type="radio" name="py" value="A" onChange={() => setSelected("A")} className="radio radio-xs" />
          var
        </label>
        <label className="flex items-center gap-2 text-black">
          <input type="radio" name="py" value="B" onChange={() => setSelected("B")} className="radio radio-xs" />
          def
        </label>
        <label className="flex items-center gap-2 text-black">
          <input type="radio" name="py" value="C" onChange={() => setSelected("C")} className="radio radio-xs" />
          function
        </label>
      </div>

      <button
        onClick={check}
        className="btn btn-xs btn-success w-full mt-1"
      >
        Valider
      </button>

     
    </div>
 
   
  );
};

export default MiniQuizPython;
