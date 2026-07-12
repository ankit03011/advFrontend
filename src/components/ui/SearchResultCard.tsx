import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoArrowForwardOutline, IoPersonOutline } from "react-icons/io5";

interface SearchResultCardProps {
  id: number;
  fullName: string;
  cardToken: string;
  fatherName?: string;
  enrollmentRaw?: string;
  photo?: string;
  onViewDetails: (token: string) => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  fullName,
  cardToken,
  fatherName,
  enrollmentRaw,
  photo,
  onViewDetails,
}) => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onViewDetails(cardToken)}
      className="bg-white hover:bg-cream border border-primary/10 rounded-3xl p-5 shadow-premium hover:shadow-gold/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        {/* Photo Thumbnail */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-secondary/20 shadow-inner flex-shrink-0 bg-primary/5 flex items-center justify-center">
          {photo && photo.trim() !== "" && photo !== "null" && photo !== "undefined" && !imgError ? (
            <img
              src={photo}
              alt={fullName}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <IoPersonOutline className="w-8 h-8 text-primary/40" />
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-heading font-bold text-dark leading-tight">{fullName}</h3>
          {fatherName && (
            <p className="text-xs text-dark/60 font-body">
              {t("results.father_name")}: <span className="font-semibold">{fatherName}</span>
            </p>
          )}
          {enrollmentRaw && (
            <span className="inline-block bg-primary/5 text-primary border border-primary/10 text-[10px] font-bold px-2 py-0.5 rounded-full font-body uppercase">
              {enrollmentRaw}
            </span>
          )}
        </div>
      </div>

      <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/5 hover:bg-primary text-primary hover:text-cream rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 self-start sm:self-auto">
        <span>{t("results.view_profile")}</span>
        <IoArrowForwardOutline className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
export default SearchResultCard;
