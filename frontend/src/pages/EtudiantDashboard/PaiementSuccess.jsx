import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useEtudiantStore from "../../store/useEtudiantStore";
import Lot from "../../components/EtudiantDashComponents/Lot";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PaiementSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { confirmerPaiement } = useEtudiantStore();
  const hasConfirmed = useRef(false); // ✅ protège contre les doublons
  const [etat, setEtat] = useState("loading");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const cours_id = queryParams.get("cours_id");

    const confirmer = async () => {
      if (hasConfirmed.current || !cours_id) return;
      hasConfirmed.current = true;

      try {
        await confirmerPaiement(Number(cours_id));
        setEtat("success");
      } catch (error) {
        console.error("Erreur de confirmation :", error);
        setEtat("error");
      }

      setTimeout(() => {
        navigate("/dashboard/mes-cours");
      }, 3000);
    };

    confirmer();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        {etat === "loading" && (
          <>
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-gray-500">Traitement du paiement...</p>
          </>
        )}
        {etat === "success" && (
          <>
        <>
  <DotLottieReact
    src="https://lottie.host/e0796636-9195-470e-bcfa-da6ada1fcae3/BNTbbaDH7E.lottie"
    autoplay
    loop={false}
    className="w-[300px] h-[200px] scale-220"
  />
</>

           

          </>
        )}
        {etat === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">❌ Erreur de confirmation</h2>
            <p className="text-sm text-gray-500">Déjà inscrit ou erreur serveur.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaiementSuccess;
