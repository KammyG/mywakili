import CategoryCard from "../components/CategoryCard";
export default function Home() {
  const categories = [
    { title: "Family Law", description: "Divorce, custody, adoption." },
    { title: "Criminal Law", description: "Arrests, bail, defense." },
    { title: "Land & Property", description: "Disputes, purchases." },
    { title: "Employment", description: "Contracts, wrongful termination." },
  ];
  return (
    <div>
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900">Your Legal Help, Simplified</h1>
        <p className="text-gray-700 mt-2">Find qualified lawyers and understand your rights in Kenya.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((c, i) => (
          <CategoryCard key={i} {...c} />
        ))}
      </section>
    </div>
  );
}
