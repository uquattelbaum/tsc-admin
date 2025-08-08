import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Mitglieder from "./pages/Mitglieder";
import Abteilungen from "./pages/Abteilungen";
import Gruppen from "./pages/Gruppen";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Mitglieder />} />
        <Route path="/abteilungen" element={<Abteilungen />} />
        <Route path="/gruppen" element={<Gruppen />} />
      </Routes>
    </Layout>
  );
}
