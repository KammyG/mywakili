import { Link } from "react-router-dom";

export default function LawyerCard({ id, name, specialty, location }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-blue-800">{name}</h3>
      <p className="text-sm text-gray-600">{specialty}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <div className="mt-3 flex gap-2">
        <Link to={`/lawyers/${id}`} className="px-3 py-1 rounded bg-blue-700 text-white">View</Link>
        <button className="px-3 py-1 rounded border">Contact</button>
      </div>
    </div>
  );
}
