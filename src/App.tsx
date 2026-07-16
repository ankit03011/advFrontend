// import { Toaster } from "react-hot-toast";
// import CandidatePage from "./pages/Candidate/CandidatePage";

// function App() {
//   return (
//     <>
//       <CandidatePage />
//       <Toaster position="top-right" />
//     </>
//   );
// }

// export default App;


function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          textAlign: "left",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: 600,
          }}
        >
          Service Unavailable
        </h1>

        <p
          style={{
            marginTop: "16px",
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#a1a1aa",
          }}
        >
          The server is temporarily unavailable. Please try again later.
        </p>

        <p
          style={{
            marginTop: "32px",
            fontSize: "14px",
            color: "#71717a",
          }}
        >
          Error Code: 503
        </p>
      </div>
    </div>
  );
}

export default App;