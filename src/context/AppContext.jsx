import { createContext, useState, useContext, useEffect } from 'react';
import supabase from '../supabase/client';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <AppContext.Provider value={{ modalOpen, openModal, closeModal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
