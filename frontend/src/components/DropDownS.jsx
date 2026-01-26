import React from 'react'
import { useThemeStore } from '../store/useThemeStore';
import { THEMES } from '../constants';
import { Moon, Palette, SunMedium } from 'lucide-react';

const DropDownS = () => {
    const { theme, setTheme } = useThemeStore();
    
  return (
  <div className="dropdown pt-0 pb-0 cursor-pointer">
    <div tabIndex={0} role="button" className=" gap-2"> <span className="nvlink ">Themes</span></div>
    <div tabIndex={0} className="dropdown-content  bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm ">
      <div className="flex flex-col gap-2">
        {THEMES.map((t) => (
          <button
            key={t}
            className={`
              gap-1.5 p-2 rounded-lg transition-colors w-full
              ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
            `}
            onClick={() => setTheme(t)}
          >
            <div className='flex items-center justify-center gap-2'>{t === 'light' ? <SunMedium  /> : <Moon  />}
               <span className="text-[11px] font-medium truncate w-full text-center">
                

              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
            </div>
            
           
          </button>
        ))}
      </div>
    </div>
  </div>
  )
}

export default DropDownS