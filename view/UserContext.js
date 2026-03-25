import { React,createContext, useState, useContext } from 'react';
import { MyUser } from '../model/MyUser'; 

// Crée le contexte
const UserContext = createContext();

// Crée le provider qui englobe  app
export const UserProvider = ({ children }) => {
  // State global pour l'utilisateur
  const [myUser, setMyUser] = useState(new MyUser({}));

  return (
    <UserContext.Provider value={{ myUser, setMyUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pratique pour accéder facilement au user
export const useUser = () => useContext(UserContext);