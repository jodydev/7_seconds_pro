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

  // Stato per memorizzare il conteggio dei file nel bucket
  const [fileCount, setFileCount] = useState(null);

  useEffect(() => {
    async function fetchFileCount() {
      try {
        // Ottiene l'elenco dei file nel bucket
        const { data, error } = await supabase.storage.from("cvs").list();

        if (error) {
          throw error;
        }

        console.log(data);

        // Conta il numero di file nell'elenco
        const count = data ? data.length : 0;
        setFileCount(count);
        console.log("File count:", count);
      } catch (error) {
        console.error("Error fetching file count:", error.message);
      }
    }

    fetchFileCount();
  }, []);

  return (
    <AppContext.Provider value={{ modalOpen, openModal, closeModal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
