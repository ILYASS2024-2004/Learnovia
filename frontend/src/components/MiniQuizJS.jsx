import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const MiniQuizJS = () => {
  const [selected, setSelected] = useState(null);
  const correct = "C";

  const check = () => {
    if (!selected) return toast.error("Choisis une réponse !");
    toast[selected === correct ? "success" : "error"](
      selected === correct ? "Bien joué ! 🧠" : "Faux... essaie encore."
    );
  };

  return (
    <div className="bg-blue-50 p-3 rounded-xl shadow-md text-sm">
      <p className="font-semibold text-yellow-800 mb-2">🟨 JavaScript :</p>
      <p className="mb-2 text-gray-700">Comment déclare-t-on une variable ?</p>

      <div className="space-y-1">
        <label className="flex items-center gap-2  text-black">
          <input type="radio" name="js" value="A" onChange={() => setSelected("A")} className="radio radio-xs" />
          let varName =
        </label>
        <label className="flex items-center gap-2 text-black">
          <input type="radio" name="js" value="B" onChange={() => setSelected("B")} className="radio radio-xs" />
          variable varName;
        </label>
        <label className="flex items-center gap-2 text-black">
          <input type="radio" name="js" value="C" onChange={() => setSelected("C")} className="radio radio-xs" />
          let varName;
        </label>
      </div>

      <button
        onClick={check}
        className="btn btn-xs btn-warning w-full mt-3"
      >
        Valider
      </button>

     
    </div>
  );
};

export default MiniQuizJS;
