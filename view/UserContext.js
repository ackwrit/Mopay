import { React,createContext, useState, useContext } from 'react';
import { MyUser } from '../model/MyUser'; 
import { useEffect } from 'react';
import { supabase } from '../services/supabase';

// Crée le contexte
const UserContext = createContext();

// Crée le provider qui englobe  app
export const UserProvider = ({ children }) => {
  // State global pour l'utilisateur
  const [myUser, setMyUser] = useState(new MyUser({}));



  // Vérifie la session Supabase dès le montage
  useEffect(() => {
    async function initSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("session",session)
        setMyUser(prev => new MyUser({
          ...prev,
          id: session.user.id,
          mail: session.user.email,
          token: session.access_token
        }));
      }
    }
    

    initSession();
  }, []);

  return (
    <UserContext.Provider value={{ myUser, setMyUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pratique pour accéder facilement au user
export const useUser = () => useContext(UserContext);