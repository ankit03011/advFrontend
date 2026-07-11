import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  IoCallOutline,
  IoCalendarOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SearchBox from "../../components/ui/SearchBox";
import SectionTitle from "../../components/ui/SectionTitle";
import SearchResultCard from "../../components/ui/SearchResultCard";
import CandidateCard from "../../components/ui/CandidateCard";
import Modal from "../../components/ui/Modal";
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import Loading from "../../components/ui/Loading";

import { useDebounce } from "../../hooks/useDebounce";
import { voterService } from "../../services/voter.service";
import profileImg from "../../assets/Profile.png";
import heroImg from "../../assets/Hero_background.png";
import lawImg from "../../assets/law.png";

export const CandidatePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"all" | "name" | "phone" | "enrollment">("all");

  // Selected candidate token for detailed profile modal view
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // Debounced search query
  const debouncedQuery = useDebounce(searchQuery, 500);

  // React Query to search voters (Only runs if query is 2+ characters long)
  const isSearchActive = debouncedQuery.trim().length >= 2;

  const {
    data: searchResults = [],
    isLoading: isSearchLoading,
    isError: isSearchError,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ["voters", "search", debouncedQuery],
    queryFn: () => voterService.searchVoters(debouncedQuery),
    enabled: isSearchActive,
    staleTime: 60000, // 1 minute cache
  });

  // React Query to fetch specific candidate details
  const {
    data: candidateDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useQuery({
    queryKey: ["voters", "details", selectedToken],
    queryFn: () => voterService.getCandidate(selectedToken!),
    enabled: !!selectedToken,
    staleTime: 60000, // 1 minute cache
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream/30">
      <Helmet>
        <title>
          {isHindi
            ? "शैलेन्द्र यादव - सह सचिव पद हेतु चुनाव अभियान"
            : "Shailendra Yadav - Candidate for Joint Secretary"}
        </title>
        <meta
          name="description"
          content={
            isHindi
              ? "शैलेन्द्र यादव के सह सचिव पद हेतु चुनाव अभियान की आधिकारिक वेबसाइट। मतदाता सूची खोजें एवं विवरण देखें।"
              : "Official campaign website for Shailendra Yadav, Candidate for Joint Secretary. Search directory and view profiles."
          }
        />
        <meta property="og:title" content="Shailendra Yadav Campaign" />
        <meta
          property="og:description"
          content="Vision for progress, integrity, and transparency."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-primary/10 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary shadow-premium bg-primary flex items-center justify-center flex-shrink-0">
            <img src={lawImg} alt="Law Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm md:text-base text-primary leading-tight">
              जिला अधिवक्ता संघ, जबलपुर
            </span>
            <span className="text-[10px] text-dark/60 font-semibold tracking-wider uppercase font-body">
              District Bar Association, Jabalpur
            </span>
          </div>
        </div>
        <LanguageSwitcher />
      </header>

      {/* 1. Hero Campaign Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-dark text-cream py-20 px-6 md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/15 via-transparent to-transparent"></div>

        {/* Background Court Pillars Silhouette Design */}
        <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(107, 15, 26, 0.85), rgba(26, 32, 44, 0.95)), url(${heroImg})` }} className="absolute inset-0 bg-cover bg-center pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 px-5 py-2 rounded-full shadow-gold/10"
            >
              <span className="text-secondary text-xs font-bold uppercase tracking-widest font-body">
                चुनाव वर्ष 2026-28
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-4xl md:text-6xl font-extrabold leading-tight text-white ${isHindi ? "font-devanagari" : "font-heading"
                }`}
            >
              {isHindi ? "शैलेन्द्र यादव" : "Shailendra Yadav"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-cream/90 text-lg md:text-xl font-heading font-medium"
            >
              {isHindi
                ? "एडवोकेट, जिला अधिवक्ता संघ जबलपुर - सह सचिव पद हेतु"
                : "Advocate, District Bar Association Jabalpur - Candidate for Joint Secretary"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-cream/70 text-sm md:text-base max-w-xl mx-auto lg:mx-0 font-body leading-relaxed"
            >
              {isHindi
                ? "अधिवक्ता हित हमारी प्राथमिकता है। मैं आपके अमूल्य मत, समर्थन और आशीर्वाद की कामना करता हूँ।"
                : "Advocate welfare is our top priority. I request your valuable vote, support, and blessings."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  const target = document.getElementById("search-directory");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {isHindi ? "मतदाता खोजें" : "Search Directory"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-dark"
                onClick={() => {
                  window.location.href = "tel:9425385907";
                }}
              >
                {isHindi ? "संपर्क करें" : "Contact"}
              </Button>
            </motion.div>
          </div>

          {/* Hero Image in Premium Gold Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-72 h-72 md:w-96 md:h-96"
            >
              {/* Gold frame backing */}
              <div className="absolute inset-0 bg-secondary rounded-3xl transform rotate-3 scale-[1.02] shadow-gold/30"></div>
              {/* Image container */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl overflow-hidden border-4 border-cream shadow-2xl group">
                <img
                  src={profileImg}
                  alt="Shailendra Yadav"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Candidate Introduction Card */}
      <section id="intro-section" className="py-16 px-6 md:px-12 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card premiumBorder className="relative overflow-hidden bg-white/80 shadow-premium">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <h3 className="text-2xl font-heading font-bold text-primary">
                  {t("intro.greeting")}
                </h3>
                <p className="text-dark/80 leading-relaxed font-body text-sm md:text-base">
                  {isHindi
                    ? "आगामी जिला अधिवक्ता संघ, जबलपुर निर्वाचन (मतदान 20 जुलाई 2026) में मैं आप सभी के स्नेह, विश्वास एवं सहयोग का आकांक्षी हूँ। कृपया शैलेन्द्र यादव को सह सचिव पद हेतु अपना बहुमूल्य मत एवं आशीर्वाद प्रदान करें।"
                    : "I seek your affection, trust, and cooperation in the upcoming Jabalpur District Bar Association Election (polling on 20 July 2026). Please cast your valuable vote and blessings for Shailendra Yadav for the post of Joint Secretary."}
                </p>
              </div>

              <div className="md:col-span-4 space-y-4 border-t md:border-t-0 md:border-l border-primary/10 pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-secondary/15 text-primary rounded-full">
                    <IoCalendarOutline className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-dark/50 block font-bold uppercase tracking-wider font-body">
                      {t("intro.polling_date")}
                    </span>
                    <span className="font-bold text-dark text-sm">
                      {t("intro.polling_value")}
                    </span>
                  </div>
                </div>

                <a href="tel:9425385907" className="flex items-center gap-3 group hover:opacity-85 transition-opacity">
                  <div className="p-3 bg-secondary/15 text-primary rounded-full group-hover:bg-secondary/25 transition-colors">
                    <IoCallOutline className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-dark/50 block font-bold uppercase tracking-wider font-body">
                      {t("intro.contact_no")}
                    </span>
                    <span className="font-bold text-dark text-sm hover:underline">+91 94253 85907</span>
                  </div>
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* 3 & 4. Search Section & Search Results */}
      <section id="search-directory" className="bg-cream/40 py-20 px-6 md:px-12 border-t border-b border-primary/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <SectionTitle titleKey="search.title" subtitleKey="search.subtitle" />

          {/* Search Box */}
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            searchType={searchType}
            onSearchTypeChange={setSearchType}
          />

          {/* Search Result display logic */}
          <div className="pt-4">
            {!isSearchActive ? (
              <div className="text-center py-10 bg-white/40 border border-primary/5 rounded-3xl">
                <p className="text-dark/50 text-sm font-semibold">
                  {isHindi
                    ? "मतदाता सूची खोजने के लिए कम से कम 2 अक्षर दर्ज करें।"
                    : "Please type at least 2 characters to search the directory."}
                </p>
              </div>
            ) : isSearchLoading ? (
              <Loading />
            ) : isSearchError ? (
              <div className="text-center py-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                <div className="flex items-center justify-center text-primary gap-2">
                  <IoAlertCircleOutline className="w-8 h-8" />
                  <span className="font-bold">Error loading directory results.</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => refetchSearch()}>
                  Retry Search
                </Button>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-10 bg-white/40 border border-primary/5 rounded-3xl">
                <p className="text-dark/50 text-sm font-semibold">{t("search.empty")}</p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center text-xs font-semibold text-dark/50 px-2">
                  <span>{t("search.results_count", { count: searchResults.length })}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((voter) => (
                    <SearchResultCard
                      key={voter.id}
                      id={voter.id}
                      fullName={voter.full_name}
                      cardToken={voter.card_token}
                      fatherName={voter.father_name}
                      enrollmentRaw={voter.enrollment_raw}
                      photo={voter.photo}
                      onViewDetails={setSelectedToken}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Bottom Campaign Footer */}
      <section className="bg-dark text-cream pt-16 pb-8 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/35 via-transparent to-transparent"></div>

        <footer className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <div className="space-y-2 text-sm md:text-base text-cream/90 font-heading font-bold tracking-wide">
            {isHindi ? (
              <>
                <p>⚖️ एक मजबूत अधिवक्ता संघ के निर्माण हेतु आपका सहयोग अपेक्षित है।</p>
                <p className="text-lg md:text-xl text-secondary">शैलेन्द्र यादव</p>
                <p className="text-xs md:text-sm text-cream/70">सह सचिव पद हेतु प्रत्याशी</p>
                <p className="text-xs text-cream/50 tracking-wider">जिला अधिवक्ता संघ, जबलपुर चुनाव 2026–28</p>
              </>
            ) : (
              <>
                <p>⚖️ Your support is expected to build a strong Advocates' Association.</p>
                <p className="text-lg md:text-xl text-secondary">Shailendra Yadav</p>
                <p className="text-xs md:text-sm text-cream/70">Candidate for Joint Secretary</p>
                <p className="text-xs text-cream/50 tracking-wider">District Bar Association, Jabalpur Election 2026–28</p>
              </>
            )}
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const target = document.getElementById("search-directory");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            className="shadow-gold"
          >
            {t("hero.cta")}
          </Button>

          <div className="text-[10px] text-cream/40 space-y-1 pt-4 border-t border-cream/5 w-full">
            <p>© 2026 Campaign Office • All Rights Reserved</p>
            <p>Designed & Developed by <span className="font-semibold text-cream/60">Ankit Singh</span></p>
          </div>
        </footer>
      </section>

      {/* Candidate Details Modal */}
      <Modal isOpen={!!selectedToken} onClose={() => setSelectedToken(null)}>
        {isDetailsLoading ? (
          <Loading />
        ) : isDetailsError ? (
          <div className="text-center py-8 space-y-4">
            <IoAlertCircleOutline className="w-12 h-12 text-primary mx-auto" />
            <p className="text-dark/80 font-semibold">Failed to fetch profile details.</p>
            <Button variant="primary" size="sm" onClick={() => setSelectedToken(selectedToken)}>
              Retry
            </Button>
          </div>
        ) : (
          candidateDetails && <CandidateCard candidate={candidateDetails} />
        )}
      </Modal>
    </div>
  );
};
export default CandidatePage;
