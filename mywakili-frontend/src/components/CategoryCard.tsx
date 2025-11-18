import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  color?: string;
}

export default function CategoryCard({ title, description, icon: Icon, color = "from-blue-500 to-indigo-500" }: CategoryCardProps) {
  return (
    <div className="card p-6 group cursor-pointer">
      {Icon && (
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
  