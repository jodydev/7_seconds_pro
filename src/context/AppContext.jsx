import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const is1080p = window.matchMedia("(min-width: 1920px)").matches;
  const is1440p = window.matchMedia("(min-width: 2500px)").matches;
  const checkDeviceSizeJobTable = is1440p ? 13 : is1080p ? 9 : 5;
  const checkDeviceSizeApplicantsTable = is1440p ? 12 : is1080p ? 8 : 5;
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
