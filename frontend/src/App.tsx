import { Routes, Route } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="*" element={<Portfolio />} />
    </Routes>
  );
}
