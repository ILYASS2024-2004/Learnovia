import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster, ToastBar } from 'react-hot-toast';
import { Loader } from 'lucide-react';

import useAuthStore from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EtudiantDashboard from './pages/EtudiantDashboard/EtudiantDashboard';
import EnseignantDashboard from './pages/EnseignantDashboard/EnseignantDashboard';
import AdminDashboard from './pages/AdminDashbordPages/AdminDashboard';
import PrincipalPage from './pages/PrincipalPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const { isAuthenticated, user, initAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    initAuth(); // vérifie le token et récupère l'utilisateur
  }, []);
  console.log("user", user);

  if (!user && isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const role = user?.role;

  return (
    <div data-theme={theme} className={theme === 'dark' ? 'crsb' : 'crsl'}>
      <Toaster>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? 'custom-enter 0.5s ease'
                : 'custom-exit 0.5s ease forwards',
            }}
          />
        )}
      </Toaster>


    
      <Routes> 
        <Route path='/' element={<PrincipalPage />} />
        
        
        {/* Routes publiques */}
        <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboards selon rôle */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              role === 'etudiant' ? (
                <EtudiantDashboard />
              ) : role === 'enseignant' ? (
                <EnseignantDashboard />
              ) : role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <div>Rôle inconnu</div>
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* <Route path="/dashboard/*" element={<AdminDashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
