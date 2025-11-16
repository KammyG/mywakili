import { useEffect, useState } from "react";
import LawyerCard from "../components/LawyerCard";
import api from "../services/api";

export default function Lawyers() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  useEffect(() => {
    // placeholder: fetch from backend when available
    api.get("/lawyers").then(res => setLawyers(res.data)).catch(() => {
      setLawyers([
        { id: 1, name: "Jane Mwangi", specialty: "Family Law", location: "Nairobi" },
        { id: 2, name: "Peter Otieno", specialty: "Criminal Law", location: "Mombasa" },
      ]);
    });
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-blue-900 mb-4">Find a Lawyer</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map(l => <LawyerCard key={l.id} {...l} />)}
      </div>
    </div>
  );
}
