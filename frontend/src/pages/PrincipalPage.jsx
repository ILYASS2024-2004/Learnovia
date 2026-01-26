import React, { useEffect, useState } from 'react';
import './principal.css';
import { Loader } from 'lucide-react'
import { useThemeStore } from '../store/useThemeStore';
import QuizCard from '../components/QuizCard';
import MiniQuizPython from '../components/MiniQuizPython';
import MiniQuizJS from '../components/MiniQuizJs';
import  useAuthStore  from '../store/useAuthStore';
import Navbar from '../components/Navbar';
const PrincipalPage = () => { 
   const { theme } = useThemeStore();
  const { user, isAuthenticated } = useAuthStore();

  // Récupération immédiate du flag de session
  const hasSeenVideo = sessionStorage.getItem("hasSeenVideo") === "true";

  // showVideo = true uniquement si c'est la première visite
  const [showVideo] = useState(!hasSeenVideo);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    let timer;

    if (showVideo) {
      // Première visite, on affiche la vidéo
      sessionStorage.setItem("hasSeenVideo", "true");

      timer = setTimeout(() => {
        setIsLoad(false);
      }, 6000); // vidéo visible pendant 6s
    } else {
      // Déjà vu, juste un petit loader 300ms
      timer = setTimeout(() => {
        setIsLoad(false);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [showVideo]);

  if (isLoad) {
    if (showVideo) {
      return (
        
        <div className="video-wrapper">
        
          <video autoPlay loop muted>
            <source src="v4.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
            {/* DIV qui masque le watermark en bas à droite */}
 {/* <div className="absolute bottom-3 right-3 w-[30%] h-10 backdrop-blur-3xl bg-white/20 rounded z-10 pointer-events-none" /> */}
          <div className="flash bg-white" />
        </div>
      );
    } else {
      return (
        <div className="flex z-[999999999] absolute top-0 left-0 w-full bg-base-100 justify-center items-center h-screen text-2xl">
          <Loader className="size-30 animate-spin" />
        </div>
      );
    }
  }

  // 🎉 Contenu principal après le chargement
  return (
    <>
   
        <Navbar />
    <div className={`Container1 ${theme === 'light' ? 'login-lr' :  'login-dr'}`}>
      <div className='text-center  welcome '>
        <h1 className='title text-2xl sm:text-7xl '>Bienvenue sur <span className='animated-text'>LearNovia</span></h1>
        <p className='description w-[100%] sm:w-[60%] sm:text-xl text-gray-400 '>La plateforme d'apprentissage en ligne qui révolutionne l'éducation en offrant une expérience innovante, interactive et accessible à tous</p>
      </div>

      <div className='imgp'>

        <img src="ecole1.png" className='image-saturee ' alt="ecole" />
      </div>

      

      </div>

      
<div className="parent hidden sm:grid ">

    <div className="div1 bg-sky-300">
        <div className="bg-sky-100 p-6 rounded-2xl shadow-md my-4">
    <p className="text-xl italic text-sky-800">
      "L’éducation est le passeport pour l’avenir, car demain appartient à ceux qui s’y préparent aujourd’hui."
    </p>
    <p className="text-right mt-4 font-semibold text-sky-900">— Malcolm X</p>
    <p className="mt-2 text-sm text-sky-600">🎓 Citation pour les étudiants</p>
  </div>
    </div>
    <div class="div2 bg-emerald-300">
       <div className="bg-emerald-100 p-6 rounded-2xl shadow-md my-4">
    <p className="text-xl italic text-emerald-800">
      "Un bon leader emmène les gens là où ils veulent aller. Un grand leader les emmène là où ils doivent être."
    </p>
    <p className="text-right mt-4 font-semibold text-emerald-900">— Rosalynn Carter</p>
    <p className="mt-2 text-sm text-emerald-600">🧑‍💼 Citation pour les administrateurs</p>
  </div>
    </div>
    <div class="div3 bg-orange-400"><QuizCard></QuizCard></div>
    <div class="div4 flex justify-center items-center bg-blue-500">
      <div className="bg-blue-50 p-6 rounded-xl shadow-sm text-xl mt-4">
  <p className="italic text-blue-800">"On ne naît pas intelligent, on le devient."</p>
  <p className="text-right  font-medium text-blue-900">— Albert Einstein</p>
</div>


    
    </div>
    <div class="div5 bg-violet-400">
        <div className="bg-violet-100 p-6 rounded-2xl shadow-md my-4">
    <p className="text-xl italic text-violet-800 text-center">
      "L’éducation est l’arme la plus puissante que vous pouvez utiliser pour changer le monde."
    </p>
    </div>
    </div>
    <div class="div6 bg-violet-700">
       <div className="bg-violet-50 p-6 rounded-2xl shadow-sm text-xl">
  <p className="italic text-violet-800">"La curiosité est le début du savoir."</p>
  <p className="text-right mt-2 font-medium text-violet-900">— Socrate</p>
</div>

    </div>
    <div class="div8 bg-green-200">
      <MiniQuizJS></MiniQuizJS>
     
    

    </div>
    <div class="div9 bg-green-300">  
       <MiniQuizPython></MiniQuizPython>
    </div>
    <div class="div10 bg-rose-500">
        <div className="bg-rose-100 p-6 rounded-2xl shadow-md my-4">
    <p className="text-xl italic text-rose-800">
      "Un enseignant affecte l’éternité ; il ne peut jamais dire où son influence s’arrête."
    </p>
    <p className="text-right mt-4 font-semibold text-rose-900">— Henry Adams</p>
    <p className="mt-2 text-sm text-rose-600">👩‍🏫 Citation pour les enseignants</p>
  </div>
    </div>
    <div class="div11 bg-amber-300">
      <img src="std.png" alt="student" />
    </div>
    <div class="div12 flex justify-center items-center bg-red-200">
      <h3 className='text-2xl font-bold'>
        {isAuthenticated? user.nom:"Etudiant"}</h3>

    </div>
</div>

<div class="parent1 grid sm:hidden">
        <div class="div81 bg-sky-100">
           <div className=" p-6 rounded-2xl  my-4">
    <p className="text-sm italic text-center text-sky-800">
      "L’éducation est le passeport pour l’avenir, car demain appartient à ceux qui s’y préparent aujourd’hui."
    </p>

  </div>

        </div>
    <div class="div91 bg-rose-100">
        <div className=" p-6 rounded-2xl my-4">
    <p className="text-sm text-center italic text-rose-800">
      "Un enseignant affecte l’éternité ; il ne peut jamais dire où son influence s’arrête."
    </p>
   
  </div>
    </div>
    <div class="div101 bg-emerald-100"><div className=" p-6 rounded-2xl  my-4">
    <p className="text-sm  text-center italic text-emerald-800">
      "Un bon leader emmène les gens là où ils veulent aller. Un grand leader les emmène là où ils doivent être."
    </p>
    
  </div></div>
    <div class="div111 bg-violet-100">
       <div className=" p-6 rounded-2xl  my-4">
    <p className="text-sm text-center italic text-violet-800 ">
      "L’éducation est l’arme la plus puissante que vous pouvez utiliser pour changer le monde."
    </p>
    </div>
      
    </div>
    <div class="div121 bg-yellow-100"> <MiniQuizPython></MiniQuizPython></div>
</div>

<div className="container2">
  <div className={`absolute w-full h-[60px] ${theme=="light"?"bg-white":"bg-black"} tra `}></div>
  <div className="content2">
    <div className="hero_text text-md sm:text-3xl">Sur LearNovia,</div>
    <div className="hero_text text-md sm:text-3xl ">nous pensons que la réussite passe par l’envie d’apprendre.</div>
    <div className="normal_text text-sm w-[100%] sm:text-base sm:w-[60%]">
      Accédez à de nombreux cours conçus par des experts, développez vos compétences à votre rythme, et transformez votre potentiel en réussite. Que vous souhaitiez apprendre, enseigner ou manager, notre plateforme vous accompagne à chaque étape de votre parcours
    </div>
    <div className="btnc ">
      <button className='btn bg-base-300'>Dashboard</button>
    </div>
  </div>

  <div className="imgc">
    <img
      className="hidden sm:inline img1 border-6 border-warning"
        src="https://m.media-amazon.com/images/I/41R3f1PUlEL._SL500_.jpg"
      alt=""
    />
    <img
      className="hidden sm:inline img2 border-secondary border-6"
        src="https://th.bing.com/th/id/OIP.shoeOxwATBytvcrYl_H5AwAAAA?w=228&h=300&rs=1&pid=ImgDetMain"
      alt=""
    />
    <img
      className="img3 border-primary border-6 "
      src="https://store.iipbooks.com/wp-content/uploads/2023/11/front-cover-page-scaled.jpg"
      alt=""
    />
    <img
      className="hidden sm:inline img4 border-secondary border-6"
      src="https://m.media-amazon.com/images/I/51J77LkUsHL.jpg"
      alt=""
    />
    <img
      className="hidden sm:inline img5 border-6 border-warning "
      src="https://th.bing.com/th/id/R.7f68927d72fa43bcf8a0872b332ce415?rik=I%2bED5APE9Jus1g&riu=http%3a%2f%2fecx.images-amazon.com%2fimages%2fI%2f51X9X3MWGCL.jpg&ehk=xsrxBs%2bs2PC%2bJxvdlfxpKX1eeP6dJQbbkydkS7f4H4I%3d&risl=&pid=ImgRaw&r=0"
      alt=""
    />
  </div>
</div>

<br /><br />

<div className='min-h-[30vh] flex justify-center items-end'>
  <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-5">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
<footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
  <aside className="grid-flow-col items-center">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      className="fill-current">
      <path
        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
    </svg>
    <p>
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
  </aside>
  <nav className="md:place-self-center md:justify-self-end">
    <div className="grid grid-flow-col gap-4">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
</footer>
</div>

    
      
    </>
   
    

  )
}

export default PrincipalPage