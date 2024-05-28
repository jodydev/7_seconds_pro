import { useTranslation } from "react-i18next";

export default function PageNotFound() {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-700">404</h1>
        <p className="text-gray-500">{t("Page not found.")}</p>
      </div>
    </div>
  );
}