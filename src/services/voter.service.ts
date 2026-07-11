import api from "./api";
import type { SearchResult, VoterDetail } from "../types";

export const voterService = {
  /**
   * Searches voters based on a string query.
   */
  async searchVoters(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];
    const response = await api.get<SearchResult[]>(`/api/search`, {
      params: { q: query },
    });
    return response.data;
  },

  /**
   * Retrieves full candidate profile details by security token.
   */
  async getCandidate(token: string): Promise<VoterDetail> {
    const response = await api.get<VoterDetail>(`/api/candidate/${token}`);
    return response.data;
  },
};
export default voterService;
