import Fuse from "fuse.js";
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

    let keys: string[] = [];
    if (type === "name") {
      keys = ["full_name"];
    } else if (type === "phone") {
      keys = ["mobile"];
    } else if (type === "enrollment") {
      keys = ["enrollment_no", "enrollment_year", "enrollment_raw"];
    } else {
      // "all"
      keys = ["full_name", "mobile", "enrollment_no", "enrollment_raw"];
    }

    const fuse = new Fuse(voters, {
      keys,
      threshold: 0.3, // lower = stricter
    });

    const results = fuse.search(query).map((r) => r.item);

    return results.slice(0, 100).map((voter) => ({
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
