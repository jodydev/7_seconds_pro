import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const is1080p = window.matchMedia("(min-width: 1920px)").matches;
  const is1440p = window.matchMedia("(min-width: 2500px)").matches;
  const checkDeviceSizeJobTable = is1440p ? 10 : is1080p ? 10 : 5;
  const checkDeviceSizeApplicantsTable = is1440p ? 10 : is1080p ? 10 : 5;
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobApplicants, setJobApplicants] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <AppContext.Provider value={{ jobApplicants, setJobApplicants, searchTerm, setSearchTerm, modalOpen, openModal, closeModal, checkDeviceSizeJobTable, checkDeviceSizeApplicantsTable }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
