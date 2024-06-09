import { useTranslation } from "react-i18next";
import { BiSolidError } from "react-icons/bi";

export default function ErrorSpan() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row">
      <BiSolidError className="w-4 h-4 2xl:w-6 2xl:h-6 me-2 text-gray-200 dark:text-gray-600 fill-red-600" />
      <span className="flex items-center text-xs 2xl:text-sm">{t("Failed")}</span>
    </div>
  );
}
