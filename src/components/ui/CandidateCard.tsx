import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  IoPrintOutline, 
  IoDownloadOutline, 
  IoLogoWhatsapp, 
  IoPersonOutline,
  IoCardOutline,
  IoCallOutline,
  IoListOutline,
  IoChevronDownOutline,
  IoChevronUpOutline
} from "react-icons/io5";
import type { VoterDetail } from "../../types";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

interface CandidateCardProps {
  candidate: VoterDetail;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === "hi";
  const slipRef = useRef<HTMLDivElement>(null);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Dynamic campaign details based on current candidate
  const campaignCandidateName = isHindi ? "शैलेन्द्र यादव" : "Shailendra Yadav";
  const campaignRole = isHindi ? "सह सचिव" : "Joint Secretary";
  const campaignRoleForCard = isHindi ? "सह सचिव पद हेतु" : "For Joint Secretary";

  // Format Enrollment No / Year
  const enrollmentDisplay = candidate.enrollment_raw || 
    (candidate.enrollment_no ? `${candidate.enrollment_no}${candidate.enrollment_year ? ` / ${candidate.enrollment_year}` : ""}` : "N/A");

  // Helper to clone and remove classes to prevent oklch/oklab failures
  const handleHtml2Canvas = async (element: HTMLDivElement, scale: number = 3) => {
    return await html2canvas(element, {
      useCORS: true,
      scale: scale,
      backgroundColor: "#ffffff",
      logging: false,
      onclone: (clonedDoc) => {
        const card = clonedDoc.getElementById("voter-slip-card-container");
        if (card) {
          card.removeAttribute("class");
          const descendants = card.getElementsByTagName("*");
          for (let i = 0; i < descendants.length; i++) {
            descendants[i].removeAttribute("class");
          }
        }
      }
    });
  };

  // 1. Download Voter Slip as Image (PNG)
  const handleDownloadImage = async () => {
    if (!slipRef.current) return;
    const loadToast = toast.loading(isHindi ? "पर्ची तैयार की जा रही है..." : "Generating slip...");
    try {
      // Ensure images are loaded before capture
      const images = slipRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) resolve(null);
              else {
                img.onload = () => resolve(null);
                img.onerror = () => resolve(null);
              }
            })
        )
      );

      const canvas = await handleHtml2Canvas(slipRef.current, 3);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Voter_Slip_${candidate.full_name.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
      toast.success(isHindi ? "सफलतापूर्वक डाउनलोड हो गया!" : "Downloaded successfully!", { id: loadToast });
    } catch (error) {
      console.error("Download image error", error);
      toast.error(isHindi ? "डाउनलोड करने में विफल" : "Failed to download image", { id: loadToast });
    }
  };

  // 2. Print Voter Slip (Prints exact high-res image of the card using hidden iframe to prevent mobile popup blocker issues)
  const handlePrint = async () => {
    if (!slipRef.current) return;
    const loadToast = toast.loading(isHindi ? "प्रिंट की तैयारी हो रही है..." : "Preparing print...");
    try {
      const canvas = await handleHtml2Canvas(slipRef.current, 3);
      const imgDataUrl = canvas.toDataURL("image/png");
      
      // Get or create hidden iframe
      let iframe = document.getElementById("print-iframe") as HTMLIFrameElement | null;
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "print-iframe";
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "none";
        iframe.style.visibility = "hidden";
        document.body.appendChild(iframe);
      }

      const doc = iframe.contentDocument || (iframe.contentWindow ? iframe.contentWindow.document : null);
      if (!doc) {
        throw new Error("Could not access iframe document context");
      }

      doc.open();
      doc.write(`
        <html>
          <head>
            <title>Print Voter Slip - ${candidate.full_name}</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #ffffff;
              }
              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
              }
              @page {
                size: auto;
                margin: 0mm;
              }
            </style>
          </head>
          <body>
            <img src="${imgDataUrl}" />
          </body>
        </html>
      `);
      doc.close();

      // Short delay to ensure document is parsed and print is triggered reliably
      setTimeout(() => {
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        }
        toast.dismiss(loadToast);
      }, 500);

    } catch (error) {
      console.error("Print error", error);
      toast.error(isHindi ? "प्रिंट करने में विफल" : "Failed to print", { id: loadToast });
    }
  };

  // 3. Share Voter Slip via WhatsApp as image / details
  const handleShareWhatsApp = async () => {
    if (!slipRef.current) return;
    const shareText = isHindi 
      ? `जिला अधिवक्ता संघ, जबलपुर चुनाव 2026-28\n\nमतदाता पर्ची:\nनाम: ${candidate.full_name}\nनामांकन क्र.: ${enrollmentDisplay}\nपिता का नाम: ${candidate.father_name || "N/A"}\nक्रमांक (S.No): ${candidate.source_sno || candidate.id}\n\nकृपया सह सचिव पद हेतु ${campaignCandidateName} को अपना अमूल्य मत, समर्थन और आशीर्वाद दें। 🙏`
      : `District Bar Association, Jabalpur Election 2026-28\n\nVoter Slip Details:\nName: ${candidate.full_name}\nEnrollment No.: ${enrollmentDisplay}\nFather's Name: ${candidate.father_name || "N/A"}\nS.No: ${candidate.source_sno || candidate.id}\n\nPlease vote and support ${campaignCandidateName} for Joint Secretary. 🙏`;

    try {
      const canvas = await handleHtml2Canvas(slipRef.current, 2);

      canvas.toBlob(async (blob) => {
        if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], "voter_slip.png", { type: "image/png" })] })) {
          const file = new File([blob], `Voter_Slip_${candidate.full_name.replace(/\s+/g, "_")}.png`, { type: "image/png" });
          try {
            await navigator.share({
              files: [file],
              title: isHindi ? "मतदाता पर्ची" : "Voter Slip",
              text: shareText,
            });
            toast.success(isHindi ? "सफलतापूर्वक साझा किया गया!" : "Shared successfully!");
          } catch (err) {
            console.log("Share cancelled or failed", err);
          }
        } else {
          const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
          window.open(url, "_blank");
          
          const imgUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = `Voter_Slip_${candidate.full_name.replace(/\s+/g, "_")}.png`;
          link.href = imgUrl;
          link.click();
          toast.success(isHindi 
            ? "व्हाट्सएप खोला गया! फोटो बैकअप के रूप में डाउनलोड की गई है।" 
            : "WhatsApp opened! Card image downloaded as fallback."
          );
        }
      }, "image/png");
    } catch (e) {
      console.error(e);
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* 1. Redesigned Premium Voter Slip Card (Fully Inline Styled to avoid oklch oklab parse issues) */}
      <div 
        ref={slipRef}
        id="voter-slip-card-container"
        style={{
          backgroundColor: "#ffffff",
          border: "2px solid rgba(107, 15, 26, 0.25)",
          borderRadius: "24px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#1a202c",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2.5px solid #6b0f1a",
          paddingBottom: "6px",
          marginBottom: "12px"
        }}>
          <div style={{
            color: "#4a5568",
            fontWeight: "700",
            fontSize: "11px",
            whiteSpace: "nowrap"
          }}>
            S.No {candidate.source_sno || candidate.id}
          </div>
          <div style={{
            color: "#6b0f1a",
            fontWeight: "800",
            fontSize: "11px",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            textAlign: "right",
            lineHeight: "1.2"
          }}>
            Jabalpur District Bar Association
          </div>
        </div>

        {/* Content Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "12px",
          alignItems: "center"
        }}>
          {/* Details (Left Side) */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}>
            <div>
              <span style={{
                fontSize: "9px",
                color: "#718096",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "block",
                marginBottom: "1px"
              }}>Name</span>
              <span style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "#6b0f1a",
                textTransform: "uppercase",
                lineHeight: "1.15",
                display: "block",
                wordBreak: "break-word"
              }}>
                {candidate.full_name}
              </span>
            </div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px",
              alignItems: "center"
            }}>
              <div>
                <span style={{
                  fontSize: "9px",
                  color: "#718096",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  display: "block",
                  marginBottom: "1px"
                }}>Enrolment No. / Year</span>
                <span style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#1a202c",
                  textTransform: "uppercase",
                  display: "block"
                }}>
                  {enrollmentDisplay}
                </span>
              </div>
              
              <div style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderLeft: "1px solid rgba(0,0,0,0.08)",
                paddingLeft: "6px"
              }}>
                <span style={{
                  fontWeight: "800",
                  color: "#1e3a8a",
                  fontSize: "13px",
                  lineHeight: "1",
                  display: "block"
                }}>
                  {campaignCandidateName}
                </span>
                <span style={{
                  fontSize: "8px",
                  fontWeight: "700",
                  color: "#b91c1c",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginTop: "2px",
                  display: "block"
                }}>
                  {campaignRoleForCard}
                </span>
              </div>
            </div>

            <div>
              <span style={{
                fontSize: "9px",
                color: "#718096",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "block",
                marginBottom: "1px"
              }}>Father's Name</span>
              <span style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#2d3748",
                textTransform: "uppercase",
                display: "block",
                wordBreak: "break-word"
              }}>
                {candidate.father_name || "N/A"}
              </span>
            </div>
          </div>

          {/* Photo (Right Side) */}
          <div style={{
            width: "88px",
            height: "88px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1.5px solid #d4af37",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            backgroundColor: "#f7fafc"
          }}>
            {candidate.photo && candidate.photo.trim() !== "" && candidate.photo !== "null" && candidate.photo !== "undefined" && !imgError ? (
              <img
                src={candidate.photo}
                alt={candidate.full_name}
                onError={() => setImgError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
                crossOrigin="anonymous"
              />
            ) : (
              <IoPersonOutline style={{ width: "36px", height: "36px", color: "rgba(107, 15, 26, 0.4)" }} />
            )}
          </div>
        </div>

        {/* Bottom Campaign Banner inside Card */}
        <div style={{
          backgroundColor: "#fef08a",
          border: "1px solid #fde047",
          color: "#1a202c",
          borderRadius: "12px",
          padding: "10px",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: "750",
          marginTop: "16px",
          lineHeight: "1.4"
        }}>
          {isHindi ? (
            <>
              Please vote for <span style={{ color: "#1e3a8a", fontWeight: "900" }}>{campaignCandidateName}</span> for the <span style={{ color: "#b91c1c", fontWeight: "900" }}>{campaignRole}</span> in DBA, Jabalpur Election 2026
            </>
          ) : (
            <>
              Please vote for <span style={{ color: "#1e3a8a", fontWeight: "900" }}>{campaignCandidateName}</span> for the <span style={{ color: "#b91c1c", fontWeight: "900" }}>{campaignRole}</span> in DBA, Jabalpur Election 2026
            </>
          )}
        </div>
      </div>

      {/* 2. Structured Document View of Candidate Info (Accordion Style) */}
      <div className="bg-white/80 border border-primary/5 rounded-3xl shadow-premium overflow-hidden transition-all duration-300">
        <button
          onClick={() => setDetailsExpanded(!detailsExpanded)}
          className="w-full flex justify-between items-center p-5 text-sm font-heading font-extrabold text-primary uppercase tracking-wider focus:outline-none cursor-pointer hover:bg-primary/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <IoListOutline className="w-5 h-5" />
            <span>{isHindi ? "मतदाता विवरण" : "Voter Details"}</span>
          </div>
          {detailsExpanded ? (
            <IoChevronUpOutline className="w-5 h-5 text-primary/60" />
          ) : (
            <IoChevronDownOutline className="w-5 h-5 text-primary/60" />
          )}
        </button>

        {detailsExpanded && (
          <div className="p-5 pt-0 border-t border-primary/5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-body animate-fade-in">
            <div className="flex items-center gap-3 bg-cream/30 p-3 rounded-2xl border border-primary/5">
              <div className="p-2.5 bg-primary/5 text-primary rounded-xl flex-shrink-0">
                <IoCardOutline className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-dark/50 block font-bold uppercase tracking-wider">
                  {isHindi ? "नामांकन क्रं / वर्ष" : "Enrollment No. / Year"}
                </span>
                <strong className="text-dark font-extrabold">{enrollmentDisplay}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-cream/30 p-3 rounded-2xl border border-primary/5">
              <div className="p-2.5 bg-primary/5 text-primary rounded-xl flex-shrink-0 font-heading font-black text-sm text-center w-10">
                S.N
              </div>
              <div>
                <span className="text-[10px] text-dark/50 block font-bold uppercase tracking-wider">
                  {isHindi ? "क्रमांक (S.No)" : "Serial Number (S.No)"}
                </span>
                <strong className="text-dark font-extrabold">{candidate.source_sno || candidate.id}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-cream/30 p-3 rounded-2xl border border-primary/5">
              <div className="p-2.5 bg-primary/5 text-primary rounded-xl flex-shrink-0">
                <IoPersonOutline className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-dark/50 block font-bold uppercase tracking-wider">
                  {isHindi ? "पिता का नाम" : "Father's Name"}
                </span>
                <strong className="text-dark font-extrabold">{candidate.father_name || "N/A"}</strong>
              </div>
            </div>

            {candidate.mobile && (
              <div className="flex items-center gap-3 bg-cream/30 p-3 rounded-2xl border border-primary/5">
                <div className="p-2.5 bg-primary/5 text-primary rounded-xl flex-shrink-0">
                  <IoCallOutline className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-dark/50 block font-bold uppercase tracking-wider">
                    {isHindi ? "मोबाइल नंबर" : "Mobile Number"}
                  </span>
                  <strong className="text-dark font-extrabold">{candidate.mobile}</strong>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Action Buttons Section */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="grid grid-cols-2 gap-3">
          {/* Download Voter Slip Card in image format */}
          <button
            onClick={handleDownloadImage}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-heading font-black uppercase tracking-wider text-xs py-3 px-4 rounded-2xl shadow-premium transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <IoDownloadOutline className="w-4 h-4" />
            <span>{isHindi ? "मतदाता पर्ची डाउनलोड करें" : "Download Voter Slip"}</span>
          </button>

          {/* Print slip as PDF */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 bg-cream hover:bg-cream-dark border border-primary/10 text-primary font-heading font-black uppercase tracking-wider text-xs py-3 px-4 rounded-2xl shadow-premium transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <IoPrintOutline className="w-4 h-4" />
            <span>{isHindi ? "प्रिंट" : "Print"}</span>
          </button>
        </div>

        {/* Share on WhatsApp */}
        <button
          onClick={handleShareWhatsApp}
          className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-heading font-black uppercase tracking-wider text-xs py-3.5 px-6 rounded-2xl shadow-md transition-all duration-300 transform active:scale-95 cursor-pointer"
        >
          <IoLogoWhatsapp className="w-5 h-5" />
          <span>{isHindi ? "व्हाट्सएप पर साझा करें" : "Share on WhatsApp"}</span>
        </button>
      </div>

      {/* 4. Bottom Campaign Slogan Footer */}
      <div className="border-t border-primary/10 pt-4 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold text-primary/80 tracking-wide uppercase">
          ⚖️ {isHindi ? `वोट दें ${campaignCandidateName} — ${campaignRole}` : `Vote for ${campaignCandidateName} — ${campaignRole}`}
        </span>
      </div>
    </div>
  );
};

export default CandidateCard;
