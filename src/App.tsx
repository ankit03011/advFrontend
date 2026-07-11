import { Toaster } from "react-hot-toast";
import CandidatePage from "./pages/Candidate/CandidatePage";

function App() {
  return (
    <>
      <CandidatePage />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
