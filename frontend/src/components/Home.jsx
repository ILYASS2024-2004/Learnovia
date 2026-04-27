import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeStore } from '../store/useThemeStore';
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const textSectionRef = useRef(null);
  const panelsSectionRef = useRef(null);
  const textRef = useRef(null);
  const lettersRef = useRef([]);
  const panelsRef = useRef(null);
  const { theme } = useThemeStore();
  // Préparer les références pour chaque lettre
  useEffect(() => {
    lettersRef.current = lettersRef.current.slice(0, textRef.current?.textContent.length);
  }, []);

  const addToLettersRef = (el, index) => {
    if (el) {
      lettersRef.current[index] = el;
    }
  };

  // Fonction pour diviser le texte en lettres
  const splitText = (text) => {
    return text.split('').map((letter, index) => (
      <span 
        key={index} 
        ref={(el) => addToLettersRef(el, index)}
        className="inline-block"
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation lettre par lettre - disparaît quand on scroll
      if (lettersRef.current.length > 0) {
        gsap.to(lettersRef.current, {
          opacity: 0,
          y: 200,
        //   rotation: 360,
          stagger: 0.4,
          duration: 6,
          scrollTrigger: {
            trigger: textSectionRef.current,
            start: "top-=200 top" ,
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Faire apparaître les panels quand on arrive à leur section
      gsap.fromTo(panelsSectionRef.current, 
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: panelsSectionRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          }
        }
      );

      // Défilement horizontal des panels
      gsap.to(panelsRef.current, {
        x: '-300vw',
        scrollTrigger: {
          trigger: panelsSectionRef.current,
          start: 'top top',
          end: '+=3000', 
          scrub: 1,
          pin: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div >
      {/* Première section : Texte animé */}
      <div 
        ref={textSectionRef} 
        className={`h-[50vh] flex items-center justify-center relative `}
      >
        <div className={`absolute w-full h-[60px] ${theme=="light"?"bg-white":"bg-black"} bottom-[-20px] blur-[5px] z-10 `}></div>
        <h1 ref={textRef} className="text-5xl md:text-8xl font-bold text-center audiowide-regular-b">
          {splitText("Que propose le site ?")}
        </h1>
      </div>

      {/* Deuxième section : Panneaux horizontaux */}
      <div 
        ref={panelsSectionRef} 
        className={`h-screen overflow-hidden relative  ${theme === 'light' ? 'login-lr11' :  'login-dr11'} `}
       
      >
      <div ref={panelsRef} className="flex w-[400vw] h-full pt-5 ">
  {/* Panel 1 */}
  <div className="w-screen h-full flex items-center justify-center ">
    <div className="rounded-2xl w-[80%] h-[70%] bg-primary flex flex-col items-center justify-center  border-4 p-6 relative">
      <img className={`block absolute bottom-[-4%] left-0 size-30  ${theme=="light"?" ":"filter invert"} `} src="fl1.png" alt="" />
      <img className={`block absolute right-[0%] top-[-3%] size-30 rotate-180  ${theme=="light"?" ":"filter invert"}  `} src="fl1.png" alt="" />

      <h2 className="text-3xl sm:text-6xl text-center font-bold mb-4 audiowide-regular-b">Cours interactifs</h2>
      <p className="text-center  text-lg sm:text-2xl ">
        Accédez à des cours structurés et progressifs pour apprendre étape par étape.
      </p>
   
    </div>
  </div>

  {/* Panel 2 */}
  <div className="w-screen h-full flex items-center justify-center">
    <div className="rounded-2xl w-[80%] h-[70%] bg-secondary flex flex-col items-center justify-center  border-4 p-6 relative">
        <img className={`hidden sm:block absolute bottom-[0%] left-0 size-20 sm:size-30  ${theme=="light"?" ":"filter invert"} `} src="pn2.png" alt="" />
      <img className={` absolute right-[10%] top-[-1%] size-20 sm:size-30 rotate-10  ${theme=="light"?" ":"filter invert"}  `} src="pn21.png" alt="" />
               <img className={`block absolute right-[50%] bottom-[2%] size-10 sm:size-20 rotate-10  ${theme=="light"?" ":"filter invert"}  `} src="pn22.png" alt="" />
      <h2 className="text-3xl sm:text-6xl text-center font-bold mb-4 audiowide-regular-b">Vidéos pédagogiques</h2>
      <p className="text-center  text-lg sm:text-2xl">
        Des vidéos claires et illustrées pour mieux comprendre chaque notion.
      </p>
      
    </div>
  </div>

  {/* Panel 3 */}
  <div className="w-screen h-full flex items-center justify-center">
    <div className="rounded-2xl w-[80%] h-[70%] bg-amber-400 flex flex-col items-center justify-center relative  border-4 p-6">
              {/* <img className={`block absolute top-[2%] right-0 size-40 ${theme=="light"?" ":"filter invert"} `} src="pn3.png" alt="" /> */}
              <img className={`block absolute top-[2%] right-0 size-20 sm:size-40 ${theme=="light"?" ":"filter invert "} `} src="pn32.png" alt="" />

      <h2 className="text-3xl sm:text-6xl text-center font-bold mb-4 audiowide-regular-b">Exercices pratiques</h2>
      <p className="text-center  text-lg sm:text-2xl">
        Entraînez-vous avec des quiz et des exercices corrigés pour valider vos acquis.
      </p>

   
    </div>
  </div>

  {/* Panel 4 */}
  <div className="w-screen h-full flex items-center justify-center">
    <div className="rounded-2xl w-[80%] h-[70%] bg-error flex flex-col items-center justify-center  border-4 p-6 relative">
         <img className={`block absolute top-[0%] left-1 size-20 sm:size-30 ${theme=="light"?" ":"filter invert"} `} src="pn44.png" alt="" />
      <img className={`block absolute right-[10%] top-[-1%] size-20 sm:size-30 rotate-10  ${theme=="light"?" ":"filter invert"}  `} src="pn41.png" alt="" />
               <img className={`block absolute right-[50%] bottom-[2%] size-10 sm:size-20 rotate-10  ${theme=="light"?" ":"filter invert"}  `} src="pn42.png" alt="" />
      <h2 className="text-3xl sm:text-6xl text-center font-bold mb-4 audiowide-regular-b">Communauté & Support</h2>
      <p className="text-center  text-lg sm:text-2xl">
        Posez vos questions et recevez de l’aide des formateurs.
      </p>

        
    </div>
  </div>
</div>

      </div>

     
    </div>
  );
};

export default Home;