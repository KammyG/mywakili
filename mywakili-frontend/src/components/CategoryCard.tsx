export default function CategoryCard({ title, description }: any) {
    return (
      <div className="p-5 bg-white rounded-lg shadow hover:shadow-md transition">
        <h3 className="font-semibold text-blue-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    );
  }
  