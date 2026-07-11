export interface Voter {
  id: number;
  source_sno: number;
  full_name: string;
  name_key: string;
  father_name: string;
  enrollment_no: string;
  enrollment_year: string;
  enrollment_raw: string;
  mobile: string;
  photo: string;
  signature: string;
  card_token: string;
}

export const DUMMY_VOTERS: Voter[] = [
  {
    id: 1,
    source_sno: 1,
    full_name: "GURUPRASAD TIWARI",
    name_key: "GURUPRASADTIWARI",
    father_name: "LATESHRIGANE SHPRASADTIWA RI",
    enrollment_no: "486",
    enrollment_year: "1963",
    enrollment_raw: "486 / 1963",
    mobile: "8889186532",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
    signature: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch_Signature.png",
    card_token: "qXnNaDIejyZzR2WJYu9muQ"
  },
  {
    id: 2,
    source_sno: 2,
    full_name: "SURJITSINGH GARHA",
    name_key: "SURJITSINGHGARHA",
    father_name: "S. HARNAMSINGH",
    enrollment_no: "702",
    enrollment_year: "1964",
    enrollment_raw: "702 / 1964",
    mobile: "9425101234",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256",
    signature: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch_Signature.png",
    card_token: "Xl71jLHQeSo0EHuOTA2Q1A"
  },
  {
    id: 3,
    source_sno: 3,
    full_name: "HARSH SONI",
    name_key: "HARSHSONI",
    father_name: "LATE S.K. SONI",
    enrollment_no: "1024",
    enrollment_year: "2015",
    enrollment_raw: "1024 / 2015",
    mobile: "7000987654",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256",
    signature: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch_Signature.png",
    card_token: "IHfbWwlJNQlTPmLx9coLjg"
  },
  {
    id: 4,
    source_sno: 4,
    full_name: "SWAPNIL SARAF",
    name_key: "SWAPNILSARAF",
    father_name: "ANIL SARAF",
    enrollment_no: "1550",
    enrollment_year: "2018",
    enrollment_raw: "1550 / 2018",
    mobile: "9827012345",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256&h=256",
    signature: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch_Signature.png",
    card_token: "nDkcP073xtXIiyYH4aSH-Q"
  },
  {
    id: 5,
    source_sno: 5,
    full_name: "MAHENDRA PATEL",
    name_key: "MAHENDRAPATEL",
    father_name: "RAMESH PATEL",
    enrollment_no: "889",
    enrollment_year: "2001",
    enrollment_raw: "889 / 2001",
    mobile: "9988776655",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256",
    signature: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch_Signature.png",
    card_token: "swyLrmwhuZ9-XoX4aBJf7A"
  }
];
