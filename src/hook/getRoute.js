import { useLocation } from "react-router-dom";

export const getRoute = () => {
  const location = useLocation();
  // const { id } = useParams();

  const homePage = "/home";
  const aiPage = `/ai`;
  const jobsPage = `/jobs`;
  const usersPage = `/users`;
  const documentsPage = `/documents`;

  const ishomePage = () => location.pathname === homePage;
  const isUsersPage = () => location.pathname === usersPage;
  const isJobsPage = () => location.pathname === jobsPage;
  const isAiPage = () => location.pathname === aiPage;
  const isDocumentsPage = () => location.pathname === documentsPage;

  return {
    ishomePage,
    isUsersPage,
    isJobsPage,
    isAiPage,
    isDocumentsPage,
  };
};
