export interface SearchResult {
  id: number;
  full_name: string;
  card_token: string;
  father_name?: string;
  enrollment_raw?: string;
  photo?: string;
}

export interface VoterDetail {
  id: number;
  source_sno?: number;
  full_name: string;
  father_name?: string;
  enrollment_no?: string;
  enrollment_year?: string;
  enrollment_raw?: string;
  mobile?: string;
  photo?: string;
  signature?: string;
  card_token: string;
}
