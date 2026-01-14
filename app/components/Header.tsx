"use client";

const tabs = [
  { label: "Appetizers", value: "appetizers" },
  { label: "Main Course", value: "mains" },
  { label: "Desserts", value: "desserts" },
  { label: "Beverages", value: "beverages" },
];

export default function Header({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-green-500">F</span>oodi
        </div>

        {/* Tabs */}
        <nav className="hidden gap-10 md:flex">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => onChange(t.value)}
              className={`text-sm font-medium ${
                active === t.value ? "text-green-500" : "text-gray-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Contact Button */}
        <button className="rounded-full bg-green-500 px-6 py-2 text-sm font-semibold text-white">
          Contact
        </button>
      </div>
    </header>
  );
}
