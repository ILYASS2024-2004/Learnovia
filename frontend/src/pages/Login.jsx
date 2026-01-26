import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { KeyRound, Sparkles } from 'lucide-react';
import './login.css';
import CardSwap ,{Card} from '../components/CardSwap'; // Import CardSwap component
import { useThemeStore } from '../store/useThemeStore';
import Navbar from '../components/Navbar';
const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
const {theme}=useThemeStore();
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    role: 'etudiant',
  });


  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.mot_de_passe || !formData.role) {
      return toast.error("Tous les champs sont requis");
    }

    setLoading(true);

    try {
      const success = await login(formData);

      if (success) {
        toast.success("Connexion réussie");
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
     <div className={ ` h-screen pt-7 sm:pt-6 overflow-hidden grid grid-cols-1 lg:grid-cols-2 ${theme === 'light' ? 'login-l' :  'login-d'}`}>
  
     
    
      
      {/* Left side - Login form */}
    
      <div className="flex h-screen overflow-hidden flex-col  justify-center items-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            
            <div className='flex gap-2 justify-center'>
              <h2 className="text-4xl  connexion">
              Connexion 
            </h2><span><KeyRound  className='text-3xl h-5 w-5 '/></span> 
            </div>
            
            <p className="text-gray-600 mt-2">Accédez à votre espace personnel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
  {/* Email field */}
  <div className="relative ">
    <div className="flex items-center border-b-3 focus-within:border-indigo-600 pb-2 transition-colors duration-300 ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
      <input
        type="email"
        name="email"
        className="block w-full bg-transparent border-0 focus:outline-none focus:ring-0 py-2"
        placeholder=" "
        value={formData.email}
        onChange={handleChange}
      />
    </div>
    <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
      Adresse email
    </label>
  </div>

  {/* Password field */}
  <div className="relative">
    <div className="flex items-center border-b-3 focus-within:border-indigo-600 pb-2 transition-colors duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      <input
        type="password"
        name="mot_de_passe"
        className="block w-full bg-transparent border-0 focus:outline-none focus:ring-0 py-2"
        placeholder=" "
        value={formData.mot_de_passe}
        onChange={handleChange}
      />
      
    </div>
    <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
      Mot de passe
    </label>
  </div>

  {/* Role selector */}
  
  <div className="relative">
    <div className="flex items-center border-b-3 focus-within:border-indigo-600 pb-2 transition-colors duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
      <select
        name="role"
        className="block w-full bg-transparent border-0 focus:outline-none focus:ring-0 py-2"
        value={formData.role}
        onChange={handleChange}
      >
         <option
    className={`${theme=="light"?" bg-black text-white":"bg-white text-black"} `}
    value="etudiant"
  >
     Étudiant
  </option>
  <option
     className={`${theme=="light"?" bg-black text-white":"bg-white text-black"} `}
    value="enseignant"
  >
     Enseignant
  </option>
  <option
     className={`${theme=="light"?" bg-black text-white":"bg-white text-black"} `}
    value="admin"
  >
     Admin
  </option>
      </select>
    </div>
    <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
      Rôle
    </label>
  </div>

 <button
  type="submit"
  className="group relative inline-flex w-full justify-center items-center px-6 py-3 mt-8 font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 ease-in-out rounded-xl shadow-xl hover:shadow-2xl border-0 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
  disabled={loading}
>
    {/* Sparkles animation */}
  <Sparkles
    className={`absolute animate-pulse ${theme=="light"?'text-black':' text-white'} w-7 h-7 -top-2 left-4 pointer-events-none`}
  />
  <Sparkles
    className={`absolute  ${theme=="light"?'text-black':' text-white'} animate-pulse w-7 h-7 -bottom-2 right-4 pointer-events-none`}
  />
 
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Connexion...
    </span>
  ) : (
    <span className="flex items-center justify-center gap-2 transition-all duration-300 group-hover:gap-3">
      <span className="text-lg">Se connecter</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )}
</button>

</form>

          <div className="flex justify-between  mt-6">
            <p
              className="text-sm text-indigo-600 cursor-pointer hover:underline transition-all"
              onClick={() => setShowModal(true)}
            >
              Mot de passe oublié ?
            </p>
            <Link to="/register" className="text-sm text-indigo-600 cursor-pointer hover:underline transition-all">
                Créer un compte !
              </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image/Content */}
<div className='hidden lg:block' style={{ height: '100%', position: 'relative',width: '50%',transform: 'translateX(90%) translateY(-10%)' }}>
  <CardSwap
    cardDistance={60}
    verticalDistance={70}
    delay={2000}
    pauseOnHover={false}
  >
    <Card>
     <div className="flex items-center gap-3 p-1 border-b">
  <div className="flex gap-1 items-center">
    <div className={`h-2 w-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div>
    <div className={`h-2 w-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div>
    <div className={`h-2 w-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div>
  </div>
  <p className="text-sm m-0 p-0">Etudiant</p>
</div>
<div className='p-6'>
  <div class="bg-blue-100 p-6 rounded-2xl shadow-md my-4">
  <p class="text-xl italic text-blue-800">"L’éducation est l’arme la plus puissante qu’on puisse utiliser pour changer le monde."</p>
  <p class="text-right mt-4 font-semibold text-blue-900">— Nelson Mandela</p>
  <p class="mt-2 text-sm text-blue-600">Citation pour les étudiants</p>
</div>
<div class="bg-purple-100 p-6 rounded-2xl shadow-md my-4">
  <p class="text-xl italic text-purple-800">"Apprendre sans réfléchir est vain. Réfléchir sans apprendre est dangereux."</p>
  <p class="text-right mt-4 font-semibold text-purple-900">— Confucius</p>
  <p class="mt-2 text-sm text-purple-600">Citation pour les étudiants</p>
</div>
</div>

    
    </Card>
    <Card>
    <div className="flex items-center gap-3 p-1 border-b">
  <div className="flex gap-1 items-center">
    <div className={`h-2 w-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div>
    <div className={`h-2 w-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div>
    <div className={`h-2 w-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div>
  </div>
  <p className="text-sm m-0 p-0">Enseignant</p>
</div>

<div className='p-6'>
  <div className="bg-secondary-content p-6 rounded-2xl shadow-md my-4">
    <p className="text-xl italic text-secondary">"L’art suprême de l’enseignant est d’éveiller la joie dans l’expression créative et la connaissance."</p>
    <p className="text-right mt-4 font-semibold text-secondary">— Albert Einstein</p>
    <p className="mt-2 text-sm text-secondary">Citation pour les enseignants</p>
  </div>
  <div className="bg-warning-content p-6 rounded-2xl shadow-md my-4">
    <p className="text-xl italic text-warning">"Ce que l'on apprend avec plaisir ne s'oublie jamais."</p>
    <p className="text-right mt-4 font-semibold text-warning">— Alfred Mercier</p>
    <p className="mt-2 text-sm text-warning">Citation pour les enseignants</p>
  </div>

</div>

    </Card>
    <Card>
          <div className="flex items-center gap-3 p-1 border-b">
  <div className="flex gap-1 items-center">
    <div className={`h-2 w-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div>
    <div className={`h-2 w-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div>
    <div className={`h-2 w-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></div>
  </div>
  <p className="text-sm m-0 p-0">Admin</p>
</div>
<div className='p-6'>
  <div className="bg-success-content p-6 rounded-2xl shadow-md my-4">
    <p className="text-xl italic text-success">"Diriger, c’est avoir une vision claire et savoir inspirer les autres à la réaliser."</p>
    <p className="text-right mt-4 font-semibold text-success">— Steve Jobs</p>
    <p className="mt-2 text-sm text-success">Citation pour les administrateurs</p>
  </div>

   <div className="bg-error-content p-6 rounded-2xl shadow-md my-4">
    <p className="text-xl italic text-error">"Le management, c’est faire les choses bien ; le leadership, c’est faire les bonnes choses."</p>
    <p className="text-right mt-4 font-semibold text-error">— Peter Drucker</p>
    <p className="mt-2 text-sm text-error">Citation pour les administrateurs</p>
  </div>
  </div>


    </Card>
  </CardSwap>
</div>
        
    
      {/* Modale mot de passe oublié */}
      <ForgotPasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-15px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
    </>
   
  );
};

export default LoginPage;