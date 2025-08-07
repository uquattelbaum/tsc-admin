import { Route, Routes, NavLink, Navigate } from "react-router-dom";
import Mitglieder from "./pages/Mitglieder";
import Abteilungen from "./pages/Abteilungen";
import Gruppen from "./pages/Gruppen";
import MitgliedFormular from "./components/MitgliedFormular"; // ✨ Neu

export default function App() {
  return (
    <div>
      {/* Navigation */}
      <nav className="bg-gray-100 p-4 flex gap-4 text-sm border-b">
        <NavLink to="/mitglieder" className={linkClass}>Mitglieder</NavLink>
        <NavLink to="/abteilungen" className={linkClass}>Abteilungen</NavLink>
        <NavLink to="/gruppen" className={linkClass}>Gruppen</NavLink>
      </nav>

      {/* Inhalt */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/mitglieder" />} /> {/* Weiterleitung */}
          <Route path="/mitglieder" element={<Mitglieder />} />
          <Route path="/mitglieder/neu" element={<MitgliedFormular />} /> {/* ✨ Neu */}
          <Route path="/abteilungen" element={<Abteilungen />} />
          <Route path="/gruppen" element={<Gruppen />} />
        </Routes>
      </div>
    </div>
  );
}

function linkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? "text-blue-600 font-semibold"
    : "text-gray-600 hover:text-blue-500";
}
