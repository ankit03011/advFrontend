import React from "react";
import { useTranslation } from "react-i18next";

interface SectionTitleProps {
  titleKey: string;
  subtitleKey?: string;
  center?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  titleKey,
  subtitleKey,
  center = true,
}) => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  return (
    <div className={`mb-10 ${center ? "text-center" : "text-left"}`}>
      <h2
        className={`text-3xl md:text-5xl text-primary font-bold ${
          isHindi ? "font-devanagari" : "font-heading"
        } mb-4 relative inline-block`}
      >
        {t(titleKey)}
        <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary rounded-full"></span>
      </h2>
      {subtitleKey && (
        <p className="mt-4 text-dark/70 text-sm md:text-base max-w-2xl mx-auto font-body">
          {t(subtitleKey)}
        </p>
      )}
    </div>
  );
};
export default SectionTitle;
