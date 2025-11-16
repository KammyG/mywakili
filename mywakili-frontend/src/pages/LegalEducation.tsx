export default function LegalEducation() {
    const topics = [
      { id: 1, title: "What to do if arrested", summary: "Know your rights during police arrests."},
      { id: 2, title: "Child custody process", summary: "How to file and what to expect."}
    ];
    return (
      <div>
        <h1 className="text-2xl font-semibold text-blue-900 mb-4">Know Your Rights</h1>
        <ul className="space-y-4">
          {topics.map(t => (
            <li key={t.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-blue-800">{t.title}</h3>
              <p className="text-gray-700 mt-1">{t.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  