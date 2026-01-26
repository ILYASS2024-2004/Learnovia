// 📁 pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import toast from 'react-hot-toast';
import CardSwap ,{Card} from '../components/CardSwap'; // Import CardSwap component
import Navbar from '../components/Navbar';
import { UserPlus, Sparkles } from 'lucide-react';
import './login.css'; // tu peux réutiliser le même CSS

const RegisterPage = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();
const {theme}=useThemeStore();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    adress: '',
    mot_de_passe: '',
    date_naissance: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que tous les champs sont remplis
    for (let key in formData) {
      if (!formData[key]) {
        return toast.error('Tous les champs sont requis');
      }
    }

    setLoading(true);
    try {
      const res = await register(formData);
      toast.success(res.message || 'Inscription réussie');
      navigate('/login'); // redirige vers login après inscription
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de l’inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
           <div className={ ` h-screen pt-7 sm:pt-6 overflow-hidden grid grid-cols-1 lg:grid-cols-2 ${theme === 'light' ? 'login-l' :  'login-d'}`}>

        {/* Left side - Form */}
        <div className="flex h-screen flex-col justify-center items-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-5">
              <div className='flex gap-2 justify-center'>
                <h2 className="text-4xl connexion">Inscription</h2>
                <UserPlus className='text-3xl h-5 w-5' />
              </div>
              <p className="text-gray-600 mt-1">Créez votre compte étudiant</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
  {/* Nom */}
  <div className="relative flex items-center border-b-3 pb-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
    <input
      type="text"
      name="nom"
      placeholder=" "
      value={formData.nom}
      onChange={handleChange}
      className="block w-full bg-transparent focus:outline-none focus:ring-0"
    />
  </div>
  <label className="block text-sm font-medium text-gray-700 mb-4 mt-1">Nom complet</label>

  {/* Email */}
  <div className="relative flex items-center border-b-3 pb-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
    <input
      type="email"
      name="email"
      placeholder=" "
      value={formData.email}
      onChange={handleChange}
      className="block w-full bg-transparent focus:outline-none focus:ring-0"
    />
  </div>
  <label className="block text-sm font-medium text-gray-700 mb-4 mt-1">Adresse email</label>

  {/* Adresse */}
  <div className="relative flex items-center border-b-3 pb-2">
   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 24 24" fill="currentColor">
  <path fillRule="evenodd" d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" clipRule="evenodd" />
</svg>

    <input
      type="text"
      name="adress"
      placeholder=" "
      value={formData.adress}
      onChange={handleChange}
      className="block w-full bg-transparent focus:outline-none focus:ring-0"
    />
  </div>
  <label className="block text-sm font-medium text-gray-700 mb-4 mt-1">Adresse</label>

  {/* Date de naissance */}
  <div className="relative flex items-center border-b-3 pb-2">
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2c-.55 0-1 .45-1 1v2H8c-.55 0-1 .45-1 1v3h10V5c0-.55-.45-1-1-1h-3V3c0-.55-.45-1-1-1zm7 8H5v9c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-9zM7 14h3v3H7v-3zm7 0h3v3h-3v-3z"/>
</svg>


    <input
      type="date"
      name="date_naissance"
      placeholder=" "
      value={formData.date_naissance}
      onChange={handleChange}
      className="block w-full bg-transparent focus:outline-none focus:ring-0"
    />
  </div>
  <label className="block text-sm font-medium text-gray-700 mb-4 mt-1">Date de naissance</label>

  {/* Mot de passe */}
  <div className="relative flex items-center border-b-3 pb-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
    <input
      type="password"
      name="mot_de_passe"
      placeholder=" "
      value={formData.mot_de_passe}
      onChange={handleChange}
      className="block w-full bg-transparent focus:outline-none focus:ring-0"
    />
  </div>
  <label className="block text-sm font-medium text-gray-700 mb-4 mt-1">Mot de passe</label>

  <button
    type="submit"
    disabled={loading}
    className="group relative inline-flex w-full justify-center items-center px-6 py-3 mt-6 font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 ease-in-out rounded-xl shadow-xl hover:shadow-2xl border-0 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
  >
    <Sparkles
      className={`absolute animate-pulse ${theme=="light"?'text-black':' text-white'} w-7 h-7 -top-2 left-4 pointer-events-none`}
    />
    <Sparkles
      className={`absolute  ${theme=="light"?'text-black':' text-white'} animate-pulse w-7 h-7 -bottom-2 right-4 pointer-events-none`}
    />
    {loading ? 'Inscription...' : 'S’inscrire'}
  </button>
</form>

            <div className="text-center mt-3">
              <p className="text-sm text-indigo-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>
                Déjà un compte ? Connectez-vous
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Illustration ou contenu */}
        
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
      </div>
    </>
  );
};

export default RegisterPage;
