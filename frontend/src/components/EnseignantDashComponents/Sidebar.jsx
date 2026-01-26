import { MoreVertical, ChevronLast, ChevronFirst, BookOpen, User, FileText, ListChecks, Users, Sun, Moon, Home, LogOut } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useThemeStore } from '../../store/useThemeStore';
import './sidebar.css';

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();

  const isActive = (path) => location.pathname === `/dashboard/${path}` || (path === '' && location.pathname === '/dashboard');

  const navItems = [
     { icon: <User size={20} />, text: "Profil", path: "profil" },
      { icon: <Users size={20} />, text: "Étudiants", path: "" },
    { icon: <BookOpen size={20} />, text: "Cours", path: "mes-cours" },
    
    { icon: <ListChecks size={20} />, text: "Exams", path: "questions" },
    { icon: <FileText size={20} />, text: "Notes", path: "exams" },
   
   
  ];

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col shadow-sm">
        <div className="p-2 pb-2 sm:p-4 flex justify-between items-center relative bruno-ace-regular-b fontstyle text-lg ">
          <span>{expanded ? "LEARNOVIA" : <BookOpen size={20} />}</span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`p-1 rounded-full bg-base-100 hover:bg-gray-100 absolute ${expanded ? "right-[-4%]" : "right-[-10%]"}`}
          >
            {expanded ? <ChevronFirst size={18} /> : <ChevronLast size={18} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-0.5 sm:px-3">
                  <li
      onClick={() => navigate(`/`)}
      className={`
        relative flex items-center py-2 px-2 my-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        
            
        hover:bg-indigo-50 text-gray-600
        
      `}
    >
      <Home size={20}></Home>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-30 ml-3" : "w-0"
        }`}
      >
        Accueil
      </span>
   

      {!expanded && (
        <div
          className={`
            z-10
            absolute left-full rounded-md px-2 py-1 ml-6 
            bg-base-200  text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
         Accueil
        </div>
      )}
    </li>

            {navItems.map(({ icon, text, path }) => (
              <SidebarItem
                key={text}
                icon={icon}
                text={text}
                active={isActive(path)}
                onClick={() => navigate(`/dashboard/${path}`)}
              />
            ))}
          </ul>
        </SidebarContext.Provider>
 <div className="flex flex-col" >
           <div
      onClick={logout}
      className={`
        relative flex items-center py-2 px-2 my-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
         
            
             "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      <LogOut size={20}/>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-30 ml-3" : "w-0"
        }`}
      >
        Déconnexion 
      </span>
      

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6 
            bg-base-200  text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          Déconnexion 
        </div>
      )}
    </div>


           <div onClick={toggleTheme} className=" relative flex items-center py-2 px-2 my-2
        font-medium rounded-md cursor-pointer
        transition-colors group hover:bg-indigo-50 text-gray-600">
      <label className="swap swap-rotate cursor-pointer">
        {/* Le checkbox invisible contrôle le style de l'icône */}
        <input type="checkbox" checked={theme === "light"}  onChange={toggleTheme}  />

        {/* Soleil (mode clair) */}
       
        <Sun className="swap-on fill-current " size={20}></Sun>

        {/* Lune (mode sombre) */}
        
        <Moon className="swap-off fill-current" size={20} ></Moon>
      </label>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-30 ml-3" : "w-0"
        }`}
      >
        Theme
      </span>
       {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6 
            bg-base-200  text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
        Theme
        </div>
      )}
    </div>
       
   
             <div className=" flex  p-2 shadow-md">
          <div className=" w-10 h-10 rounded-md flex justify-center items-center font-bold bg-base-300">
            {user.nom[0]}
          </div>

          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-25 sm:w-35 ml-3" : "w-0"}`}>
            <div className="leading-3">
              <h4 className="font-semibold text-sm">{user.nom}</h4>
              <span className=" text-[10px] sm:text-xs">{user.email}</span>
            </div>
           
          </div>
        </div>
        </div>

      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, active, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-3 px-2 my-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-50 to-indigo-100 text-indigo-900"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-30 ml-3" : "w-0"}`}>{text}</span>
      {!expanded && (
        <div className="absolute z-10 left-full rounded-md px-2 py-1 ml-6 bg-base-200 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}
