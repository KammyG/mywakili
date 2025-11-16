import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function LawyerProfile() {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState<any>(null);
  useEffect(() => {
    // TODO: fetch from backend
    api.get(`/lawyers/${id}`).then(res => setLawyer(res.data)).catch(() => {
      setLawyer({ id, name: "Jane Mwangi", specialty: "Family Law", location: "Nairobi", bio: "..." });
    });
  }, [id]);

  if (!lawyer) return <div>Loading...</div>;
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold">{lawyer.name}</h1>
      <p className="text-sm text-gray-600">{lawyer.specialty} — {lawyer.location}</p>
      <p className="mt-4">{lawyer.bio}</p>
      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-700 text-white rounded">Book Consultation</button>
      </div>
    </div>
  );
}
