import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const is1080p = window.matchMedia("(min-width: 1920px)").matches;
  const is1440p = window.matchMedia("(min-width: 2500px)").matches;
  const checkDeviceSizeJobTable = is1440p ? 10 : is1080p ? 10 : 10;
  const checkDeviceSizeApplicantsTable = is1440p ? 10 : is1080p ? 10 : 10;
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <AppContext.Provider value={{ modalOpen, openModal, closeModal, checkDeviceSizeJobTable, checkDeviceSizeApplicantsTable }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
