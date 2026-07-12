import votersData from "../constants/Data/json/voters.json";
import type { SearchResult, VoterDetail } from "../types";

// Prepare the data and map missing card_tokens/photo paths
const voters: VoterDetail[] = (votersData as any[]).map((voter) => {
  const token = voter.card_token || String(voter.id);
  let photoPath = voter.photo || "";
  
  // Normalize photo path
  if (
    photoPath && 
    typeof photoPath === "string" && 
    photoPath.trim() !== "" && 
    photoPath !== "null" && 
    photoPath !== "undefined"
  ) {
    photoPath = photoPath.trim();
    if (!photoPath.startsWith("/") && !photoPath.startsWith("http")) {
      photoPath = "/" + photoPath;
    }
  } else {
    photoPath = "";
  }

  return {
    ...voter,
    card_token: token,
    photo: photoPath,
  };
});

export const voterService = {
  /**
   * Searches voters based on a string query.
   */
  async searchVoters(query: string, type: string = "all"): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];
    
    // Intentionally show small loading by adding simulated latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const lowerQuery = query.toLowerCase().trim();
    
    const filtered = voters.filter((voter) => {
      if (type === "name") {
        return voter.full_name?.toLowerCase().includes(lowerQuery);
      }
      if (type === "phone") {
        return voter.mobile?.toLowerCase().includes(lowerQuery);
      }
      if (type === "enrollment") {
        return (
          voter.enrollment_no?.toLowerCase().includes(lowerQuery) ||
          voter.enrollment_year?.toLowerCase().includes(lowerQuery) ||
          voter.enrollment_raw?.toLowerCase().includes(lowerQuery)
        );
      }
      // "all"
      return (
        voter.full_name?.toLowerCase().includes(lowerQuery) ||
        voter.mobile?.toLowerCase().includes(lowerQuery) ||
        voter.enrollment_raw?.toLowerCase().includes(lowerQuery)
      );
    });

    return filtered.slice(0, 100).map((voter) => ({
      id: voter.id,
      full_name: voter.full_name,
      card_token: voter.card_token,
      father_name: voter.father_name,
      enrollment_raw: voter.enrollment_raw,
      photo: voter.photo,
    }));
  },

  /**
   * Retrieves full candidate profile details by security token.
   */
  async getCandidate(token: string): Promise<VoterDetail> {
    // Intentionally show small loading inside modal
    await new Promise((resolve) => setTimeout(resolve, 400));

    const candidate = voters.find((v) => v.card_token === token || String(v.id) === token);
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    return candidate;
  },
};
export default voterService;
